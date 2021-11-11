"use strict";

const AWS = require("aws-sdk");

const s3 = new AWS.S3();

const bucket = process.env.Bucket;
var params = {
  Bucket: bucket
};

module.exports.handler = async (event,context,callback) => {

    let path = event.queryStringParameters.s3Url; // URL Image
    
    var params = { Bucket: bucket, Key: path };
     
    const data = await s3.getObject(params).promise();
    const contentBody = data.Body;
    const contentType = data.ContentType;
    
    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": + contentType,
        "Content-Disposition": "inline; filename="+path
      },
      body: contentBody.toString("base64"),
      isBase64Encoded: true
    };
  
    return callback(null, response);

};

/**
 * @param {url}
 * @returns {Promise}
 */
async function getImagesBucket(path) {
  console.log('getImagesBucket:', path);

  console.log('co:', path);
  console.log('bucket:', bucket);
//  var file = require('fs').createWriteStream('/tmp/pics/' + path);
  console.log('test1');
  var params = { Bucket: bucket, Key: path };
  //s3.getObject(params).createReadStream().pipe(file);

  s3.getObject(params, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      let response = {
        "statusCode": 200,
        'headers': {
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials' : True,
          'Content-Disposition': 'attachment; filename=' + path,
          'Content-Type': 'image/png',
        },
        "body": JSON.stringify(data),
        "isBase64Encoded": false
      };
      callback(null, response);
    }
  });

}



/**
 * @param {url}
 * @returns {Promise}
 */
async function getAllImagesBucket() {
  console.log('getAllImagesBucket:');
  const response = await s3.listObjectsV2(params).promise();
  var contents = response.Contents;
  console.log('going in:');
  contents.forEach(function (content) {
    console.log('co0oooooooo:');
    console.log('co:', content.Key);
    var file = require('fs').createWriteStream('/tmp/' + content.Key);
    console.log('test1');
    var params = { Bucket: bucket, Key: content.Key };
    const defImage = s3.getObject(params).promise();
    //return s3.getObject(params).createReadStream().pipe(file);

    return {
      statusCode: 200,
      isBase64Encoded: false,
      body: JSON.stringify(defImage.Body)
    };
  });




  if (response.IsTruncated) {
    params.ContinuationToken = response.NextContinuationToken;
    getAllImagesBucket();
  }

}

