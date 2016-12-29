
myApp.controller('successController', ['$scope', 'userFactory', '$location', '$cookies', function ($scope, userFactory, $location, $cookies){
  
  if(!$cookies.get('loginId')) {
    $location.url('/');
  }

  userFactory.getPosts(function(data){
    $scope.posts = data.data
  })

  $scope.check = 0;
  $scope.$watch('check', function(newValue, oldValue) {
     userFactory.getPosts(function(data){
      $scope.posts = data.data
    })
  })

  $scope.loginId = $cookies.get('loginId')
  $scope.posts;
  $scope.commentText = {};



  $scope.Comment = function(id, index) {
    $scope.commentText[index].id = id
    $scope.commentText[index].userId = $cookies.get('loginId')
    userFactory.comment($scope.commentText[index], function(data) {
      $scope.check = data
    })
    }

  $scope.Post = function() {
    $scope.post.id = $cookies.get('loginId')
     userFactory.post($scope.post, function(data) {
      $scope.check = data
     })
  }


}])