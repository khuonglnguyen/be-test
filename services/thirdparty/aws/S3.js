const AWS = require("aws-sdk");
const defaultConfig = require("../../../config/default.config");

const putObject = async (data, key) => {
  const {
    accessKeyId,
    secretAccessKey,
    s3: { bucket, region },
  } = defaultConfig.aws;
  try {
    const base64data = new Buffer(data, "binary");
    const client = new AWS.S3({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const res = client.putObject(
      {
        Bucket: bucket,
        Key: key,
        Body: base64data,
      },
      function () {
        console.log(arguments);
        console.log("Successfully uploaded package.");
      }
    );
    return res.response;
  } catch (error) {
    return error;
  }
};

const getObject = async (key) => {
  const {
    accessKeyId,
    secretAccessKey,
    s3: { bucket, region },
  } = defaultConfig.aws;
  try {
    const client = new AWS.S3({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const res = await client
      .getObject({
        Bucket: bucket,
        Key: key,
      })
      .promise();
    return res.Body;
  } catch (error) {
    return error;
  }
};

const downSign = async (key) => {
  const {
    accessKeyId,
    secretAccessKey,
    s3: { bucket, region },
  } = defaultConfig.aws;
  try {
    const client = new AWS.S3({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const res = await client.getSignedUrl("getObject", {
      Bucket: bucket,
      Key: key,
    });
    return res;
  } catch (error) {
    return error;
  }
};

module.exports = {
  putObject,
  getObject,
  downSign,
};
