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
#   app.[chunkhash].APP_SYMBOL.js
#   main.js
#   *.map

echo "Build start ..."

# bundle src file
if [[ ! -e app/index.html ]]
then
    echo "There is no index.html, run script:"
    echo "--- yarn run bundle:prod ---"
    yarn run bundle:prod
fi

# check main.js exists
if [[ ! -e app/main.js ]]
then
    echo "There is no main.js, run script:"
    echo "--- yarn run bundle:electron-prod ---"
    yarn run bundle:electron-prod
fi

# copy resources/ into app/
cp -R bundle/resources app

# run build
echo "Cooking Petal App... ^_^"
yarn run dist

# clear app/
chmod +x ./clearapp.sh
./clearapp.sh

echo "--- Finish Build :) ---"
