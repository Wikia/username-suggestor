var usernameGenerator = require("./username-generator.js");

exports.suggester = function (wordString, numberString) {
    var words = wordString.split(", ");
    var numbers = numberString.split(", ");

    return usernameGenerator.generate(words, numbers)
        .then(function (suggestedList) {
                  return Promise.resolve(suggestedList);
              });
};