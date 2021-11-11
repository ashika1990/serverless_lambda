#!/bin/bash

echo "Demolishing your awesome stacks..."
aws s3 rm --recursive s3://testbucketvd

cd images
serverless remove

cd ..
cd gateway
serverless remove

echo "Demolishing complete :)"
read