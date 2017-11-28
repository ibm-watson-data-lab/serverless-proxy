const cloudant = require('./lib/db.js');
const utils = require('./lib/utils.js');

const main = function(msg) {
  
  // cloudant
  const db = cloudant.configure(msg.COUCH_HOST, msg.COUCH_DATABASE)

  // if we have been passed a path, then this is a DEL /db/<docid> request
  if (msg.__ow_path && msg.__ow_path.length) {
    const bits = msg.__ow_path.split('/');
    const id = decodeURIComponent(bits[1]);
    
    // strip the OpenWhisk stuff from the object
    msg = utils.removeOpenWhiskParams(msg);
    
    return db.destroy(id, msg.rev).then(utils.reply).catch(utils.error);

  } else {
    // it's a DEL /db request
    return new Error('DEL /db not supported');
  }

};

exports.main = main;