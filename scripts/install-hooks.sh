#!/bin/bash
# Install pre-commit hooks for mathocrui
# Also generates hook for math-ocr repo

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO="$SCRIPT_DIR/.."

# Install in mathocrui
cp "$SCRIPT_DIR/pre-commit" "$REPO/.git/hooks/pre-commit"
chmod +x "$REPO/.git/hooks/pre-commit"
echo "✅ mathocrui pre-commit hook installed"

# Generate for math-ocr (adjust paths)
MATH_OCR_HOOK="$HOME/.openclaw/workspace/math-ocr/.git/hooks/pre-commit"
mkdir -p "$(dirname "$MATH_OCR_HOOK")"
cat > "$MATH_OCR_HOOK" << 'HOOKEOF'
#!/bin/bash
# Design Token Gate for math-ocr
REPO_ROOT=$(git rev-parse --show-toplevel)
FAILED=0
echo "🔒 Design Token Gate"
echo "  [1/2] token-diff.py..."
python3 "$REPO_ROOT/../mathocrui/graders/token-diff.py" --dir "$REPO_ROOT/app/frontend/src" || FAILED=1
echo "  [2/2] contrast-calc.py..."
python3 "$REPO_ROOT/../mathocrui/graders/contrast-calc.py" --css "$REPO_ROOT/../mathocrui/tokens/decisions-color-dark.css" || true
if [ $FAILED -eq 1 ]; then
    echo "❌ Commit blocked"
    exit 1
fi
echo "✅ Token Gate passed"
HOOKEOF
chmod +x "$MATH_OCR_HOOK"
echo "✅ math-ocr pre-commit hook installed"

echo ""
echo "Hooks installed. Run: git commit to test."
