var validator = require("./validator.js");
var generator = require("./username-generator.js");

exports.verifyUsername = function (username) {
    return validator.isValid(username)
        .then(function () {
                  return Promise.resolve([]);
              })
        .catch(function (statusError) {
                   var errorMessages = [];
                   var response = statusError.response;
                   response.setEncoding('utf8');
                   var errors = JSON.parse(response.body)["errors"];

                   for (var i = 0; i < errors.length; i++) {
                       errorMessages.push(errors[i]["description"]);
                   }

                   return Promise.resolve(errorMessages);
               });
};

exports.editInputUsername = function (username) {
    var splitUsername = username.replace(/[^A-Za-z_-]+/g, "_");
    splitUsername = splitUsername.split(/[-_]+/);
    splitUsername = splitUsername.filter(Boolean);

    if (splitUsername.length == 0) {
        return Promise.resolve([]);
    }

    var splitNumber = username.replace(/[^0-9_-]+/g, "_");
    splitNumber = splitNumber.split(/[-_]+/);
    splitNumber = splitNumber.filter(Boolean);

    if (splitNumber.length == 0) {
        for (i = 0; i < 5; i++) {
            var randomNumber = Math.floor((Math.random * 100) + 1);
            splitNumber.push(randomNumber);
        }
    }
    return generator.generate(splitUsername, splitNumber)
        .then(function (suggestedList) {
                  return Promise.resolve(suggestedList);
              });
};
