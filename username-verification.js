var validator = require("./validator.js");
var generator = require("./username-generator.js");

var errorStrings = {};
errorStrings["username_empty"] = "Username was not provided.";
errorStrings["username_exceeds_max_length"] = "Username exceeded max length (50).";
errorStrings["username_illegal_characters"] = "Username contains illegal characters.";
errorStrings["username_ip_address"] = "Username is an IP address.";
errorStrings["username_blocked"] = "Username has been blocked.";
errorStrings["username_unavailable"] = "Username is spoofing another username.";
errorStrings["username_already_exists"] = "Username is already in use.";

exports.verifyUsername = function (username) {
    validator.isValid(username)
        .then(function () {
                  return [];
              })
        .catch(function (statusError) {
                  var errorMessages = [];
                  var response = statusError.response;
                  response.setEncoding('utf8');
                  var errors = JSON.parse(response.body)["errors"];

                  for (var i = 0; i < errors.length; i++) {
                      errorMessages.push(errors[i]["description"]);
                  }

                  if (errorMessages.indexOf("username_empty") != -1
                      || errorMessages.indexOf("username_ip_address") != -1) {
                      return ["error"];
                  }
              });
};

exports.editInputUsername = function(username) {
    var splitUsername = username.replace(/[^A-Za-z_-]+/g, "");
    splitUsername = splitUsername.split(/[-_]+/);

    if (splitUsername.length == 0) {
        return [];
    }

    var splitNumber = username.replace(/[^0-9_-]+/g, "");
    splitNumber = splitNumber.split(/[-_]+/);

    if (splitNumber.length == 0) {
        for (i = 0; i < 5; i++) {
            var randomNumber = Math.floor((Math.random * 100) + 1);
            splitNumber.push(randomNumber);
        }
    }
    return generator.generate(splitUsername, splitNumber);
}
