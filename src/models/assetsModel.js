const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const assetsShema = new Schema ({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    acquired:{
        type: String,
        required: true
    },
    unit:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    comment : String,
    acknowledsedyear: String,
    approvalyear: String,
    dischargedyear : String,
    removeyear: String,
    reasonforselling: String,
    status: String

},{
    timestamps: true,
});

module.exports = mongoose.model("Assets", assetsShema);