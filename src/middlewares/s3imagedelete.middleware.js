const aws = require("aws-sdk");
require("dotenv/config");

const PostRepository = require("../layers/repositories/post.repository");

module.exports = s3Delete = async (req, res, next) => {
  try {
    const postRepository = new PostRepository();

    const s3 = new aws.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
      region: process.env.S3_REGION,
    });

    const imageUrl = await postRepository.getUrlById(req.params.postId);
    console.log(imageUrl.imageUrl);
    const bucketname = process.env.S3_BUCKET_NAME;

    s3.deleteObject(
      {
        Bucket: bucketname,
        Key: imageUrl.imageUrl,
      },
      (err, data) => {
        if (err) {
          console.error(err);
          console.log(data);
        } else {
          console.log("이미지 삭제 성공");
        }
      }
    );
    res.locals.success = true;
    next();
  } catch (err) {
    res.locals.success = false;
    next();
  }
};
