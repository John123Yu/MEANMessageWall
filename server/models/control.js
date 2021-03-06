var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  firstName : {
  	type: String,
  	required: [true, 'First name is required'],
  	minlength: [2, 'First name must be at least 2 characters'],
  	trim: true
  },
  lastName : {
  	type: String,
  	required: [true, 'Last name is required'],
  	minlength: [2, 'Last name must be at least 2 characters'],
  	trim: true
  },
  email : {
  	type: String,
  	validate: {
  		validator: function(email) {
  		var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  		return emailRegex.test(email)
  		},
  		message: 'Not a valid email'
  	},
	required: [true, "Email is required"],
	unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: function( value ) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
      },
      message: "Password failed validation, you must have at least 1 number, uppercase and special character"
    }
  },
  birthday: {
  	type: Date,
  	required: [true, 'Birthday is required']
  },
  created_at: { type : Date, default: Date.now },
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
 });

userSchema.methods.generateHash = function(password) {
	if(password.length > 32) {
		return password
	} else {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
	}
}
userSchema.pre('save', function(done) {
	this.password = this.generateHash(this.password);
	done();
})
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

mongoose.model('User', userSchema);

var postSchema = new mongoose.Schema({
  text: { type: String, required: [true, "Text is required"] },
  created_at: { type : Date, default: Date.now },
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
  });
mongoose.model('Post', postSchema);

var commentSchema = new mongoose.Schema({
  name: String,
  text: { type: String, required: [true, "Comment Text is required"] },
  created_at: { type : Date, default: Date.now },
  _post: {type: Schema.Types.ObjectId, ref: 'Post'},
  _user: {type: Schema.Types.ObjectId, ref: 'User'}
  });
mongoose.model('Comment', commentSchema);
