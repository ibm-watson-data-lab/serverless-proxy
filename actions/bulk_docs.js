const utils = require('./lib/utils.js');
const cloudant = require('./lib/db.js');

const main = function(msg) {

  // parameters
  const params = utils.allowParams(['docs', 'new_edits'], msg);

  // cloudant
  const db = cloudant.configure(msg.COUCH_HOST, msg.COUCH_DATABASE);

  return db.bulk(params).then(utils.reply).catch(utils.error);
}

exports.main = main;