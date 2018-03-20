#!/bin/bash
target=$1

if [[ $target == 'hotel-app' ]]
then
  echo " Do special handling of this hotel-app "
  appHtmlFile=`find ./manage-portal/dist/manage-portal/views/ -name *.html`
  appCssFile=`find ./manage-portal/dist/manage-portal/static/ -name base.*.css`
  appConfigFile=`find ./manage-portal/dist/manage-portal/static/ -name config.*.js`
else
  appHtmlFile=`find ./manage-portal/dist/manage-portal/$target/views/ -name *.html`
  appCssFile=`find ./manage-portal/dist/manage-portal/$target/static/ -name base.*.css`
  appConfigFile=`find ./manage-portal/dist/manage-portal/$target/static/ -name config.*.js`
fi

for html in $appHtmlFile
do
  echo "change [$html] base.css and config.js to dataFile"
  /usr/bin/sed -i "s/base.css/${appCssFile##*/}/g" $html
  /usr/bin/sed -i "s/config.js/${appConfigFile##*/}/g" $html
done
