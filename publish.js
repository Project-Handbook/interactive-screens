var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(path.join(__dirname, 'dist'), function(err) {
  if (err === undefined) {
    console.log("Publishing to gh-pages was a succces.")
  } else {
    console.log(err)
  }
})
