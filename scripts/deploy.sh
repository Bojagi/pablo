#! /bin/bash
set -e

echo $GITHUB_REF

if [[ $GITHUB_REF == *"next"* ]]; then
  echo "pre release - releasing to dist tag next"
  yarn publish --non-interactive --dist-tag next --access public ./build
else
  echo "normal release - releasing to dist tag latest"
  yarn publish --non-interactive --access public ./build
fi
