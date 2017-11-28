const utils = require('./lib/utils.js');
const cloudant = require('./lib/db.js');

const main = function(msg) {

  // security
  var params = utils.allowParams(['docs'], msg);
  var qs = utils.allowParams(['revs', 'latest', 'attachments'], msg);

  // cloudant
  var db = cloudant.configure(msg.COUCH_HOST, msg.COUCH_DATABASE);
  
  // make _bulk_get request
  return db.request({
    db: msg.COUCH_DATABASE,
    qs: qs,
    path: '_bulk_get',
    method: 'POST',
    body: params
  }).then(utils.reply).catch(utils.error);
};

exports.main = main;