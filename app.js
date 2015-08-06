var usernameVerification = require("./username-verification.js");

usernameVerification.editInputUsername("!@#$Midna__1**Yelping??")
.then(function(list) {
    console.log(list);
          });

var errorStrings = {};
errorStrings["username_empty"] = "Username was not provided.";
errorStrings["username_exceeds_max_length"] = "Username exceeded max length (50).";
errorStrings["username_illegal_characters"] = "Username contains illegal characters.";
errorStrings["username_ip_address"] = "Username is an IP address.";
errorStrings["username_blocked"] = "Username has been blocked.";
errorStrings["username_unavailable"] = "Username is spoofing another username.";
errorStrings["username_already_exists"] = "Username is already in use.";