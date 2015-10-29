var express = require("express");
var router = express.Router();
var account = require("../models/account.js");
var logger = require("../lib/logger.js");
var mail = require("../lib/mail.js");
var user = require("../lib/user.js");

/**
 * @api {get} /api/user/add Add a user.
 * @apiName AddUser
 * @apiGroup User
 *
 *@apiVersion 1.0.0
 *
 * @apiParam {String} username Username of new user.
 * @apiParam {String} email Email of new user.
 *
 * @apiSuccess {String} result Api Call Complete
 *
 */
router.get("/add", function(req, res) {
    var username = req.query.username;
    var email = req.query.email;
    logger.log("info", "User Add", {email: email, username: username});
    user.add(username, email, function(password) {
        if (password == "ERROR") return;
        res.send("Api Call Complete");
        mail.sendBasic(email, "Your Get Me Food OTP", "Your otp is "+password);
    });
});

/**
 * @api {get} /api/user/login Login a user.
 * @apiName LoginUser
 * @apiGroup User
 *
 *@apiVersion 1.0.0
 *
 * @apiParam {String} username Username of new user.
 * @apiParam {String} password Password of new user.
 *
 * @apiSuccess {String} result Api Call Complete
 *
 */
router.get("/login", function(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    user.check(username, password, function(data) {
        logger.log("info", "User Check", {username: username, password: password, result: data});
        res.send(data);
    });
});

/**
 * @api {get} /api/user/gen Generate a new otp.
 * @apiName GenUser
 * @apiGroup User
 *
 *@apiVersion 1.0.0
 *
 * @apiParam {String} username Username of user to gen a password for.
 *
 * @apiSuccess {String} result Api Call Complete
 *
 */
router.get("/gen", function(req, res) {
    var username = req.query.username;
    user.gen(username, function(data){
        var email = data[1];
        var password = data[0];
        res.send("Api Call Complete");
        mail.sendBasic(email, "Your Get Me Food OTP", "Your otp is "+password);
    });
});


module.exports = router;