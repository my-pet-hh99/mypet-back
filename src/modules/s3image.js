const S3 = require("aws-sdk");
require("dotenv/config");

const s3delete = (req, res, next) => {
  const s3 = new S3({
    accessKeyId: process.env.S3_KEYID,
    secretAccessKey: process.env.S3_PRIVATE_KEY,
    region: process.env.REGION,
  });
};
