```sh
chmod +x .\ci-deploy.sh
chmod +x .\ci-decomission.sh
```

### Configure your AWS Deployment Account

Provide an AWS account that have sufficient access so that serverless can deploy the stack.

```sh
serverless config credentials --provider aws --key YOUR_AWS_ACCESS_KEY --secret YOUR_AWS_SECRET_KEY
```

# Deploying the API Gateway + Lambda Stack

To deploy the

```sh
.\ci-deploy
```

# Decomission all resources

```sh
.\ci-decomission
```

# Tested using the below Commands

Replace the Below Upload and Download URL with your ones

# UPLOAD:

curl -X POST https://3bk5z8o5hk.execute-api.ap-southeast-1.amazonaws.com/dev/upload  -H 'Content-Type: application/json'   -d '{"photoUrl": "http://node.green/logo.png"}'

curl -X POST https://3bk5z8o5hk.execute-api.ap-southeast-1.amazonaws.com/dev/upload  -H 'Content-Type: application/json'   -d '{"photoUrl": "https://hullabaloo.co.uk/wp-content/uploads/2021/04/scalemodelmaker.jpg"}'


curl -X POST https://z1oa2sax03.execute-api.ap-southeast-1.amazonaws.com/dev/upload  -H 'Content-Type: application/json'   -d '{"photoUrl": "https://png.pngtree.com/png-clipart/20190515/original/pngtree-beautiful-hologram-water-color-frame-png-image_3643167.jpg"}'


curl -X POST https://z1oa2sax03.execute-api.ap-southeast-1.amazonaws.com/dev/upload  -H 'Content-Type: application/json'   -d '{"photoUrl": "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg"}'

https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg


# DOWNLOAD:

curl -O -J -L -H "Accept: image/png" -H "Content-Type: image/png" -X GET https://3bk5z8o5hk.execute-api.ap-southeast-1.amazonaws.com/dev/download?s3Url=rz-500-9a260a93-84e9-435f-ae74-ad34e6b5ad90.png

curl -O -J -L -H "Accept: image/png" -H "Content-Type: image/png" -X GET https://3bk5z8o5hk.execute-api.ap-southeast-1.amazonaws.
com/dev/download?s3Url=rz-500-753661ae-84db-43cb-b0e0-e606f7a941ad.jpeg



