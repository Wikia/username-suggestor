var usernameVerification = require("./username-verification.js");
var suggester = require("./suggester.js");
var bodyParser = require("body-parser");
var express = require("express");
var application = express();

application.use(bodyParser());
application.listen(3000, function () {});

application.post('/suggest', function (req, res) {
    var desiredWords = req.body.desiredWords;
    var desiredNumbers = req.body.desiredNumbers;
    suggester.suggest(desiredWords, desiredNumbers)
        .then(function (suggestedList) {
                  res.send(suggestedList);
              })
});

application.post('/verify', function (req, res) {
    var username = req.body.username;
    usernameVerification.verifyUsername(username)
        .then(function (errorList) {
                  res.send(errorList);
              })
});

application.post('/suggestEdited', function (req, res) {
    var body = req.body;
    var username = req.body.username;
    usernameVerification.editInputUsername(username)
        .then(function (suggestedList) {
                  res.send(suggestedList);
              })
});

/*var errorStrings = {};
 errorStrings["username_empty"] = "Username was not provided.";
 errorStrings["username_exceeds_max_length"] = "Username exceeded max length (50).";
 errorStrings["username_illegal_characters"] = "Username contains illegal characters.";
 errorStrings["username_ip_address"] = "Username is an IP address.";
 errorStrings["username_blocked"] = "Username has been blocked.";
 errorStrings["username_unavailable"] = "Username is spoofing another username.";
 errorStrings["username_already_exists"] = "Username is already in use.";*/