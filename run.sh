#!/bin/bash

for inFile in input/*.json
do
  inFile="./${inFile}"
  outFile=`echo $inFile | cut -d '/' -f3`
  outFile="output/${outFile}"
  npm run transform $inFile $outFile
done
