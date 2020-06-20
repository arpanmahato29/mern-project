require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

//My Routes
const authRoutes = require("./routes/authentication")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")

//this is DBCONENCTION
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}).then(() => {
    console.log("DB CONNECTED");  
})

//this is middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes middleware
app.use("/api", authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);

//Port
const port = process.env.PORT || 8000;

//Starting the server
app.listen(port,() => {
    console.log(`app is running at ${port}`);
})