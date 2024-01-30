import aws from "aws-sdk";
import dotenv from "dotenv";
import crypto from "crypto";
import { promisify } from "util";

const randomBytes = promisify(crypto.randomBytes);

dotenv.config();
const region = "ap-south-1";
const accessKeyId = "AKIA6ODU3ENTHQXOBIGB";
const secretAccessKey = "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";
const bucketName = "images-project3";

export const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export const uploadFile = (fileName, fileType) => {
  const s3Params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: 500,
    ACL: "public-read",
    ContentType: fileType,
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      throw err;
    }

    const result = {
      signedRequest: data,
      url: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
    };
    return result;
  });
};
