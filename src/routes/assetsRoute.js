const express = require('express');
const app = express.Router();
const assetsController = require('../controllers/assetsController');

app.get("/", assetsController.getAssets);
app.get("/:id", assetsController.getAssetsById);
app.post("/addAssets", assetsController.addAssets);
app.put("/:id", assetsController.editAssets);
app.delete("/:id", assetsController.deleteAssets);

module.exports = app;

