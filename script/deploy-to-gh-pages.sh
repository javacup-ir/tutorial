#!/bin/bash

# config
git config --global user.email "mjh385@gmail.com"
git config --global user.name "mjh385"

# deploy
cd ./public
git init
git add .
git commit -m "Deploy to Github Pages"
git push --force "https://${github_token}:x-oauth-basic@github.com/${repo_path}.git" master:gh-pages