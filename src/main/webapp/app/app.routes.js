var visibleBrainApp = angular.module('visibleBrainApp');

visibleBrainApp.config(['$stateProvider', '$urlRouterProvider','cfpLoadingBarProvider',
                                           function($stateProvider, $urlRouterProvider,cfpLoadingBarProvider){
    cfpLoadingBarProvider.includeSpinner = true;
    $urlRouterProvider.otherwise("/visiblebrain");

	$stateProvider.
	state('home', {
	    url:'/visiblebrain',
		templateUrl: '/app/components/home/homeView.html',
		controller: 'homeController',
		resolve: {
                  loadPlugin: function($ocLazyLoad) {
                      return $ocLazyLoad.load ([
                          {
                              name: 'homeModule',
                              serie: true,
                              files: [
                                   '/app/components/common/functions.js',
                                   '/app/components/home/homeModule.js'
                              ]
                          }
                      ])
                  }
              }
	}).
    state('slide/:id/:header', {
        url:'/slide/:id/:header',
        templateUrl: '/app/components/slide/slideView.html',
        controller: 'slideController',
        resolve: {
                  loadPlugin: function($ocLazyLoad) {
                      return $ocLazyLoad.load ([
                          {
                              name: 'slideModule',
                              serie: true,
                              files: [
                                   '/app/components/common/functions.js',
                                   '/app/components/slide/slideModule.js'
                              ]
                          }
                      ])
                  }
              }
    }).
	state('rbac', {
    	    url:'/usermanagement',
    		templateUrl: '/app/components/rbac/rbacView.html',
    		controller: 'rbacController',
    		resolve: {
                      loadPlugin: function($ocLazyLoad) {
                          return $ocLazyLoad.load ([
                              {
                                  name: 'rbacModule',
                                  serie: true,
                                  files: [
                                       '/app/components/common/functions.js',
                                       '/app/components/rbac/rbacModule.js'
                                  ]
                              }
                          ])
                      }
             }
    });
}]);