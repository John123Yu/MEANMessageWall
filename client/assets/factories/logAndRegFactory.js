
 myApp.factory('userFactory', [ '$filter', '$http', '$location', function ($filter, $http, $location){

        var users;
        var user;
        var factory = {};
        var data;
        var loginId;
        var posts;

        factory.addUser = function(newUser, callback) {
          $http.post('/user', newUser).then(function(data){
            console.log("data sent back")
            if(data.data.errors || data.data.errmsg || data.data.firstName) {
              console.log(data)
              callback(data);
            }
          })
        }

        factory.login = function(user, callback) {
          $http.post('/login', user).then(function(data){
            console.log("login data back")
            if(data.data.noEmail || data.data.IncorrectPassword) {
              callback(data);
            }
            else if (data.data._id) {
              loginId = data.data._id
              callback(data)
            }
          })
        }

        factory.getPosts = function(callback) {
          $http.get('/getPosts').then(function(data) {
            console.log('got posts')
            callback(data);
          })
        }

        factory.post = function(newpost, callback) {
          $http.post('/newPost', newpost).then(function(data) {
            console.log('post successful')
            callback(data)
          })
        }

        factory.comment = function(newComment, callback) {
          $http.post('/newComment', newComment).then(function(data) {
            console.log('comment successful')
            callback(data)
          })
        }

        return factory;
    }]);