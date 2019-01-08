const AWS = require('aws-sdk');
const path = require("path");

// Setting AWS credentials
AWS.config.loadFromPath(path.resolve(__dirname + '/../../../aws-credentials.json'));

export const S3 = (() => {
    return new AWS.S3({apiVersion: '2006-03-01'});
})()