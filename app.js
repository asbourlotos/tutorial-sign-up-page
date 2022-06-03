const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
//bodyparser may be deprecated for express.json. check this.
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    console.log(firstName, lastName, email);
});

app.listen(port, function() {
    console.log("Server is running on port " + port + ".");
});