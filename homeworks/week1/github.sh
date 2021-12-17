#!/bin/bash

user=$(curl --silent https://api.github.com/users/aszx87410);
echo $user | grep -o '"name":.*"company"' | sed 's/"name": "//g' | sed 's/", "company"//g';
echo $user | grep -o '"bio":.*"twitter_username"' | sed 's/"bio": "//g' | sed 's/", "twitter_username"//g';
echo $user | grep -o '"location":.*"email"' | sed 's/"location": "//g' | sed 's/", "email"//g'
echo $user | grep -o '"blog":.*"location"' | sed 's/"blog": "//g' | sed 's/", "location"//g'