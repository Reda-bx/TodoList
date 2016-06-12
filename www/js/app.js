// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if (window.cordova) {
      db = $cordovaSQLite.openDB({ name : "todoDB.db"}); //device
    }else{
      db = window.openDatabase("todoDB.db", '1', 'my', 1024 * 1024 * 100); // browser
    }

    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS todos (id integer primary key, description text, time text, done text)");
    // $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS todos");
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.myStuff', {
    url: '/myStuff',
    views: {
      'myStuff': {
        templateUrl: 'templates/myStuff.html',
        controller: 'myStuff'
      }
    }
  })

  .state('tab.workStuff', {
    url: '/workStuff',
    views: {
      'workStuff': {
        templateUrl: 'templates/workStuff.html',
        controller: 'workStuff'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'gangsta'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/myStuff');

});
