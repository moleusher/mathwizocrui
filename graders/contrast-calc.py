#!/usr/bin/env python3
"""
contrast-calc.py — WCAG AA Contrast Ratio Grader

Reads CSS design token files and checks all text-on-background pairings
against WCAG AA minimum contrast ratios (≥4.5:1 normal text, ≥3:1 large text).
Resolves var(--options-xxx) references through options-colors.css to concrete
hex and oklch() values.
"""

import argparse
import json
import math
import os
import re
import sys


# ═══════════════════════════════════════════════════════════════════════════════
# Color conversion  (WCAG relative luminance / contrast ratio)
# ═══════════════════════════════════════════════════════════════════════════════

def srgb_to_linear(v: float) -> float:
    if v <= 0.04045:
        return v / 12.92
    return ((v + 0.055) / 1.055) ** 2.4


def relative_luminance(r: float, g: float, b: float) -> float:
    return (
        0.2126 * srgb_to_linear(r)
        + 0.7152 * srgb_to_linear(g)
        + 0.0722 * srgb_to_linear(b)
    )


def contrast_ratio(l1: float, l2: float) -> float:
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)


def parse_hex(hex_str: str) -> tuple[float, float, float]:
    """#rgb / #rrggbb / #rrggbbaa -> (r, g, b) in 0-1."""
    h = hex_str.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    elif len(h) in (6, 8):
        h = h[:6]
    else:
        raise ValueError(f"Invalid hex length: {hex_str}")
    r = int(h[0:2], 16) / 255
    g = int(h[2:4], 16) / 255
    b = int(h[4:6], 16) / 255
    return (r, g, b)


def oklch_to_srgb(l: float, c: float, h: float) -> tuple[float, float, float]:
    """OKLCH -> sRGB via OKLab intermediate (pure Python, no deps)."""
    h_rad = math.radians(h)
    a = c * math.cos(h_rad)
    b = c * math.sin(h_rad)

    # OKLab -> linear sRGB
    L_ = l + 0.3963377774 * a + 0.2158037573 * b
    M_ = l - 0.1055613458 * a - 0.0638541728 * b
    S_ = l - 0.0894841775 * a - 1.2914855480 * b

    r_lin = 4.0767416621 * L_ - 3.3077115913 * M_ + 0.2309699292 * S_
    g_lin = -1.2684380046 * L_ + 2.6097574011 * M_ - 0.3413193965 * S_
    b_lin = -0.0041960863 * L_ - 0.7034186147 * M_ + 1.7076147010 * S_

    def gamma(x: float) -> float:
        if x <= 0.0031308:
            return 12.92 * x
        return 1.055 * (x ** (1 / 2.4)) - 0.055

    return (
        max(0, min(1, gamma(r_lin))),
        max(0, min(1, gamma(g_lin))),
        max(0, min(1, gamma(b_lin))),
    )


# Matches `oklch(0.5 0.1 250)` — three space-separated numbers
_OKLCH_RE = re.compile(
    r"oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)"
)


def parse_color_value(value_str: str) -> tuple[float, float, float]:
    """Parse a hex (#rgb/#rrggbb) or oklch(L C H) string to sRGB 0-1."""
    value_str = value_str.strip()
    if value_str.startswith("#"):
        return parse_hex(value_str)
    m = _OKLCH_RE.match(value_str)
    if m:
        l = float(m.group(1))
        c = float(m.group(2))
        h = float(m.group(3))
        return oklch_to_srgb(l, c, h)
    raise ValueError(f"Cannot parse color value: {value_str}")


# ═══════════════════════════════════════════════════════════════════════════════
# CSS parsing
# ═══════════════════════════════════════════════════════════════════════════════

# Matches `--name: value;` in CSS
_VAR_DEF_RE = re.compile(r"--([a-zA-Z0-9_-]+)\s*:\s*(.+?)\s*;")
# Matches `var(--name)` references
_VAR_REF_RE = re.compile(r"var\((--[a-zA-Z0-9_-]+)\)")


def read_css_file(filepath: str) -> dict[str, str]:
    """Parse CSS variable definitions. Returns {--name: raw_value}."""
    try:
        with open(filepath, encoding="utf-8") as f:
            content = f.read()
    except OSError as e:
        print(f"Error reading {filepath}: {e}", file=sys.stderr)
        sys.exit(1)

    # Strip block comments
    content = re.sub(r"/\*.*?\*/", "", content, flags=re.DOTALL)
    defs: dict[str, str] = {}
    for m in _VAR_DEF_RE.finditer(content):
        defs[f"--{m.group(1)}"] = m.group(2).strip()
    return defs


def resolve_var(raw: str, options: dict[str, str]) -> str:
    """Resolve var(--xxx) references through the options dict.

    Walks at most 5 levels of indirection to handle decision -> options chains.
    Unresolved var() references are left in place.
    """

    def _resolve(name: str) -> str | None:
        return options.get(name)

    result = raw
    for _ in range(5):
        replaced = _VAR_REF_RE.sub(
            lambda m: _resolve(m.group(1)) or m.group(0), result
        )
        if replaced == result:
            break
        result = replaced
    return result


# ═══════════════════════════════════════════════════════════════════════════════
# Auto-pair detection
# ═══════════════════════════════════════════════════════════════════════════════

def _key_with(d: dict[str, str], substr: str) -> str | None:
    """Return the first key in *d* containing *substr* (case-insensitive)."""
    lower = substr.lower()
    for k in d:
        if lower in k.lower():
            return k
    return None


def autodetect_pairs(
    decisions: dict[str, str],
) -> list[tuple[str, str]]:
    """Auto-pair --text-* tokens with their logical --background-* partners.

    Standard text tokens (primary, secondary, muted, faint) pair with
    --background-primary.  --text-inverse pairs with --interactive-accent
    (the standard button pattern).
    """
    bgs: dict[str, str] = {
        k: v for k, v in decisions.items() if "background" in k.lower()
    }
    texts: dict[str, str] = {
        k: v for k, v in decisions.items() if "text" in k.lower()
    }

    primary_bg = _key_with(bgs, "background-primary") or next(iter(bgs), None)
    accent = _key_with(decisions, "interactive-accent")

    pairs: list[tuple[str, str]] = []
    for t_name in texts:
        if "inverse" in t_name.lower():
            bg = accent or primary_bg
        else:
            bg = primary_bg
        if bg:
            pairs.append((t_name, bg))
    return pairs


# ═══════════════════════════════════════════════════════════════════════════════
# Main
# ═══════════════════════════════════════════════════════════════════════════════

def resolve_options_path(css_path: str) -> str:
    """Locate options-colors.css alongside the decisions file or at default path."""
    css_dir = os.path.dirname(os.path.abspath(css_path))
    candidate = os.path.join(css_dir, "options-colors.css")
    if os.path.isfile(candidate):
        return os.path.abspath(candidate)
    candidate = os.path.abspath("tokens/options-colors.css")
    if os.path.isfile(candidate):
        return candidate
    print(
        "Error: options-colors.css not found (looked beside --css and in ./tokens/)",
        file=sys.stderr,
    )
    sys.exit(1)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="WCAG AA Contrast Ratio Grader"
    )
    parser.add_argument(
        "--css",
        default="tokens/decisions-color-dark.css",
        help="CSS file to analyze (default: tokens/decisions-color-dark.css)",
    )
    parser.add_argument(
        "--pairs",
        default=None,
        help="JSON file with explicit fg/bg pairs "
             '(format: [{"fg": "...", "bg": "..."}, ...])',
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Output results as JSON",
    )
    parser.add_argument(
        "--min-ratio",
        type=float,
        default=4.5,
        help="Minimum contrast ratio (default: 4.5)",
    )
    args = parser.parse_args()

    # ── Read files ──
    css_path = os.path.abspath(args.css)
    options_path = resolve_options_path(css_path)
    decisions = read_css_file(css_path)
    options = read_css_file(options_path)

    # ── Determine pairs ──
    if args.pairs:
        with open(args.pairs, encoding="utf-8") as f:
            pair_data = json.load(f)
        pairs: list[tuple[str, str]] = [
            (p["fg"], p["bg"]) for p in pair_data
        ]
    else:
        pairs = autodetect_pairs(decisions)
        if not pairs:
            print("Error: no text/background pairs found in CSS", file=sys.stderr)
            sys.exit(1)

    # ── Grading loop ──
    results: list[dict] = []
    failures: list[dict] = []

    for fg_name, bg_name in pairs:
        fg_raw = decisions.get(fg_name)
        bg_raw = decisions.get(bg_name)

        if fg_raw is None:
            print(f"Warning: '{fg_name}' not found in CSS — skipping", file=sys.stderr)
            continue
        if bg_raw is None:
            print(f"Warning: '{bg_name}' not found in CSS — skipping", file=sys.stderr)
            continue

        fg_resolved = resolve_var(fg_raw, options)
        bg_resolved = resolve_var(bg_raw, options)

        try:
            fg_srgb = parse_color_value(fg_resolved)
            bg_srgb = parse_color_value(bg_resolved)
        except ValueError as e:
            print(f"Warning: {fg_name}/{bg_name}: {e}", file=sys.stderr)
            continue

        fg_lum = relative_luminance(*fg_srgb)
        bg_lum = relative_luminance(*bg_srgb)
        ratio = contrast_ratio(fg_lum, bg_lum)
        passed = ratio >= args.min_ratio

        result = {
            "fg": fg_name,
            "bg": bg_name,
            "fg_raw": fg_raw,
            "bg_raw": bg_raw,
            "fg_resolved": fg_resolved,
            "bg_resolved": bg_resolved,
            "ratio": round(ratio, 2),
            "pass": passed,
        }
        results.append(result)
        if not passed:
            failures.append(result)

    # ── Output ──
    if args.json:
        output = {
            "pass": len(failures) == 0,
            "pairs_checked": len(results),
            "min_ratio": args.min_ratio,
            "failures": [
                {"fg": f["fg"], "bg": f["bg"],
                 "ratio": f["ratio"], "min": args.min_ratio}
                for f in failures
            ],
            "pairs": [
                {
                    "fg": r["fg"],
                    "bg": r["bg"],
                    "fg_resolved": r["fg_resolved"],
                    "bg_resolved": r["bg_resolved"],
                    "ratio": r["ratio"],
                    "pass": r["pass"],
                }
                for r in results
            ],
        }
        print(json.dumps(output, indent=2))
    else:
        print("contrast-calc.py — WCAG AA Contrast Ratio Grader")
        print(f"Threshold: ≥{args.min_ratio:.2f}:1")
        print(f"File:      {args.css}")
        print(f"Options:   {options_path}")
        print()

        for r in results:
            status = "PASS" if r["pass"] else "FAIL"
            print(f"  {r['fg']}  on  {r['bg']}")
            resolved_info = (
                f"fg={r['fg_resolved']}  bg={r['bg_resolved']}"
            )
            print(f"    {resolved_info}")
            print(f"    →  {r['ratio']:.2f}:1  [{status}]")
            print()

        n = len(results)
        nf = len(failures)
        print(f"{'─' * 50}")
        print(f"{n} pair(s) checked, {nf} failure(s)")
        print("PASS" if nf == 0 else "FAIL")

    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
