"use strict";

const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");

const s3 = new AWS.S3();
const height = 500;
var imageType = "image/png";
const bucket = process.env.Bucket;

module.exports.handler = (event, context, callback) => {
  let requestBody = JSON.parse(event.body);
  let photoUrl = requestBody.photoUrl;
  let objectId = uuidv4();
  let objectKey = `rz-${height}-${objectId}.`;

  fetchImage(photoUrl)
  .then(image => {
      imageType= image.getMIME();

      if(imageType == 'image/png'){
          objectKey= objectKey+'png';
      } else if(imageType == 'image/jpg') {
          objectKey= objectKey+'jpg';
      } else if(imageType == 'image/jpeg') {
          objectKey= objectKey+'jpeg';
      }
      image.resize(Jimp.AUTO, height);
      return image.getBufferAsync(image.getMIME());            
  })
  .then(resizedBuffer => uploadToS3(resizedBuffer, objectKey, imageType))
  .then(function (response) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    });
  })
  .catch(error => console.log(error));

};

/**
 * @param {*} data
 */
function uploadToS3(data, key) {
  return s3
    .putObject({
      Bucket: bucket,
      Key: key,
      Body: data,
      ContentType: imageType
    })
    .promise();
}

/**
 * @param {url}
 * @returns {Promise}
 */
function fetchImage(url) {
  return Jimp.read(url);
}

/*
"use strict";

module.exports.getUsers = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify([
      {
        id: "09d21d59-c138-4f70-ae82-3552148d3d43",
        name: "Jimbo"
      },
      {
        id: "2f8fb730-5d09-4493-aea5-46b3e3f8b08a",
        name: "Dumbo"
      },
      {
        id: "03d2690f-6d01-4cf1-b947-a8cc0133cc9f",
        name: "Rambo"
      }
    ])
  };
};
*/