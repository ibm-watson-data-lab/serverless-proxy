const cloudant = require('./lib/db.js');
const utils = require('./lib/utils.js');

const main = function(msg) {
  
  // cloudant
  const db = cloudant.configure(msg.COUCH_HOST, msg.COUCH_DATABASE);

  // if we have been passed a path, then this is a GET /db/<docid> request
  if (msg.__ow_path && msg.__ow_path.length) {

    const bits = msg.__ow_path.split('/');
    const params = utils.allowParams(['attachments', 'att_encoding_info', 'atts_since', 'conflicts', 
      'deleted_conflicts', 'latest', 'local_seq', 'meta', 'open_revs', 'rev', 'revs', 'revs_info'], msg);
    var id = '';

    if (bits.length === 2) {
      // it's a request for a /db/id document
      id = decodeURIComponent(bits[1]);
    } else if (bits.length === 3 && bits[1] === '_local') {
      // it's a request for a _local/id document
      const lastbit = decodeURIComponent(bits[2]);
      id = '_local/' + lastbit;
    }
    return db.get(id, params).then(utils.reply).catch(utils.error);

  } else {
    // it's a GET /db/ request
    return db.info().then(utils.reply).catch(utils.error);
  }
};

exports.main = main;