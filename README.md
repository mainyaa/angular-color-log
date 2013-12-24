# Angular Color Log

Easy debugging with color log.

![screenshot](https://raw.github.com/mainyaa/angular-clog/master/screenshot.png)



## Getting Start

 * `bower install angular-color-log --save` or `npm install angular-color-log --save`

 * Add `nya.clog` to your `module()` dependencies
   ```javascript
    angular.module('myModule', ['nya.clog'])
   ```

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
         <button ng-click="log(message)">log</button>
         <button ng-click="warn(message)">warn</button>
         <button ng-click="info(message)">info</button>
         <button ng-click="error(message)">error</button>
       </div>
   ```

## Advanced(Work in progress)

 * auto context specific coloring /Model/Directive/Controller/Filter/Spec/Test/
 * auto http event dump

   ```javascript
  clogProvider.setHttpEventEnable(true) 
   ```

 * auto state event dump

   ```javascript
  clogProvider.setStateEventEnable(true) 
   ```
