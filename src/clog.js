if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = 'nya.clog';
}

(function (window, angular, undefined) {
    function isDefined(value){return typeof value !== 'undefined';}
    function isString(value){return typeof value === 'string';}
    function isFunction(value){return typeof value === 'function';}

    function isObject(value){return value !== null && typeof value === 'object';}
    function objToString(context) {
        if (!isString(context)){
            if (isFunction(context)){
                return context + "";
            }
            else {
                return window.JSON.stringify(context);
            }
        }
        return context;
    }


    function ClogProvider(){
        var self = this;
        this.isDebug = true;

        this.wrapper = function(func) {
          return function() {
              var args = Array.prototype.slice.call(arguments)[0];
              return func(args);
          };
        };
        this.debugEnabled = function(flag) {
            if (isDefined(flag)) {
                this.isDebug = flag;
                return this;
            } else {
                return this.isDebug;
            }
        };
     
        this.$get = [function (){
          //$injector.instantiateOrigin = $injector.instantiate;
          //$injector.instantiate = this.wrapper($injector.instantiate);
          return {
              /**
               * @ngdoc method
               * @name ng.$log#log
               * @methodOf ng.$log
               *
               * @description
               * Write a log message
               */
              log: self.consoleLog('log'),

              /**
               * @ngdoc method
               * @name ng.$log#info
               * @methodOf ng.$log
               *
               * @description
               * Write an information message
               */
              info: self.consoleLog('info'),

              /**
               * @ngdoc method
               * @name ng.$log#warn
               * @methodOf ng.$log
               *
               * @description
               * Write a warning message
               */
              warn: self.consoleLog('warn'),

              /**
               * @ngdoc method
               * @name ng.$log#error
               * @methodOf ng.$log
               *
               * @description
               * Write an error message
               */
              error: self.consoleLog('error'),
              
              /**
               * @ngdoc method
               * @name ng.$log#debug
               * @methodOf ng.$log
               * 
               * @description
               * Write a debug message
               */
              debug: self.consoleLog('debug'),
              consoleLog: self.consoleLog
          };
        }];
        /*
        this.formatError = function(arg) {
          if (arg instanceof Error) {
            if (arg.stack) {
              arg = (arg.message && arg.stack.indexOf(arg.message) === -1)
                  ? 'Error: ' + arg.message + '\n' + arg.stack
                  : arg.stack;
            } else if (arg.sourceURL) {
              arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
            }
          }
          return arg;
        };
        */
        this.consoleLog = function (type, context) {
            return function () {
                if (!self.isDebug && type == "debug") { 
                    return;
                }
                if (context !== undefined) {
                    return window.bows(objToString(context))[type](arguments[0]);
                }
                else if (arguments[1] !== undefined){
                    return window.bows(objToString(arguments[1]))[type](arguments[0]);
                }
                else if (arguments.callee !== null && arguments.callee.caller !== null){
                    return window.bows(objToString(arguments.callee.caller.name))[type](arguments[0]);
                }
                else{
                    return window.bows(objToString(this))[type](arguments[0]);
                }
            };
        };
    }
    // shotcut
    angular.module('nya', ['nya.clog']);
    angular.module('nya.clog', []).provider('clog', ClogProvider);

})(window, window.angular);
