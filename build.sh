#!/bin/sh

# This is petal electron build shell script
# Write on osx
# APP_SYMBOL defined in ../webpack/config.prod.js
# *** build need ***
# app/
#   resources/
#   package.json --- already exist
#   index.html
#   style.APP_SYMBOL.css
#   vendor.APP_SYMBOL.js
#   app.APP_SYMBOL.js
#   main.js

echo "Build start ..."

# bundle src file
echo "--- yarn run bundle:prod ---"
yarn run bundle:prod

# check main.js exists
if [ -e bundle/main.js ]
then
    echo "main.js exists, do you want to bundle it again? (enter Y/N)"
    read YES_OR_NO
    if [ "$YES_OR_NO" == "Y" ]
    then
        echo "--- yarn run build:main ---"
        yarn run bundle:main
    else
        echo "The input is N or others, go to next step"
    fi
else
    echo "There is no main.js, run bundle"
    echo "--- npm run build:main ---"
    yarn run bundle:main
fi

# copy main.js into app/
cp bundle/main.js app

# copy resources/ into app/
cp -R bundle/resources app

# run build
echo "Cooking Petal App... ^_^"
yarn run dist

# clear app/
rm -r app/resources
rm app/index.html
rm app/*.css
rm app/*.js

echo "--- Finish Build :) ---"
