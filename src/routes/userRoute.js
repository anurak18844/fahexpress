const express = require('express');
const app = express.Router();
const userCotroller = require('../controllers/userController');

app.get("/", userCotroller.getUser);
app.get("/:id", userCotroller.getUserById);
app.post("/register", userCotroller.register);
app.post("/login", userCotroller.login);
app.put("/:id", userCotroller.editUser);
app.delete("/:id", userCotroller.deleteUser);

module.exports = app;