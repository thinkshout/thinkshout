#!/bin/bash

<<<<<<< HEAD
if [[ $TRAVIS_BRANCH == 'master' ]] ; then
  bundle exec rake stage
elif [[ $TRAVIS_BRANCH == 'live' ]] ; then
  bundle exec rake publish
=======
if [[ $TRAVIS_BRANCH == 'master' || $TRAVIS_BRANCH == 'live' ]]; then
  bundle exec rake build
>>>>>>> eb846227aa8e11417ffa85976b00320710917f2d
else
  echo 'Invalid branch. You can only deploy from master and live.'
  exit 1
fi
