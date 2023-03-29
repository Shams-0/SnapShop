exports.patchEditPorfile = async (req, res, next) => {
  try {
    // if (!req.file) {
    //   return res.status(400).send("Please upload a file");
    // }

    // const filename = req.file.filename;
    // const fileContent = fs.readFileSync(req.file.path);

    // const imageUrl = `${req.protocol}://${req.hostname}:3000/${req.file.path}`;

    // uploadImageToS3(filename, fileContent)
    //   .then(data => {
    //     console.log(`File uploaded successfully. File URL: ${data.Location}`);
    //     res.status(200).json({ message: `File uploaded successfully. URL: ${data.Location}` });

    //   })
    //   .catch(error => {
    //     console.log(`File upload failed: ${error}`);
    //   });
    console.log("Hello");
    const fileUrl = req.file;
    res.status(200).json({ message: fileUrl })

  } catch (error) {
    console.log(error);
  }
}