#!/bin/bash

if [[ $TRAVIS_BRANCH == 'master' || $TRAVIS_BRANCH == 'live' ]]; then
  bundle exec rake build
else
  echo 'Invalid branch. You can only deploy from master and live.'
  exit 1
fi
