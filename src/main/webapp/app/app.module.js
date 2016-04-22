var visibleBrainApp = angular.module('visibleBrainApp', [ 'ngRoute', 'ngResource',
		'ui.router', 'oc.lazyLoad','angular-loading-bar']);
visibleBrainApp.factory('SlidesFactory', function ($resource) {
	return $resource('/api/slide/:id', {id:'@id'});
});
visibleBrainApp.factory('BodySlidesFactory', function ($resource) {
	return $resource('/api/slide/getAll');
});
visibleBrainApp.factory('OverlayFactory', function ($resource) {
	return $resource('/api/overlay/:id', {id:'@id'});
});
visibleBrainApp.factory('OverlayUpdateFactory', function ($resource) {
	return $resource('/api/overlay/update');
});
visibleBrainApp.factory('SlideUpdateFactory', function($resource) {
     return $resource('/api/slide/:id', {id:'@id'},
      {
        'update': { method:'PUT' },
      });
 });
visibleBrainApp.factory('UsersFactory',function($resource){
    return $resource('/user/getAll/');
});
visibleBrainApp.factory('UserSaveFactory',function($resource){
    return $resource('/user/register/');
});
visibleBrainApp.factory('UserEditFactory',function($resource){
    return $resource('/user/edit/:id', {id:'@id'});
});
visibleBrainApp.factory('UserDeleteFactory',function($resource){
    return $resource('/user/delete/:id', {id:'@id'});
});
visibleBrainApp.factory('UserLoginFactory',function($resource){
    return $resource('/user/check-login/');
});
visibleBrainApp.factory('UserHomeFactory',function($resource){
    return $resource('/');
});
