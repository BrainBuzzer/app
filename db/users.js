var records = [
    { id: 1, username: 'adi', password: 'secret', displayName: 'Aditya', taluqua: 'LLL' },
];

exports.findById = function(id, cb) {
  var idx = id - 1;
  if (records[idx]) {
    cb(null, records[idx]);
  } else {
    cb(new Error('User ' + id + ' does not exist'));
  }
}

exports.findByUsername = function(username, cb) {
  for (var i = 0, len = records.length; i < len; i++) {
    var record = records[i];
    if (record.username === username) {
      return cb(null, record);
    }
  }
  return cb(null, null);
}