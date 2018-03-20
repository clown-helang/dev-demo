#!/bin/bash

updateServices=$1
oldIFS=$IFS
IFS=,
manageService="-manage"
appService="-app"

echo "========== Start update these applications:[$updateServices]  =========="
echo "==========  Start set hash file from [manage-portal]  =========="
cd manage-portal/
rm -rf ./dist/*.tar.gz
indexFile=`find ./dist/ -name index.*.js`
zhFile=`find ./dist/ -name zh-Hans-CN.*.js`
enFile=`find ./dist/ -name en-US.*.js`
headerFile=`find ./dist/ -name header.*.js`
indexCss=`find ./dist/ -name index.*.css`
headerCss=`find ./dist/ -name header.*.css`
indexHtml="./dist/manage-portal/index.html"
indexEnHtml="./dist/manage-portal/index-eng.html"
configFile=`find ./dist/ -name config.*.js`
echo "==========  End set hash file from [manage-portal]  =========="
cd ..
echo "==========  Start building applications  =========="
for value in $updateServices
do
  if [[ $value =~ $manageService ]]
  then
    echo "==========  Start building the [$value] manage-application  =========="
    cd service
    cd $value
    rm -rvf ../../manage-portal/dist/manage-portal/$value
    rm -rf yarn-error.log
    yarn
    yarnErrorFile="./yarn-error.log"
    while [ -f "$yarnErrorFile" ]
    do
      echo "==========  The yarn installation failed and is trying to reinstall it  =========="
      if cat $yarnErrorFile | grep ETIMEDOUT>/dev/null
      then
        echo "==========  has ETIMEDOUT Error , retry yarn  =========="
        rm -rf yarn-error.log
        yarn
      else
        echo "==========  other error , please contact the administrator   =========="
        rm -rf yarn-error.log
      fi
      yarnErrorFile="./yarn-error.log"
    done
    npm run build
    echo "==========  Start change hash file [$value]  =========="
    indexChildFile=`find ../../manage-portal/dist/manage-portal/$value/ -name index.*.js`
    zhChildFile=`find ../../manage-portal/dist/manage-portal/$value/ -name zh-Hans-CN.*.js`
    enChildFile=`find ../../manage-portal/dist/manage-portal/$value/ -name en-US.*.js`
    indexChildCss=`find ../../manage-portal/dist/manage-portal/$value/ -name index.*.css`
    indexChildHtml="../../manage-portal/dist/manage-portal/$value/index.html"
    indexEnChildHtml="../../manage-portal/dist/manage-portal/$value/index-eng.html"
    #chinese language file hash change
    /usr/bin/sed -i "s/index.css/${indexChildCss##*/}/g" $indexChildHtml
    /usr/bin/sed -i "s/header.css/${headerCss##*/}/g" $indexChildHtml
    /usr/bin/sed -i "s/header.js/${headerFile##*/}/g" $indexChildHtml
    /usr/bin/sed -i "s/index.js/${indexChildFile##*/}/g" $indexChildHtml
    /usr/bin/sed -i "s/zh-Hans-CN.js/${zhChildFile##*/}/g" $indexChildHtml
    /usr/bin/sed -i "s/config.js/${configFile##*/}/g" $indexChildHtml
    #english language file hash change
    /usr/bin/sed -i "s/index.css/${indexChildCss##*/}/g" $indexEnChildHtml
    /usr/bin/sed -i "s/header.css/${headerCss##*/}/g" $indexEnChildHtml
    /usr/bin/sed -i "s/header.js/${headerFile##*/}/g" $indexEnChildHtml
    /usr/bin/sed -i "s/index.js/${indexChildFile##*/}/g" $indexEnChildHtml
    /usr/bin/sed -i "s/en-US.js/${enChildFile##*/}/g" $indexEnChildHtml
    /usr/bin/sed -i "s/config.js/${configFile##*/}/g" $indexEnChildHtml
    echo "==========  End change hash file [$value]  =========="
    echo "==========  delete the develop files of [$value] manage-application  =========="
    rm -rvf ../../manage-portal/dist/manage-portal/$value/header.js
    rm -rvf ../../manage-portal/dist/manage-portal/$value/config.js
    echo "==========  manage-application [$value] construction completion  =========="
    cd ..
    cd ..
  elif [[ $value =~ $appService ]]
  then
    echo "==========  Start building the [$value] application  =========="
    cd app/
    cd $value
    rm -rf yarn-error.log
    yarn
    yarnErrorFile="./yarn-error.log"
    while [ -f "$yarnErrorFile" ]
    do
      echo "==========  The yarn installation failed and is trying to reinstall it  =========="
      if cat $yarnErrorFile | grep ETIMEDOUT>/dev/null
      then
        echo "==========  has ETIMEDOUT Error , retry yarn  =========="
        rm -rf yarn-error.log
        yarn
      else
        echo "==========  other error , please contact the administrator   =========="
        rm -rf yarn-error.log
      fi
      yarnErrorFile="./yarn-error.log"
    done
    npm run build
    rm -rf dist/index.html
    cp -rf dist/* ../../manage-portal/dist/manage-portal/
    cd ..
    cd ..
    echo "==========  End building the [$value] application  =========="
  else
    echo "==========  Invalid build project name entered  =========="
  fi
done
cd ./manage-portal/dist
echo "==========  begin to zip manage-portal"
tar -zcvf ./manage-portal.tar.gz manage-portal/
echo "==========  All the builds have been completed  =========="
IFS=$oldIFS
