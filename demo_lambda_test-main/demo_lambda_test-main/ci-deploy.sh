#!/bin/bash

cd gateway
serverless deploy
sleep 5s

cd ..
cd images
npm install
serverless deploy
sleep 5s

aws s3api put-object --bucket testbucketvd --key destination/ --content-length 0

echo "Press any key to continue"
read