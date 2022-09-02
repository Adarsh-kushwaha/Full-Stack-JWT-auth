require("dotenv").config()
const express = require('express');
const connect = require('./db/connect');
const error = require('./middleware/error');

const app = express();

//middleware
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

//error Handler Middleware (should be last peice of middleware)
app.use(error);

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await connect(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`listening to port ${PORT}`));
    } catch (err) {
        console.log(err)
    }
}

start();
