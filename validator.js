var rp = require("request-promise");

var isValid = exports.isValid = function (username) {
    var uri = process.env.HELIOSPATH;
    if (typeof uri == 'undefined') {
        uri = 'https://service.wikia.com/helios/username/validation';
    }

    var options = {
        uri: uri,
        method: 'POST',
        form: {username: username}
    };
    return rp(options);
};

var validateMany = exports.validateMany = function (usernames, validUsernames, arrayStep) {
    if (usernames.length == arrayStep) {
        return Promise.resolve(validUsernames);
    }
    return isValid(usernames[arrayStep])
        .then(function () {
                  validUsernames.push(usernames[arrayStep]);
                  return validateMany(usernames, validUsernames, arrayStep + 1);
              })
        .catch(function () {
                   return validateMany(usernames, validUsernames, arrayStep + 1);
               });
};