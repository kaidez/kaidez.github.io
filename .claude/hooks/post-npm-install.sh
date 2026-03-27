#!/bin/bash
HOOK_INPUT=$(cat)
COMMAND=$(echo "$HOOK_INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -qE 'npm (ci|install)'; then
  cd "$CLAUDE_PROJECT_DIR"

  REPORTS_DIR="$CLAUDE_PROJECT_DIR/.claude/reports"
  mkdir -p "$REPORTS_DIR"

  TIMESTAMP=$(date +"%Y-%m-%dT%H-%M-%S")
  REPORT_FILE="$REPORTS_DIR/build-$TIMESTAMP.md"

  BUILD_OUTPUT=$(npm run build:prod 2>&1)
  BUILD_EXIT=$?

  if [ $BUILD_EXIT -eq 0 ]; then
    STATUS="PASSED"
  else
    STATUS='<span style="color: red;">FAILED</span>'
  fi

  cat > "$REPORT_FILE" <<EOF
# Build Report: $TIMESTAMP

**Status:** $STATUS
**Command:** \`npm run build:prod\`
**Triggered by:** \`$COMMAND\`

## Output

\`\`\`
$BUILD_OUTPUT
\`\`\`
EOF

  exit $BUILD_EXIT
fi

exit 0
