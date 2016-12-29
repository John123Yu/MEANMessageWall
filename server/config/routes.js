var mongoose = require('mongoose');
var User = mongoose.model('User');
var user = require('../controllers/controls.js');

module.exports = function(app) {
app.post('/user',function(req, res){
  user.create(req, res)
});

app.post('/login', function(req, res) {
  user.login(req, res)
});

app.get('/getPosts', function(req, res) {
  user.getPosts(req, res)
})

app.post('/newPost', function(req, res) {
  user.newPost(req, res)
})

app.post('/newComment', function(req, res) {
  user.newComment(req, res)
})

}




