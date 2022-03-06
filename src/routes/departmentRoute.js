const express = require('express');
const app = express.Router();
const departmentController = require('../controllers/departmentController');

app.get("/", departmentController.getDepartments);
app.get("/:id", departmentController.getDepartmetById);
app.post("/addDepartment", departmentController.addDepartment);
app.put("/:id", departmentController.editDepartment);
app.delete("/:id",departmentController.deleteDepartment);

module.exports = app;