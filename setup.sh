#!/bin/bash

blue='\033[01;34m'
norm='\033[00m'

NPM=`which npm`
MONGO=`which mongo`
NODE=`which node`

echo -e "${blue}-Checking mongo${norm}\n"
MONGOVERSION=`$MONGO --version`
MONGOVERSION=""
if [ -z "$MONGOVERSION" ]; then
   echo -e "No MongoDB installation was found."
   echo -e "Please don't forget to check mongodb.host value in config/index.js.\n"
fi

echo -e "${blue}-Installing npm dependancies${norm}\n"
$NPM "install"

echo -e "${blue}-Starting application${norm}\n"
$NODE "App.js"