#!/usr/bin/env python3
"""
token-diff.py — Design Token Consistency Grader

Audits CSS/TSX/TS files for design token violations:
  1. Free hex color values (must use CSS variables from decisions layer)
  2. Direct references to private options tokens (var(--options-*))

Hex is only allowed in the whitelisted options-colors file.
"""

import argparse
import json
import os
import re
import sys

HEX_RE = re.compile(r'#[0-9a-fA-F]{3,8}')
OPTIONS_RE = re.compile(r'var\(--options-[a-zA-Z0-9_-]+\)')

EXCLUDE_DIRS = frozenset({'node_modules', '.git', 'dist', '__pycache__'})
SCAN_EXTENSIONS = frozenset({'.tsx', '.ts', '.css'})


def find_files(scan_dir: str) -> list[str]:
    """Walk scan_dir recursively, returning matching source files."""
    files: list[str] = []
    for root, dirs, filenames in os.walk(scan_dir):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for f in filenames:
            if os.path.splitext(f)[1] in SCAN_EXTENSIONS:
                files.append(os.path.join(root, f))
    return sorted(files)


def strip_line_comment(line: str) -> str:
    """Remove trailing // comment from a line, preserving in-string // appearances."""
    in_string = False
    string_char = None
    for i, ch in enumerate(line):
        if in_string:
            if ch == string_char and (i == 0 or line[i - 1] != '\\'):
                in_string = False
        elif ch in ('"', "'", '`'):
            in_string = True
            string_char = ch
        elif ch == '/' and i + 1 < len(line) and line[i + 1] == '/':
            return line[:i]
    return line


def extract_hex_values(text: str) -> list[str]:
    """Find all hex color matches in a string."""
    return HEX_RE.findall(text)


def scan_file(
    filepath: str,
    whitelist_path: str | None,
    check_privacy: bool,
) -> list[dict]:
    """Scan a single file for violations. Returns list of violation dicts."""
    violations: list[dict] = []

    try:
        with open(filepath, encoding='utf-8') as f:
            content = f.read()
    except (OSError, UnicodeDecodeError):
        return violations

    is_whitelisted = whitelist_path is not None and os.path.samefile(
        filepath, whitelist_path
    )

    lines = content.split('\n')

    # ── Privacy check: var(--options-*) refs ──
    if check_privacy and not is_whitelisted:
        for i, line in enumerate(lines, 1):
            m = OPTIONS_RE.search(line)
            if m:
                violations.append({
                    'file': filepath,
                    'line': i,
                    'type': 'private_token',
                    'value': m.group(0),
                })

    # ── Hex check: skip whitelisted file entirely ──
    if is_whitelisted:
        return violations

    in_block_comment = False

    for i, line in enumerate(lines, 1):
        stripped = line.lstrip()

        # Skip @import lines
        if stripped.startswith('@import'):
            continue

        # Skip import/export … from lines
        if (stripped.startswith('import ')
                or stripped.startswith('from ')
                or stripped.startswith('export ')
                and ' from ' in stripped):
            continue

        # ── Block comment handling ──
        if in_block_comment:
            end_idx = line.find('*/')
            if end_idx != -1:
                in_block_comment = False
                # Check code after block comment on same line
                after_comment = line[end_idx + 2:]
                if after_comment.strip():
                    code = strip_line_comment(after_comment)
                    for val in extract_hex_values(code):
                        violations.append({
                            'file': filepath,
                            'line': i,
                            'type': 'free_hex',
                            'value': val,
                        })
            continue

        # Check for block comment opening on this line
        # We look for /* and handle code before it
        open_idx = stripped.find('/*')
        if open_idx != -1:
            before_comment = stripped[:open_idx]
            if before_comment.strip():
                code = strip_line_comment(before_comment)
                for val in extract_hex_values(code):
                    violations.append({
                        'file': filepath,
                        'line': i,
                        'type': 'free_hex',
                        'value': val,
                    })

            close_idx = stripped.find('*/', open_idx + 2)
            if close_idx == -1:
                in_block_comment = True
                continue
            else:
                # Block comment ends on same line
                after_comment = stripped[close_idx + 2:]
                if after_comment.strip():
                    code = strip_line_comment(after_comment)
                    for val in extract_hex_values(code):
                        violations.append({
                            'file': filepath,
                            'line': i,
                            'type': 'free_hex',
                            'value': val,
                        })
                continue

        # ── Line with no block comment ──
        code_part = strip_line_comment(line)
        if not code_part.strip():
            continue

        for val in extract_hex_values(code_part):
            violations.append({
                'file': filepath,
                'line': i,
                'type': 'free_hex',
                'value': val,
            })

    return violations


def make_relpath(path: str, scan_dir: str) -> str:
    """Convert absolute path to relative, preserving given dir format."""
    try:
        return os.path.relpath(path, scan_dir)
    except ValueError:
        return path


def main() -> None:
    parser = argparse.ArgumentParser(
        description='Design Token Consistency Grader'
    )
    parser.add_argument(
        '--dir', default='./src',
        help='Scan directory (default: ./src)',
    )
    parser.add_argument(
        '--whitelist', default='tokens/options-colors.css',
        help='File allowed to contain hex values (relative to scan dir)',
    )
    parser.add_argument(
        '--json', action='store_true',
        help='Output results as JSON',
    )
    parser.add_argument(
        '--check-privacy', default=True, action='store_true',
        dest='check_privacy',
        help='Check for private token references (default: enabled)',
    )
    parser.add_argument(
        '--no-check-privacy', action='store_false',
        dest='check_privacy',
        help='Skip private token reference check',
    )

    args = parser.parse_args()

    scan_dir = os.path.abspath(args.dir)

    # Resolve whitelist path
    if args.whitelist:
        if os.path.isabs(args.whitelist):
            whitelist_path = args.whitelist
        else:
            whitelist_path = os.path.normpath(
                os.path.join(scan_dir, args.whitelist)
            )
        if not os.path.isfile(whitelist_path):
            whitelist_path = None
    else:
        whitelist_path = None

    files = find_files(scan_dir)
    all_violations: list[dict] = []

    for filepath in files:
        violations = scan_file(filepath, whitelist_path, args.check_privacy)
        all_violations.extend(violations)

    hex_count = sum(1 for v in all_violations if v['type'] == 'free_hex')
    priv_count = sum(1 for v in all_violations if v['type'] == 'private_token')

    if args.json:
        output = {
            'pass': len(all_violations) == 0,
            'stats': {
                'files_scanned': len(files),
                'violations': len(all_violations),
            },
            'violations': [
                {
                    'file': make_relpath(v['file'], scan_dir),
                    'line': v['line'],
                    'type': v['type'],
                    'value': v['value'],
                }
                for v in all_violations
            ],
        }
        print(json.dumps(output, indent=2))
    else:
        print('token-diff.py — Design Token Audit')
        print(f'Scanned: {len(files)} files in {args.dir}')
        for v in all_violations:
            rel_file = make_relpath(v['file'], scan_dir)
            if v['type'] == 'free_hex':
                print(f'  FAIL: {rel_file}:{v["line"]} → free hex {v["value"]}')
            elif v['type'] == 'private_token':
                print(
                    f'  FAIL: {rel_file}:{v["line"]} → '
                    f'private token {v["value"]}'
                )
        n = len(all_violations)
        print(
            f'{n} violation{"s" if n != 1 else ""} found '
            f'({hex_count} hex, {priv_count} private)'
        )

    sys.exit(1 if all_violations else 0)


if __name__ == '__main__':
    main()
