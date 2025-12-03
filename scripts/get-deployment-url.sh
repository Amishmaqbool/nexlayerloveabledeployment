#!/bin/bash

# Script to retrieve the latest NextLayer deployment URL from GitHub Actions
# This can be used in Lovable/Replit to fetch the deployment URL
#
# Usage:
#   ./scripts/get-deployment-url.sh [GITHUB_TOKEN] [OWNER] [REPO]
#
# Or set environment variables:
#   export GITHUB_TOKEN=your_token
#   ./scripts/get-deployment-url.sh

set -e

GITHUB_TOKEN="${1:-$GITHUB_TOKEN}"
OWNER="${2:-${GITHUB_REPOSITORY_OWNER:-your-username}}"
REPO="${3:-$(echo ${GITHUB_REPOSITORY} | cut -d'/' -f2)}"

if [ -z "$GITHUB_TOKEN" ]; then
  echo "❌ Error: GITHUB_TOKEN is required"
  echo "Usage: ./scripts/get-deployment-url.sh <GITHUB_TOKEN> [OWNER] [REPO]"
  exit 1
fi

echo "🔍 Fetching latest NextLayer deployment URL..."
echo ""

# Get the latest successful workflow run
RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$OWNER/$REPO/actions/workflows/deploy-nexlayer.yml/runs?per_page=1&status=success")

RUN_ID=$(echo "$RESPONSE" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
RUN_URL=$(echo "$RESPONSE" | grep -o '"html_url":"[^"]*"' | head -1 | cut -d'"' -f4)
CREATED_AT=$(echo "$RESPONSE" | grep -o '"created_at":"[^"]*"' | head -1 | cut -d'"' -f4)
COMMIT_SHA=$(echo "$RESPONSE" | grep -o '"head_sha":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$RUN_ID" ]; then
  echo "ℹ️  No successful deployments found yet"
  exit 0
fi

echo "✅ Latest deployment found!"
echo "📅 Deployed at: $CREATED_AT"
echo "🔗 Workflow run: $RUN_URL"
echo "📝 Commit: ${COMMIT_SHA:0:7}"
echo ""
echo "💡 To get the deployment URL, check the workflow run logs or summary."
echo "   Visit: $RUN_URL"
echo ""
echo "📋 Deployment Info:"
echo "{"
echo "  \"runId\": $RUN_ID,"
echo "  \"runUrl\": \"$RUN_URL\","
echo "  \"commit\": \"$COMMIT_SHA\","
echo "  \"createdAt\": \"$CREATED_AT\""
echo "}"

