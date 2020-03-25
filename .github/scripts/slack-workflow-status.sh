#!/bin/sh

set -eu

(cd .github/slack/ && yarn install --silent)

emoji="$1"

export webhook="$SLACK_WEBHOOK_URL_WORKFLOWS"
version="$(cat .github/prisma-version.txt)"
branch="$(git rev-parse --abbrev-ref HEAD)"
sha="$(git rev-parse HEAD)"
short_sha="$(echo "$sha" | cut -c -7)"
message="$(git log -1 --pretty=%B)"

commit_link="\`<https://github.com/prisma/prisma2-e2e-tests/commit/$sha|$branch@$short_sha>\`"
workflow_link="<https://github.com/prisma/prisma2-e2e-tests/actions/runs/$GITHUB_RUN_ID|$message>"

node .github/slack/notify.js "$commit_link prisma@$version $emoji $workflow_link"
