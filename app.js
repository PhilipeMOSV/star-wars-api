let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let apiRoutes = require("./api-routes");

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/starwarsdb", {useNewUrlParser: true});

app.get("/", (req, res) => {
    res.redirect("/api");
});

app.use("/api", apiRoutes);

app.listen(3000, () => {
    console.log("Server ON");
});