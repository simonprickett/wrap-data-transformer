#!/bin/bash

for inFile in input/*.json
do
  inFile="./${inFile}"
  outFolder="output"
  npm run transform $inFile $outFolder
done
