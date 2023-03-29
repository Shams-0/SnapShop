const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const path = require("path");
require("dotenv").config();

// create s3 instance using S3Client 
// (this is how we create s3 instance in v3)
const s3 = new S3Client({
  endpoint: "https://wild-erin-cape-buffalo-slip.cyclic.app",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION
})


const s3Storage = multerS3({
  s3: s3, // s3 instance
  bucket: "my-images", // change it as per your project requirement
  acl: "public-read", // storage access type
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname })
  },
  key: (req, file, cb) => {
    const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
    cb(null, fileName);
  }
});


// function to sanitize files and send error for unsupported files
function sanitizeFile(file, cb) {
  // Define the allowed extension
  const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

  // Check allowed extensions
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );

  // Mime type must be an image
  const isAllowedMimeType = file.mimetype.startsWith("image/");

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // no errors
  } else {
    // pass error msg to callback, which can be displaye in frontend
    cb("Error: File type not allowed!");
  }
}

// our middleware
const upload = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback)
  },
  limits: {
    fileSize: 1024 * 1024 * 2 // 2mb file size
  }
})

module.exports = upload;



































// require("dotenv").config();
// const AWS = require('aws-sdk');
// const multerS3 = require('multer-s3');
// const multer = require("multer");

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION
// });
// const s3 = new AWS.S3();

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'cyclic-wild-erin-cape-buffalo-slip-eu-west-2',
//     acl: 'public-read',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
//   })
// });




// module.exports = upload;






















// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

//   const upload = multer({ storage: storage });






























// const multer = require("multer");

// var fs = require("fs");

// const storage = (field) =>
//   multer.diskStorage({
//     destination: (req, file, cb) => {
//       let dir = "uploads";
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir);
//       }
//       cb(null, `uploads/${field}`);
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });

// const fileFilter = (filters) => (req, file, cb) => {
//   if (filters.some((item) => item === file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Wrong extension type"), false);
//   }
// };

// const uploader = (folder) =>
//   multer({
//     storage: storage(folder),
//     fileFilter: fileFilter(["image/png", "image/jpg", "image/jpeg"]),
//     limits: { fileSize: 15 * 1024 * 1024 },
//   });

// async function addPathToBody(req, res, next) {
//   if (req.files) {
//     if (!Array.isArray(req.files)) {
//       let files = {};
//       Object.keys(req.files).map((key) => (files[key] = { files: [] }));
//       for (var key in req.files) {
//         req.files[key].map((file) =>
//           files[key].files.push({
//             url:
//               file.path != undefined ? "http://localhost:3000/" + file.path : null,
//           })
//         );
//         req.body["images"] = files;
//       }
//     } else {
//       let files = [];
//       req.files.map((file) => {
//         files.push({
//           url: file.path != undefined ? "http://localhost:3000/" + file.path : null,
//         });
//       });
//       req.body["images"] = files;
//     }
//   }

//   next();
// }

// module.exports = (folder = "/", field, type = "single") => {
//   return [
//     type === "array"
//       ? uploader(folder).array(field)
//       : type === "fields"
//         ? uploader(folder).fields(field)
//         : uploader(folder).single(field),
//     addPathToBody,
//   ];
// };
