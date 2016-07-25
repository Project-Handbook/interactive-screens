var Utils = module.exports = {};

var win32 = process.platform === 'win32';
Utils.pathNormalize = function(urlString) {
  if (win32) {
  return urlString.replace(/\\/g, '/');
  } else {
    return urlString;
  }
};

Utils.escape = function(str){
  return str.toString().toLowerCase()
    .replace(/\s/g, '-')
    .replace(/\\|\/|<|>|:|"|\||\?|\*/g, '');
};

