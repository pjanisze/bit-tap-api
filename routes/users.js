var bitcore = require('bitcore-explorers/node_modules/bitcore-lib');
var dbModel = require('../models/db-model');
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').load();
const BTC_NETWORK = process.env.BTC_NETWORK;

//new user
router.post("/", async (req, res, next) => {
  var data = req.body;
  var value = Buffer.from(data.seed);
  var hash = bitcore.crypto.Hash.sha256(value);
  var bn = bitcore.crypto.BN.fromBuffer(hash);
  var privateKey = new bitcore.PrivateKey(bn, BTC_NETWORK);
  var privateKeyWif = privateKey.toWIF();
  var publicKey = new bitcore.PublicKey(privateKey).toString();

  data = {
    first_name: data.firstName,
    last_name: data.lastName,
    public_key: publicKey,
    email: data.email,
    password: bcrypt.hashSync(data.password, 10)
  };

  var userId = await dbModel.createUser(data);
  console.log("New User");
  res.json({"userId": userId, "privateKey": privateKeyWif});
});

//get user
router.get("/:userId", async (req, res) => {


    var user = await dbModel.getUser(req.params.userId);
    if(!user){
        res.status(404).send("User Fetch Failed");
    }
    res.json(user);
});
module.exports = router;
