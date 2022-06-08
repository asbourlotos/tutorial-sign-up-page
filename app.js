const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
//bodyparser may be deprecated for express.json. check this.
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
    //apiKey: "replace with api key",
    server: "us10"
});

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const listId = "6366bb58df";
    // MAILCHIMP DATA OBJECT
    const subscribingUser = {
        firstname: firstName,
        lastName: lastName,
        email: email,
    };
    // OLD COURSE CODE. ABOVE IS MAILCHIMP DATA
    // const data = {
    //     members: [
    //         {
    //             email_address: email,
    //             status: "subscribed",
    //             merge_fields: {
    //                 FNAME: firstName,
    //                 LNAME: lastName
    //             }
    //         }
    //     ]
    // }
    // const jsonData = JSON.stringify(data);

    // UPLOADING DATA TO SERVER
    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstname,
                LNAME: subscribingUser.lastName,
            }
        });
        res.sendFile(__dirname + "/success.html");
        console.log("Successfully added contact as an audience member. The contact's id is " + response.id + ".");
    }

    // EXECUTING RUN TO RUN FUNCTION AND CATCH ERROR
    run().catch(e => res.sendFile(__dirname + "/failure.html"));

    // OLD URL
    //const url = "https://us10.api.mailchimp.com/3.0/lists/6366bb58df";

    // OLD OPTIONS
    // const options = {
    //     method: "POST",
    //     auth: "alexbourlotos:<apikey>"
    // }

    // OLD REQUEST
    // const request = https.request(url, options, function(response) {
    //     response.on("data", function(data) {
    //         console.log(JSON.parse(data));
    //     });
    // });

    // request.write(jsonData);
    // request.end;
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(port, function() {
    console.log("Server is running on port " + port + ".");
});

// API KEY
// get from mailchimp site

// LIST ID
// 6366bb58df

// MAILCHIMP URL
// https://us10.admin.mailchimp.com/