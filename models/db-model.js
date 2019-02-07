const db = require('./db');

exports.createUser = async (data) => {
    var sql = "INSERT INTO users SET ?";
    // await db.query(sql, parameters,function(err, results, fields) {
    //     if (err) throw err;
    //     console.log("New User");
    //     return results.insertId;
    // });
    var results = await new Promise((resolve, reject) =>  db.query(sql, data, (err, results) => {
      if(err) reject(err);
      resolve(results);
    }));

    var userId = results.insertId

    if(!userId){
      console.log("INSERT FAILED");
      return false;
    }
    var sql = "INSERT INTO balances SET ?";
    var data = {user_id: results.insertId, amount: 0};

    var results = await new Promise((resolve, reject) =>  db.query(sql, data, (err, results) => {
      if(err) reject(err);
      resolve(results);
    }));

    return userId;
};

exports.getUser = async (userId) => {
    var sql = "SELECT * FROM users WHERE id = ?";
    // await db.query(sql, userId, function(err, rows) {
    //     if (err) throw err;
    // 	return rows[0];
    // });
    var results = await new Promise((resolve, reject) =>  db.query(sql, userId, (err, results) => {
      if(err) reject(err);
      resolve(results);
    }));
    return results[0];
};

exports.getBalance = async (userId) => {
    var sql = "SELECT * FROM balances WHERE user_id = ?";
    // await db.query(sql, userId, function(err, rows) {
    //     if (err) throw err;
    // 	return rows[0];
    // });
    var results = await new Promise((resolve, reject) =>  db.query(sql, userId, (err, results) => {
      if(err) reject(err);
      resolve(results);
    }));
    return results[0].amount;
};


exports.updateUserBalance = async (userId, balance) => {
    var sql = "UPDATE balances SET amount = ? WHERE user_id = ?";
    // await db.query(sql, [balance, userId], function(err, results, fields){
    //     if (err) throw err;
    //     return true;
    // });
    var results = await new Promise((resolve, reject) =>  db.query(sql, [balance, userId], (err, results) => {
      if(err) reject(err);
      resolve(results);
    }));
    return true;
};

exports.createTransaction = async (senderId, receiverId, amount) => {
    var sql = "INSERT INTO transactions SET ?";
    var data = {sender_id: senderId, receiver_id: receiverId, amount: amount};
    // await db.query(sql, {sender_id: senderId, receiver_id: receiverId, amount: amount}, function(err, results, fields){
    //     if (err) throw err;
    //     return true;
    // });
    var results = await new Promise((resolve, reject) =>  db.query(sql, data, (err, results) => {
      if(err) reject(err);
      resolve(results);
    }));
    return true;
};
