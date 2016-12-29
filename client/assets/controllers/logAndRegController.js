
myApp.controller('userController', ['$scope', 'userFactory', '$location', '$cookies',  function ($scope, userFactory, $location, $cookies ){

  $cookies.remove('loginId')

  $scope.addUser = function() {
          $scope.FNError = true
          $scope.LNError = true
          $scope.EError = true
          $scope.BError = true
          $scope.PError = true
          $scope.CPError = true
          if($scope.user.password != $scope.user.confirmPassword) {
            $scope.CPError = false
            $scope.confirmPasswordError = "Confirm password must match password"
          }
          userFactory.addUser($scope.user, function(data) {
            if(data.data.firstName) {
              console.log('here')
              $cookies.put('loginId', data.data._id)
              $location.url('/success')
            }
            if(data.data.errmsg) {
              console.log('in')
              $scope.EError = false
              $scope.emailError = "Email already registered"
            }
            if(data.data.errors.firstName) {
              $scope.FNError = false
              $scope.firstNameError = data.data.errors.firstName.message  
            }
            if(data.data.errors.lastName) {
              $scope.LNError = false
              $scope.lastNameError = data.data.errors.lastName.message  
            }
            if(data.data.errors.birthday) {
              $scope.BError = false
              $scope.birthdayError = data.data.errors.birthday.message  
            }
            if(data.data.errors.email) {
              $scope.EError = false
              $scope.emailError = data.data.errors.email.message  
            }
            if(data.data.errors.password) {
              $scope.PError = false
              $scope.passwordError = data.data.errors.password.message  
            }
          }); 

          $location.url('/');
        }

  $scope.users;

  $scope.login = function() {
    userFactory.login($scope.user, function(data) {
      $scope.noEmailError = true;
      $scope.IPError = true;
      if(data.data.noEmail) {
        $scope.noEmailError = false;
        $scope.noEmail = data.data.noEmail;
      }
      else if(data.data.IncorrectPassword) {
        $scope.IPError = false;
        $scope.incorrectPassword = data.data.IncorrectPassword;
      }
      else if(data.data._id) {
        console.log('login sent back')
        $cookies.put('loginId', data.data._id)
        $location.url('/success')
      }
    })
    $location.url('/');
  }


}])

