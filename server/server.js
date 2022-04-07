const express = require("express");
const ATLAS_URI = require("./config");
const app = express();
const port = 8081
const api = require("./routes/api");

const cors = require("cors");

app.use(express.json());
app.use(cors());

console.log('server started');

app.use("/api", api);

app.listen(port, () => {
    console.log("App is listening on port " + port);
});


module.exports = app;