#! /bin/bash
set -e

git checkout main
git fetch -p
git pull -r

yarn version --new-version $RELEASE_VERSION
git push
git push --tags
