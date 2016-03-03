var homeModule = angular.module('homeModule', []);

homeModule.controller('homeController', ['$scope','$location','SlidesFactory','UserLoginFactory','SlideUpdateFactory', function($scope,$location,SlidesFactory,UserLoginFactory,SlideUpdateFactory){
    $scope.editS ={};
    $scope.editS.edit=undefined;
    $scope.redirect = function(id){
        $location.path( '/slide/'+id);
    };
    $scope.getAllSlides = function(){
        var data = SlidesFactory.query();
        data.$promise.then(function(result) {
            $scope.slides = result;
        });
    };
    $scope.checkLoginUser = function()
    {
        var data = UserLoginFactory.get();
        data.$promise.then(function(result) {
            if(result.admin != undefined)
                $scope.editS.edit="";
        });
    };
    $scope.checkLoginUser();
    $scope.editSlide = function(slide)
    {
       var data = SlideUpdateFactory.update({id:slide.id},slide);
       data.$promise.then(function(result) {
           $scope.getAllSlides();
           $scope.editS.edit="";
       });
    };
    $scope.cancel = function(){
        $scope.getAllSlides();
         $scope.editS.edit="";
    };
    $scope.getAllSlides();
}]);