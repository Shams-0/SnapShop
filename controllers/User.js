exports.patchEditPorfile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const fileUrl = req.file.location;
    console.log(`File uploaded successfully. File URL: ${fileUrl}`);
    res.send('File uploaded successfully');
  } catch (error) {
    console.log(error);
  }
}