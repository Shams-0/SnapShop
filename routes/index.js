const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const stripeRoutes = require("./stripRoutes");

module.exports = (app) => {
  app.use("/api/v1", authRoutes);
  app.use("/api/v1", productRoutes);
  app.use("/api/v1", stripeRoutes);
}