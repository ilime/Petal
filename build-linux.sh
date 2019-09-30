echo "Start building..."

# yarn build:electron:prod && yarn build
if [[ ! -e app/build/index.html ]]
then
    echo "There is no index.html, run script:"
    echo "--- yarn build:electron:prod && yarn build ---"
    yarn build:electron:prod && yarn build
fi

# copy build files to app
cp -r build app/build

# yarn dist:electron
echo "Cooking App... ^_^"
yarn dist:electron:auto

# clear app/
rm -rv app/build

echo "--- Finish Build :) ---"
