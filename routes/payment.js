var bitcore = require('bitcore-explorers/node_modules/bitcore-lib');
var express = require('express');
var router = express.Router();
var dbModel = require('../models/db-model');
require('dotenv').load();
const BTC_NETWORK = process.env.BTC_NETWORK;



/*
privateKey => senders pk
senderId => senders user id
receiverId => receivers user id
amount => amount of btc to send
fee => fee (in BTC) to send to miners
*/
router.post("/", async function(req, res){
    var data = req.body;
    //ASSERT SENDER HAS ENOUGH BTC
    var senderBalance = await dbModel.getBalance(data.senderId);
    var receiverBalance = await dbModel.getBalance(data.receiverId);
    if (senderBalance < data.amount + data.fee){
      res.status(500).send({"error": "Not enough BTC for transaction"});
    }


    var privateKey = bitcore.PrivateKey.fromWIF(data.privateKey);
    var receiver = await dbModel.getUser(data.receiverId);
    var receiverPublicKey = bitcore.PublicKey.fromString(receiver.public_key);
    var sendersAddress = privateKey.toAddress();
    console.log("GOT HERE");
    var receiversAddress = bitcore.Address.fromPublicKey(receiverPublicKey, BTC_NETWORK);
    console.log("GOT HERE2");
    var amount = data.amount
    var fee = data.fee

    var Insight = require('bitcore-explorers').Insight;
    var insight = new Insight(BTC_NETWORK);



    var utxos = await new Promise((resolve, reject) =>
      insight.getUnspentUtxos(sendersAddress, (err, _utxos) => {
          if(err){
              console.log(err);
              reject(err);
          }
          console.log("UTXOS for: " + sendersAddress + " = " + _utxos);
          resolve(_utxos);
      })
    );
    if (utxos == undefined){
      res.status(500).send({"error": "Failed to get UTXOS"});
    }
    var tx = bitcore.Transaction();
    tx.from(utxos);
    tx.to(receiversAddress, amount);
    tx.change(sendersAddress);
    tx.fee(fee);
    tx.sign(privateKey);

    var txId = await new Promise((resolve, reject) =>
      insight.broadcast(tx, (err, _txId) => {
          if(err){
              console.log(err);
              reject(err);
          }
          console.log("TX COMPLETED. ID: " + _txId);
          resolve(_txId);
      })
    );
    if(txId == undefined){
      res.status(500).send({"error": "Failed to broadcast TX"});
    }

    //valid transaction, update balances
    await dbModel.createTransaction(data.senderId, data.receiverId, data.amount);
    await dbModel.updateUserBalance(data.senderId, senderBalance - (data.amount + data.fee));
    await dbModel.updateUserBalance(data.receiverId, receiverBalance + data.amount);

    res.status(400);
    res.json({"txId": txId});

});

module.exports = router;
