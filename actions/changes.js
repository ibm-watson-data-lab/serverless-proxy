const utils = require('./lib/utils.js');
const cloudant = require('./lib/db.js');

const main = function(msg) {

  // security
  var params = utils.allowParams(['style', 'since', 'timeout','include_docs'], msg);

  // cloudant
  const db = cloudant.configure(msg.COUCH_HOST, msg.COUCH_DATABASE);

  // only return a maximum of 100 results
  params.limit = 100;

  // query filtered changes               
  return db.request( {
    db: msg.COUCH_DATABASE,
    path: '_changes',
    qs: params,
    method: 'POST'
  }).then(utils.reply).catch(utils.error);
};

exports.main = main;