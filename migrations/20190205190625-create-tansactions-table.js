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
  return db.createTable( "transactions", {
    id: {
      type: 'int',
      unsigned: true,
      primaryKey: true,
      autoIncrement: true
    },
    sender_id: {
      type: 'int',
      unsigned: true,
      foreignKey: {
        name: 'transactions_sender_id_fk',
        table: 'users',
        rules:{
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        mapping:{
          sender_id: 'id'
        }
      }
    },
    receiver_id: {
      type: 'int',
      unsigned: true,
      foreignKey: {
        name: 'transactions_receiver_id_fk',
        table: 'users',
        rules:{
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        mapping:{
          receiver_id: 'id'
        }
      }
    },
    amount: {
      type: "int",
      unsigned: true,
      notNull: true
    },
    created_at: {
      type: "timestamp",
      defaultValue: new String('CURRENT_TIMESTAMP')
    }
  });

};

exports.down = function(db) {
  return db.dropTable('transactions');
};

exports._meta = {
  "version": 1
};
