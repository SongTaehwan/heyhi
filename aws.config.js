const AWS = require('aws-sdk');

AWS.config.region = 'ap-northeast-2';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'ap-northeast-2:9775dd0f-01c4-4326-b45c-12c1a9776338',
});

module.exports = AWS;
