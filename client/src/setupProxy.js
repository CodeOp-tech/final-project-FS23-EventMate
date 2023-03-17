const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // URLs starting with /api go to http://localhost:5000/api
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5001",
      changeOrigin: true,
    })
  );
};
