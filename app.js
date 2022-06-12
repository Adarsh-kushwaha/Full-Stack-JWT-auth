require("dotenv").config();
require("express-async-errors");

const express = require('express');
const app = express();

const mainRoute = require("./routes/main");
const notFoundMiddleware = require("./middleware/errorHandler");
const errorHandlerMiddleware = require("./middleware/errorHandler");

app.use(express.json());

app.use("/api/v1", mainRoute)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 5000 || process.env.PORT;

const start = async () => {
    try {
        app.listen(port, console.log(`server is running on port ${port}`))
    } catch (err) {
        console.log(err)
    }
}

start()