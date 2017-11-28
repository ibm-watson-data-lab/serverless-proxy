const utils = require('./lib/utils.js');
const cloudant = require('./lib/db.js');

const main = function (msg) {
  
  // cloudant
  const db = cloudant.configure(msg.COUCH_HOST, msg.COUCH_DATABASE);

  // strip the OpenWhisk stuff from the object
  msg = utils.removeOpenWhiskParams(msg);

  // Now we can do the revs_diff
  return db.request({
    db: msg.COUCH_DATABASE,
    path: '_revs_diff',
    method: 'POST',
    body: msg
  }).then(utils.reply).catch(utils.error);
}

exports.main = main;