const express = require("express");
const connectDB  = require("./config/db");
const cors = require("cors")
const authRoute = require("./routes/authRoute")

require("dotenv").config();
connectDB();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/api/user", authRoute);

app.listen(PORT,()=>{
    console.log(`server runnung on port ${PORT}` )
})

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
});
