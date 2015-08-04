/*var https = require('https');
var queryString = require('querystring');

var errorMessages = [];

var callback = function (response) {
    errorMessages = [];
    response.setEncoding('utf8');
    response.on('data', function (body) {
        var errors = JSON.parse(body)["errors"];
        if (response.statusCode == 400) {
            for (var i = 0; i < errors.length; i++) {
                errorMessages.push(errors[i]["description"]);
            }
        }
    })
};

exports.isValid = function (username) {
    var stringifiedUsername = queryString.stringify({username: username});
    var options = {
        hostname: 'services.wikia.com',
        port: 443,
        path: '/helios/username/validation',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(stringifiedUsername)
        }
    };

    var request = https.request(options, callback);
    request.write(stringifiedUsername);
    request.end();
    if (errorMessages.length == 0) {
        return false;
    }
    return true;
};

exports.getErrorMessages = function () {
    return errorMessages;
};*/

var rp = require("request-promise");

exports.isValid = function (username) {
    var options = {
        uri: 'https://services.wikia.com/helios/username/validation',
        method: 'POST',
        form: {username: username}
    };
    return rp(options);
};

exports.validateMany = function (usernames) {
    var validUsernames = [];
    for (var i = 0; i < usernames.length; i++) {
        isValid(usernames[i])
            .then(function () {
                 validUsernames.push(usernames[i]);
            });
    }
    return validUsernames;
};

