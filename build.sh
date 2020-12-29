#!/bin/bash

GREEN='\033[0;32m'
NC='\033[0m' # No Color
TASK=${GREEN}build-script${NC}

pushd server

echo -e "$TASK Building server..."
npm run build
echo -e "$TASK Building server done."

popd

echo -e "$TASK Clean up old artifacts..."
rm -rf production-server
mkdir production-server
echo -e "$TASK Clean up old artifacts done."

echo -e "$TASK Copying server files..."
cp -rT server/dist production-server/server
cp -rT server/public production-server/server/public
cp -r server/package.json production-server
cp -r server/package-lock.json production-server

echo -e "$TASK Building production artifacts done."