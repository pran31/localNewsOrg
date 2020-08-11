require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const newsRouter = require("./routes/newsRouter")
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1/news', newsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is running on port", port);
})

//Db connection
const URL = process.env.MONGO_URL;
mongoose.connect(URL, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, err => {
    if (err) throw err;
    console.log("DB Connected");
})