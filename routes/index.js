const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");

module.exports = (app) => {
  app.use("/api/v1", authRoutes);
  app.use("/api/v1", productRoutes);
}