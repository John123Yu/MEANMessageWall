var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post') 
var Comment = mongoose.model('Comment')


module.exports = {
	create: function(req, res){
      var user = new User(req.body);
      user.save(function(err, context) {
	    if(err) {
	      console.log('Error with registering new user');
        console.log(err)
        return res.json(err)
	    } else {
	      console.log('successfully registered a new user!');
        console.log(context)
        return res.json(context)
	    }
	})
    },
  login: function(req, res) {
    console.log(req.body.emailLogin)
    User.find({ email: req.body.emailLogin}, function(err, context) {
      if(context[0]) {
        console.log('success finding email')
        if(context[0].validPassword(req.body.passwordLogin)) {
          return res.json({_id:context[0]._id})
        } else {
          console.log("wrong password")
          return res.json({IncorrectPassword: 'Incorrect Password'})
        }
      }
      else {
        console.log("no email found")
        return res.json({noEmail: "No such email in database"})
      }
    })
  },
  getPosts: function (req, res) {
    Post.find({}, null, {sort: 'created_at'}).populate('_user').populate({path: 'comments', options: { sort: { 'created_at': -1 } } }).exec( function(err, context) {
      if(context[0]) {
        console.log('success getting posts')
        return res.json(context)
      }
      else {
        console.log('no Posts yet')
      }
    })
  },
  newPost: function (req, res) {
    console.log(req.body)
    User.findOne({_id : req.body.id}, function(err, user) {    
      var post = new Post({text: req.body.post})
      post._user = req.body.id;
      post.save(function(err) {
        console.log(err)
        if(err) {
          console.log('post not saved')
        } else {
          console.log('post saved')
          // return res.json({he:"hi"})
          user.posts.push(post)
          user.save(function(err) {
            if(err) {
              console.log(err)
              console.log('Error with saving user after saving post')
            } else {
              console.log('user saved after saving post')
              return res.json({he:"hi"})
            }
          })
        }
      })
    })
  },
  newComment: function (req, res) {
    var user = User.findOne({_id: req.body.userId}, function(err, user) {
    console.log(user)
    Post.findOne({_id: req.body.id}, function(err, post){
        var comment = new Comment({ text: req.body.text, name: user.firstName + " " + user.lastName});
        comment._post = post._id;
        comment._user = req.body.userId;
        comment.save(function(err){
            if(err) {
              console.log("comment not saved")
              app.set('error', comment.errors);
            } else {
              console.log("comment saved")
              post.comments.push(comment);
              post.save(function(err){
                   if(err) {
                        console.log('Error with saving post');
                   } else {
                        console.log("Post Saved")
                        return res.json({hi:'hi'})
                   }
               });
              user.comments.push(comment);
              user.save(function(err){
                   if(err) {
                        console.log('Error with saving user for comments');
                   } else {
                        console.log("User Saved for comments")
                   }
               });

              }
         });
    });
    })
  }
};