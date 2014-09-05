#!/bin/bash

if [[ $TRAVIS_BRANCH == 'master' ]] ; then
  bundle exec s3_website push --config-dir=stage_config
elif [[ $TRAVIS_BRANCH == 'live' ]] ; then
  bundle exec s3_website push
else
  echo 'Invalid branch. You can only deploy from master and live.'
  exit 1
fi
