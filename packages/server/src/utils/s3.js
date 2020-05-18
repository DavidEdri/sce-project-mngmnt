import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import awsConfig, { Bucket } from "../config/aws";

aws.config.update(awsConfig);

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "b-card86",
    metadata(_, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, res, cb) {
      cb(null, `${req.user.manages}_${Date.now().toString()}`);
    },
  }),
});

export const uploadFileArray = async function(fileArray, filePrefix) {
  const res = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const file of fileArray) {
    const filename = Date.now().toString();
    const fileParams = {
      Bucket,
      Key: `${filePrefix}/${filename}`,
      Body: file.buffer,
      ACL: "public-read",
    };

    const tmp = await s3.upload(fileParams).promise();
    res.push(tmp.Location);
  }

  return res;
};

export default upload;

export const deleteUrlsArray = async function(urlsArray) {
  const Objects = urlsArray.map((url) => ({ Key: url.split(".com/")[1] }));

  const fileParams = {
    Bucket,
    Delete: { Objects },
  };

  await s3.deleteObjects(fileParams).promise();
};
