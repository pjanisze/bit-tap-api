'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable( "balances", {
    user_id: {
      type: 'int',
      unsigned: true,
      foreignKey: {
        name: 'balances_user_id_fk',
        table: 'users',
        rules:{
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        mapping:{
          user_id: 'id'
        }
      }
    },
    amount: {
      type: "int",
      unsigned: true,
      defaultValue: 0
    }
  });

};

exports.down = function(db) {
  return db.dropTable('balances');
};

exports._meta = {
  "version": 1
};
