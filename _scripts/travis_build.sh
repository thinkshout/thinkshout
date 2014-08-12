#!/bin/bash

if [[ $TRAVIS_BRANCH == 'master' ]] ; then
  bundle exec rake stage
elif [[ $TRAVIS_BRANCH == 'live' ]] ; then
  bundle exec rake publish
else
  echo 'Invalid branch. You can only deploy from master and live.'
  exit 1
fi
