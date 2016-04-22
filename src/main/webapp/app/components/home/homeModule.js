var homeModule = angular.module('homeModule', []);

homeModule.controller('homeController', ['$scope','$location','SlidesFactory','UserLoginFactory','SlideUpdateFactory','BodySlidesFactory',
function($scope,$location,SlidesFactory,UserLoginFactory,SlideUpdateFactory,BodySlidesFactory){
    $scope.editS ={};
    $scope.editS.edit=undefined;
    var header ='overlay';
    $scope.redirect = function(id){
        $location.path( '/slide/'+id +'/'+header);
    };

    $scope.getAllBodySlide = function(){
        var data = BodySlidesFactory.query();
        data.$promise.then(function(result) {
            $scope.bodySlides = result;
        });
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
            $scope.getAllBodySlide();
           $scope.editS.edit="";
       });
    };
    $scope.cancel = function(){
        $scope.getAllSlides();
         $scope.getAllBodySlide();
         $scope.editS.edit="";
    };
    $scope.getAllSlides();
     $scope.getAllBodySlide();
}]);