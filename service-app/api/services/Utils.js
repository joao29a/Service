module.exports.randomString = function(len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

module.exports.getUser = function(user) {
  if (user[0]) return user[0];
  return user;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.getDate = function() {
  var MyDate = new Date();

  return ('0' + MyDate.getDate()).slice(-2) + '/'
       + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
       + MyDate.getFullYear();
}; 
