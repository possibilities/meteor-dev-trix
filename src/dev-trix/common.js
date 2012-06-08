// Helpers

_.mixin({

  // Dump every method call to an object's prototype to the console
  showMethodCallsFor: function(obj, options) {
    options || (options = {});
    options.blacklist || (options.blacklist = []);

    _.each(obj.prototype, function(method, name) {
      if (_.contains(options.blacklist, name)) return;
      obj.prototype[name] = function() {
        if (options.showArguments || _.contains(options.showArgumentsWhitelist, name)) {
          var displayArgs = [name];
          var args = _.toArray(_.clone(arguments));
          if (args.length > 0) {
            displayArgs.push(args);
          }
          console.log.apply(console, displayArgs); // Don't delete me!
        } else {
          console.log(name); // Don't delete me!
        }
        return method.apply(this, arguments);
      };
    });
  },
  
  showGlobals: function(options) {
    options || (options = {});
    var supressTitleCase = _.isBoolean(options.showTitleCase) ? options.showTitleCase : true;
    var _global = Meteor.is_client ? window : global;
    
    var blackList = ['console', 'global', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval'];
    
    // Usually accidental globals start with a lowercase letter so
    // that's what we show by default
    if (supressTitleCase) {
      var camelCaseGlobals = _.reduce(_.keys(_global), function(memo, name) {
        if (/^[a-z]/.test(name)) {
          memo.push(name);
        }
        return memo;
      }, []);
    }
    console.log(_.difference(camelCaseGlobals, blackList));
  }
});
