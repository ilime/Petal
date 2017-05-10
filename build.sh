#!/bin/sh
# This is petal electron build shell script
# Write on osx
# *** build need ***
# app/
#   resources/
#   package.json --- already exist.
#   index.html --- already exist
#   style.css
#   vendor.js
#   app.js
#   main.js

echo "build start ..."

# bundle src file
echo "--- npm run bundle:pro ---"
npm run bundle:pro

# check main.js exists
if [ -e main.js ]
then
		echo "main.js exists, do you want to bundle it again? (enter Y/N)"
		read YES_OR_NO
		if [ "$YES_OR_NO" == "Y" ]
		then
				echo "--- npm run build:main ---"
				npm run bundle:main
		else
				echo "the input is N or others, go to next step"
		fi
else
		echo "there is no main.js, run bundle"
		echo "--- npm run build:main ---"
		npm run bundle:main
fi

# copy main.js into app/
cp main.js app

# copy resources/ into app/
cp -R resources app

# run build
npm run dist

# clear app/
rm -r app/resources
rm -r app/node_modules
rm app/style.css
rm app/*.js

echo "--- finish build :) ---"