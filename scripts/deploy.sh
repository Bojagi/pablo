#! /bin/bash
set -e

echo $VERSION

if [[ $VERSION == *"next"* ]]; then
  echo "pre release - releasing to dist tag next"
  yarn publish --non-interactive --dist-tag next --access public ./dist
else
  echo "normal release - releasing to dist tag latest"
  yarn publish --non-interactive --access public ./dist
fi
