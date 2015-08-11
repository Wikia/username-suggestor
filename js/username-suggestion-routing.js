var usernameVerification = require("./username-verification.js");
var suggester = require("./suggester.js");
var bodyParser = require("body-parser");
var express = require("express");
var application = express();

application.use(bodyParser.json());
application.use(bodyParser.urlencoded());
application.listen(3000, function () {});

var sendFileCall = function(req, res, fileName) {
    res.sendFile(fileName, {root: './public/'});
};

application.get('/', function (req, res) {
    sendFileCall(req, res, "index.html");
});

application.get('/:file', function (req, res) {
    sendFileCall(req, res, req.params.file);
});

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
    var username = req.body.username;
    usernameVerification.editInputUsername(username)
        .then(function (suggestedList) {
                  res.send(suggestedList);
              })
});