#!/bin/bash

blue='\033[01;34m'
norm='\033[00m'

NPM=`which npm`
NODE=`which node`

echo -e "${blue}-Installing npm dependancies${norm}\n"
$NPM "install"

echo -e "${blue}-Starting application${norm}\n"
$NODE "App.js"