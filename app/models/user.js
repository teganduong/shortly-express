var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Link = require('./link');


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  comparePassword: function(userPassword, callback) {
    var hashedPw = bcrypt.hashSync(userPassword);

    bcrypt.compare(userPassword, hashedPw, function(err, result) {
      if (err) {
        console.log('error comparing password: ', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
  
  // initialize: function() {
  //   this.on('creating', function(model, attrs, options) {
  //     bcrypt.hash(model.get('password'), null, null, function(err, hash) {
  //       if (err) {
  //         console.log(err, 'Error in hashing password');
  //       } else {
  //         model.set('password', hash);          
  //       }
  //     });
  //   });
  // },

  // links: function() {
  //   return this.hasMany(Link);
  // }
});

module.exports = User;