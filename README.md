# AngularUI Router

Easy debugging with color log.

## Getting Start

 * `bower install angular-clog`
 * Add `angular-clog` to your `module()` dependencies
 * Setting flag `clogProvider` to your module's `config()`


   ```javascript
myApp.config(function(clogProvider) {
  // Now set up debug enable
  clogProvider.setDebugEnable(true)
   ```

 * Let's log it! 

   ```javascript
       function LogCtrl($scope, clog) {
         $scope.clog = clog;
         $scope.message = 'Hello World!';
         clog.log("init");
         clog.log("init", "costom context");
       }
   ```
   ```html
       <div ng-controller="LogCtrl">
         <p>Reload this page with open console, enter text and hit the log button...</p>
         Message:
         <input type="text" ng-model="message"/>
         <button ng-click="clog.log(message)">log</button>
         <button ng-click="clog.warn(message)">warn</button>
         <button ng-click="clog.info(message)">info</button>
         <button ng-click="clog.error(message)">error</button>
       </div>
   ```


## WIP

auto event dump

   ```javascript
  clogProvider.setAutoEventEnable(true) 
   ```
