var validator = require("./validator.js");

exports.generate = function (suggestedWords, suggestedNumbers) {
    var suggestedList = [];

    if (suggestedWords.length == 1) {
        suggestedList = suggestedWords;
    } else {
        for (var i = 0; i < suggestedWords.length; i++) {
            for (var j = 0; j < suggestedWords.length; j++) {
                if (suggestedWords.indexOf(suggestedWords[i])
                    != suggestedWords.indexOf(suggestedWords[j])) {
                    suggestedList.push(suggestedWords[i] + suggestedWords[j]);
                    suggestedList.push(suggestedWords[i] + "_" + suggestedWords[j]);
                    suggestedList.push(suggestedWords[i] + "-" + suggestedWords[j]);
                }
            }
        }
    }

    var suggestedListWithNumbers = [];
    for (var k = 0; k < suggestedList.length; k++) {
        for (var m = 0; m < suggestedNumbers.length; m++) {
            suggestedListWithNumbers.push(suggestedList[k] + suggestedNumbers[m]);
        }
    }

    suggestedList = suggestedList.concat(suggestedListWithNumbers);

    return validator.validateMany(suggestedList, [], 0)
        .then(function (suggestedList) {
                  return Promise.resolve(suggestedList);
              });
};