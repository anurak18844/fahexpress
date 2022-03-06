require('dotenv').config({path: './config.env'});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { required } = require('nodemon/lib/config');
const port = process.env.PORT || 4002;

const categoryRoute = require('./routes/categoryRoute');
const departmentRoute = require('./routes/departmentRoute');
const userRoute = require('./routes/userRoute');
const assetsRoute = require('./routes/assetsRoute');

const app = express();
app.use(cors());
app.use(bodyParser.json());

require("./db")(app);

app.use("/category", categoryRoute)
app.use("/department", departmentRoute)
app.use("/user", userRoute)
app.use("/assets", assetsRoute)

app.get("/",(req, res)=>{
    res.send("Hello");
});

app.listen(port,()=>{
    console.log("App is running on port : "+port);
})