exports.getProducts = async (req, res, next) => {
  res.status(200).json({ message: "Admin Routes hit" });
}