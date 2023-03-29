exports.patchEditPorfile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send('Please upload a file');
    }
    const imageUrl = `${req.protocol}://${req.hostname}:3000/${req.file.path}`;
    res.status(200).json({ message: `File uploaded successfully. URL: ${imageUrl}` });
  } catch (error) {
    console.log(error);
  }
}