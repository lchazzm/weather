// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.mainCtrl','starter.15weatherCtrl','starter.airCtrl','starter.services','starter.cityCtrl','starter.secondCityCtrl','starter.leaderCityCtrl','starter.tabsCtrl','ngCordova'])
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {


    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('left');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

  })
.run(function($ionicPlatform) {
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
      cache:false,
      abstract: true,
      templateUrl: 'templates/tabs.html',
      controller: 'TabsCtrl'
  })

  // Each tab has its own nav history stack:

    .state('tab.main', {
      url: '/main',
      // params:{CityName:''},
      views: {
        'tab-main': {
          templateUrl: 'templates/tab-main.html',
          controller: 'MainCtrl'
        }
      }
    })
    //生活指数
    .state('tab.air', {
      url: '/air',
      params:{city:'',name:'',image:''},
      views: {
        'tab-main': {
          templateUrl: 'templates/tab-air.html',
          controller: 'AirCtrl'
        }
      }
    })
    //省查询
    .state('tab.city', {
      url: '/city',
      params:{chooseCityName:''},
      views: {
        'tab-main': {
          templateUrl: 'templates/tab-city.html',
          controller: 'CityCtrl'
        }
      }
    })

    //市查询
    .state('tab.leaderCity', {
      url: '/leaderCity',
      params:{firstCity:'',chooseCityName:''},
      views: {
        'tab-main': {
          templateUrl: 'templates/tab-leaderCity.html',
          controller: 'LeaderCityCtrl'
        }
      }
    })

    //各级城市查询
    .state('tab.secondCity', {
      url: '/secondCity',
      params:{firstCity:'',chooseCityName:''},
      views: {
          'tab-main': {
          templateUrl: 'templates/tab-secondCity.html',
          controller: 'SecondCityCtrl'
        }
      }
    })

    .state('tab.15weather', {
      url: '/15weather',
      views: {
        'tab-15weather': {
          templateUrl: 'templates/tab-15weather.html',
          controller: 'MainCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/main');

});
