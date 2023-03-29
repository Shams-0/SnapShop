const fs = require('fs');

const AWS = require("aws-sdk");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadImageToS3 = (filename, fileContent) => {
  const params = {
    Bucket: "cyclic-wild-erin-cape-buffalo-slip-eu-west-2",
    Key: filename,
    Body: fileContent
  };
  return s3.upload(params).promise();
}

exports.patchEditPorfile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("Please upload a file");
    }

    const filename = req.file.filename;
    const fileContent = fs.readFileSync(req.file.path);

    const imageUrl = `${req.protocol}://${req.hostname}:3000/${req.file.path}`;

    uploadImageToS3(filename, fileContent)
      .then(data => {
        console.log(`File uploaded successfully. File URL: ${data.Location}`);
        res.status(200).json({ message: `File uploaded successfully. URL: ${data.Location}` });

      })
      .catch(error => {
        console.log(`File upload failed: ${error}`);
      });

  } catch (error) {
    console.log(error);
  }
}