#!/bin/bash

if [[ $TRAVIS_BRANCH == 'master' ]]
  bundle exec rake stage
else
  bundle exec rake publish
fi
