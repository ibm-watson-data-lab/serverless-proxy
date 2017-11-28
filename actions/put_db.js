const cloudant = require('./lib/db.js');
const utils = require('./lib/utils.js');

const main = function(msg) {
  
  // cloudant
  const db = cloudant.configure(msg.COUCH_HOST, msg.COUCH_DATABASE);

  // if we have been passed a path, then this is a PUT /db/<docid> request
  if (msg.__ow_path && msg.__ow_path.length) {
    const bits = msg.__ow_path.split('/');
    var id = '';

    if (bits.length === 2) {
      // it's a write to a normal document
      id = decodeURIComponent(bits[1]);
    } else if (bits.length === 3 && bits[1] === '_local') {
      // it's a write to a a _local/id document
      id = '_local/' + decodeURIComponent(bits[2]); 
    }
    
    // strip the OpenWhisk stuff from the object
    msg = utils.removeOpenWhiskParams(msg);
    
    return db.insert(msg, id).then(utils.reply).catch(utils.error);

  } else {
    // it's a PUT /db request
    return new Error('PUT /db not supported');
  }

};

exports.main = main;