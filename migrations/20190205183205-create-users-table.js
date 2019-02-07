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
  return db.createTable( "users", {
    id: { type: 'int', unsigned: true, primaryKey: true, autoIncrement: true},
    first_name: {type: 'string', notNull: true},
    last_name: {type: 'string', notNull: true},
    public_key: {type: 'string', notNull: true},
    email: {type: 'string', notNull: true, unique: true},
    password: {type: 'string', notNull: true}
  });
};

exports.down = function(db) {
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};
