
const utils = require('./lib/utils.js');
const cloudant = require('./lib/db.js');

const main = function (msg) {
  const db = cloudant.configure(msg.COUCH_HOST, msg.COUCH_DATABASE);
  const params = utils.allowParams([
    'conficts', 'descending', 'endkey', 'endkey_docid', 'include_docs',
    'inclusive_end', 'key', 'keys', 'limit', 'skip', 'stale', 'startkey',
    'start_key', 'startkey_docid', 'start_key_doc_id', 'update_seq'], msg);
  return db.list(params).then(utils.reply).catch(utils.error);
}

exports.main = main;