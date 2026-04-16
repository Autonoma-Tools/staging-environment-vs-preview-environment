#!/usr/bin/env bash
#
# examples/run-against-preview.sh
#
# Runs the Playwright suite in tests/ against a Vercel preview URL.
#
# Usage:
#   ./examples/run-against-preview.sh https://my-feature-abc123.vercel.app
#
# If the preview is protected, also export the bypass secret first:
#   export VERCEL_AUTOMATION_BYPASS_SECRET=...
#   ./examples/run-against-preview.sh https://my-feature-abc123.vercel.app
set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <preview-url>" >&2
  exit 1
fi

PREVIEW_URL="$1"

echo "Running Playwright suite against ${PREVIEW_URL}"

BASE_URL="${PREVIEW_URL}" \
VERCEL_AUTOMATION_BYPASS_SECRET="${VERCEL_AUTOMATION_BYPASS_SECRET:-}" \
  npx playwright test
