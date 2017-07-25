var express = require('express');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/my-website';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'my secret'}));
app.set('view engine', 'jade');



app.use(function (req,res,next) {
	if(req.session.loggedIn){
		res.locals.authenticatied = true;
		User.find({_id: req.session.loggedIn},function (err, data) {
			if(err) return next(err);
			res.locals.me = data[0];
			next();
		})
	} else {
		res.locals.authenticatied = false;
		next();
	}
})
/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
}); 

var UserSchema = mongoose.Schema(
		{
			first: String,
			last : String,
			email: String,
			password: String
		});
var User = mongoose.model('users', UserSchema);

/**
 * 默认路由
 */
app.get('/', function (req, res) {
  res.render('index');
  console.log('Cookies: ',req.cookies);
})

/**
 * 登录路由
 */

app.get('/login', function (req, res) {
	res.render('login');
	
});
app.post('/login', function (req, res){
	User.find({email:req.body.email,password:req.body.password}, function (err, data) {
		if(err) return res.send('<p>login err!</p>');
		else{
			console.log(data);
			req.session.loggedIn = data[0]._id;
			res.redirect('/');
		}
		
	});
});

/**
 * 注册路由
 */

app.get('/signup', function (req, res) {
	res.render('signup');
	
})
/**
 * 处理注册路由
 */
app.post('/signup', function (req, res) {
	// var data = JSON.stringify(req.body, null, 2);
	// var data = {first: req.body.first, last: req.body.last ,email: req.body.email, password: req.body.password};

	var user = new User( req.body );
	User.find({email:req.body.email},function (err,data){
		if(err) return console.log(err);
		if(!data[0]){//
			user.save (function ( err ) {
				if( err ) {
					console.log(err);
				} else {
					console.log(req.body);
					res.redirect('/login/' + req.body.email);
				}
			})
		}else {
			return res.send('<p>Email has been used!Please try again!</p>');
		}
	});
});

/**
 * 处理注册转登录路由
 */
app.get('/login/:signupEmail', function (req,res) {
	res.render('login', {signupEmail: req.params})
})
app.post('/login/:singupEmail', function (req, res){
	User.find({email:req.body.email,password:req.body.password},function (err, data) {
		if(err) {
			res.send('<p>login err!</p>');
			return;
		}
		req.session.loggedIn = data[0]._id;
	});
});

app.get('/logout',function(req, res) {
	req.session.loggedIn = null;
	res.locals.authenticatied = false;
	res.render('index');
})


app.use(function (err, req, res, next) {
	res.send('<p>Meet Some Error</p>')
})

app.listen(3000);