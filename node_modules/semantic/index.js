//'use strict';

var program = require('commander')
  , colors = require('colors')
  , path = require('path')
  , fs = require('fs')
  , join = path.join
  , pkg = require('./package.json')
  , version = pkg.version;

var boilerplates = ['site', 'h5bp', 'sitemap', 'bootstrap'];
var readable = [boilerplates.slice(0, -1).join(', '), boilerplates.slice(-1)[0]].join(' or ');

colors.setTheme({
  input: 'grey',
  info: 'green',
  warn: 'yellow'
});

module.exports = function (argv) {

  // usage
  program
    .version(version)
    .usage('[options] <dest>')
    .option('-b, --boilerplate <name>', 'Generate assemble boilerplate <name>', 'site', boilerplates)
    .option('-d, --directory <path>',  'Destination of generated boilerplate <path>')
    .option('-p, --post "Your Post Title"',  'Create new post');

  // custom help
  program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    Install'.info + ' boilerplate-site'.input + ' to myapp directory'.info);
    console.log('');
    console.log('    $ assemble myapp');
    console.log('');
    console.log('    Install'.info + ' boilerplate-h5bp'.input + ' to myapp directory'.info);
    console.log('');
    console.log('    $ assemble -b h5bp -d myapp');
    console.log('');
  });

  // parse argv
  program.parse(process.argv);

  // args void of cmd
  var args = process.argv.slice(3);

  // Not exist
  if(boilerplates.indexOf(program.boilerplate) === -1) {
    console.log('\n Please choose either: %s\n'.input, readable.info);
    process.exit(0);
  }

  // Coming soon
  if(program.boilerplate !== 'site') {
    console.log('\n  Not implemen yet, Coming soon!'.input + '\n');
    process.exit(0);
  }

  /**
   * Destination path.
   */
  var destination = program.args[0] || process.cwd();

  /**
   * Boilerplates directory.
   */
  var boilerplate = './boilerplates/' + (program.boilerplate || boilerplates[0]);

  /**
   * Initialize a new `Assemble Boilerplate` with the given `name`.
   *
   * @param {String} name
   * @ref https://github.com/assemble/boilerplates
   */
  function Boilerplate(boilerpath) {
    this.path = boilerpath;
    this.contentPath = this.path + '/content';
    console.log(this);
    this.mod = require(this.path);
    this.values = {};
    this.directories = {};
  }

  /**
   * Initialize boilerplate at `destination`.
   *
   * @param {String} destination
   */
  Boilerplate.prototype.init = function(dest){
    var self = this
      , vars = this.mod.variables;

    console.log();
    program.prompt(vars, function(obj){
      self.destination = dest + '/' + obj.project;
      self.values = obj;
      process.stdin.destroy();
      self.create();
    });
  };

  /**
   * Return the files for this boilerplate.
   *
   * @return {Array}
   */
  Boilerplate.prototype.__defineGetter__('files', function(){
    var self = this
      , files = [];

    (function next(dir) {
      fs.readdirSync(dir).forEach(function(file){
        files.push(file = dir + '/' + file);
        var stat = fs.statSync(file);
        if (stat.isDirectory()) {
          self.directories[file] = true;
          next(file);
        }
      });
    })(this.contentPath);

    return files;
  });

  /**
   * Create the boilerplate files.
   */
  Boilerplate.prototype.create = function(){
    var self = this;
    console.log();
    // destination
    try {
      fs.mkdirSync(self.destination, 0775);
    } catch (err) {
      // ignore
    }

    this.files.forEach(function(file){
      if (~file.indexOf('.DS_Store')) { return; }
      var path = self.parse(file)
        , out = join(self.destination, path.replace(self.contentPath, ''));

      // directory
      if (self.directories[file]) {
        try {
          fs.mkdirSync(out, 0775);
          console.log('  create : '.info, out);
        } catch (err) {
          // ignore
        }
      // file
      } else {
        var str = self.parse(fs.readFileSync(file, 'utf8'));
        fs.writeFileSync(out, str);
        console.log('  create : '.info, out);
      }
    });
    console.log();
  };

  /**
   * Parse `str`.
   *
   * @return {String}
   * @api private
   */
  Boilerplate.prototype.parse = function(str){
    var self = this;
    return str
      .replace(/\{\{([^}]+)\}\}/g, function(_, key){
        return self.values[key];
      });
  };

  // create boilerplate
  var tmpl = new Boilerplate(boilerplate);

  tmpl.init(destination);
};
