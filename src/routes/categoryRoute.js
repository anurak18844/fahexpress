const express = require('express');
const app = express.Router();
const categoryController = require('../controllers/categoryController')

app.get("/", categoryController.getCategories);
app.get("/:id", categoryController.getCategoryById);

app.post("/addCategory", categoryController.addCategory);

app.put("/:id", categoryController.editCategory);

app.delete("/:id",categoryController.deleteCategory);

module.exports = app;