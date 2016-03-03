var rbacModule = angular.module('rbacModule', []);
rbacModule.controller('rbacController',['$scope','$state','UsersFactory','UserSaveFactory','UserEditFactory','UserDeleteFactory','UserLoginFactory',function($scope,$state,UsersFactory,UserSaveFactory,UserEditFactory,UserDeleteFactory,UserLoginFactory){
    $scope.isError = false;
    $scope.loaded = true;
    $scope.status = "true";
    $scope.curUser={};
    $scope.curUser.role="#NONE#";
    $scope.errorMsg = "";
    $scope.checkLoginUser = function()
    {
        var data = UserLoginFactory.get();
        data.$promise.then(function(result) {
            if(result.admin === undefined)
                $state.go('home');
        });
    };
    $scope.checkLoginUser();
    $scope.getAllUsers = function()
    {
        var data = UsersFactory.query();
        data.$promise.then(function(result) {
            $scope.users = result;
        });
    };
    $scope.closeError = function(){
        $scope.isError = false;
        $scope.errorMsg = "";
    };
    $scope.resetUser = function(){
            $('#addUser').modal('hide');
    		$scope.curUser={};
    		$scope.editUser=false;
    		$scope.dialogTitle = "Add User";
    		$scope.curUser.email="";
    		$scope.curUser.role="#NONE#";
    		$scope.curUser.firstName="";
    		$scope.curUser.lastName="";
    		$scope.closeError();
    		$('#userId').prop('disabled',false);
//    		$scope.getAllUsers();

    };
    $scope.resetUser();
    $scope.resendActivation = function(user){
            data = UserSaveFactory.save({}, user);
            data.$promise.then(function(result) {
                showSuccessMessage(user.email,' Activation ',' sent', 'inverse');
            },function(){
                showErrorMessage(user.email,'inverse');
            });
    }
    $scope.saveUser =function() {
        if($scope.editUser)
            $scope.curUser.edit=true;
        if($scope.curUser.email==""){
            $scope.isError=true;
            $scope.errorMsg = "Please Enter Email ID";
        }
        else if($scope.curUser.role === '#NONE#')
        {
            $scope.isError=true;
            $scope.errorMsg = "Please Select Role";
        }
        else if($scope.curUser.firstName==""){
            $scope.isError=true;
            $scope.errorMsg = "Please Enter First Name";
        }
        else if($scope.curUser.lastName==""){
            $scope.isError=true;
            $scope.errorMsg = "Please Enter Last Name";
        }
        else{
            $scope.loaded = false;
            var data ={};
            if($scope.editUser)
                data = UserEditFactory.save({id: $scope.curUser.id}, $scope.curUser);
            else
                data = UserSaveFactory.save({}, $scope.curUser);
            data.$promise.then(function(result) {
            $scope.loaded = true;
                $scope.getAllUsers();
                showSuccessMessage($scope.curUser.email,' add user ',' into users', 'inverse');
                $scope.resetUser();

            },function(){
                $scope.resetUser();
                showErrorMessage($scope.curUser.email,'inverse');
            });
        }
    };
    $scope.editUsers = function(curUser){
        $scope.curUser = curUser;
        $scope.dialogTitle = "Edit User";
        $scope.editUser = true;
        $('#userId').prop('disabled',true);
        $('#addUser').modal('show');
    };
    $scope.deleteUser = function(id)
    {
         data = UserDeleteFactory.save({id:id});
        data.$promise.then(function(result) {
            showSuccessMessage(id,' delete user ',' from users', 'inverse');
            $scope.getAllUsers();
        },function(){
            showErrorMessage(id,'inverse');
        });
    };
    $scope.getAllUsers();
}]);