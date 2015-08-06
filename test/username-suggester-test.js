var assert = require("assert");
var userVerification = require("../username-verification.js");
var usernameGenerator = require("../username-generator.js");
var suggester = require("../suggester.js");

var expected = ["MidnaYelping", "Midna-Yelping",
                "Midna_Yelping", "MidnaYelping1",
                "Midna-Yelping1", "Midna_Yelping1",
                "YelpingMidna", "Yelping-Midna",
                "Yelping_Midna", "YelpingMidna1",
                "Yelping-Midna1", "Yelping_Midna1"];

describe('Username-Generate-Test', function () {
    this.timeout(5000);
    it('should return a list of valid usernames when given a list of words and numbers',
       function () {
           return usernameGenerator.generate(["Midna", "Yelping"], ["1"])
               .then(function (suggestedList) {
                         assert.equal(suggestedList.length, expected.length);
                         for (i = 0; i < suggestedList.length; i++) {
                             assert.notEqual(-1, expected.indexOf(suggestedList[i]));
                         }
                     })
       });
});

describe('Username-Verification-Test', function () {
    describe('#verifyValidUsername', function () {
        it('should return an empty list because suggested username is valid.', function () {
            return userVerification.verifyUsername("amieetto")
                .then(function (errorList) {
                          assert.deepEqual([], errorList);
                      });
        });
    });

    describe('#verifyInvalidUsername', function () {
        it('should return a list of errors because suggested username is invalid.', function () {
            return userVerification.verifyUsername("amietto")
                .then(function (errorList) {
                          assert.deepEqual(["username_unavailable", "username_already_exists"],
                              errorList);
                      });
        });
    });

    describe('#editInputUsername', function () {
        this.timeout(5000);
        it('should return an array of valid usernames derived from the inputted username',
           function () {
               return userVerification.editInputUsername("!@#$Midna__1**Yelping??")
                   .then(function (suggestedList) {
                             assert.equal(suggestedList.length, expected.length);
                             for (i = 0; i < suggestedList.length; i++) {
                                 assert.notEqual(-1, expected.indexOf(suggestedList[i]));
                             }
                         });
           });
    });
});

describe('Suggester-Test', function () {
    this.timeout(5000);
    it('should return an array of valid usernames when given a string of words and numbers',
       function () {
           return suggester.suggester("Midna, Yelping", "1")
               .then(function (suggestedList) {
                         assert.equal(suggestedList.length, expected.length);
                         for (i = 0; i < suggestedList.length; i++) {
                             assert.notEqual(-1, expected.indexOf(suggestedList[i]));
                         }
                     })
       });
});
