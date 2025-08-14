const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")
const AuthRouter = require("./Routes/AuthRouter")
const ProductRouter = require("./Routes/ProductRouter");

require('dotenv').config()
require("./Models/db");;
const PORT = 8081;



app.use(cors({
  origin: 'https://form-validator-kappa-topaz.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(bodyParser.json());

app.use("/auth",AuthRouter);
app.use("/products",ProductRouter);

app.listen(PORT,()=>{
    console.log(`Server running in this ${PORT}`)
});

    