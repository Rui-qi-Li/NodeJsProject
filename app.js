//test1, using require to import the object
var users_data = require('./test1_users').users_data;
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var firebase = require('firebase');
var admin = require('firebase-admin');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//var Filestore = require('session-file-store')(session);
var router = express.Router();
//firebase admin setting
var serviceAccount = require('./test-649ca-firebase-adminsdk-1o4g3-f5bb0124dd.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-649ca.firebaseio.com"
});

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey:  "AIzaSyC42rK-jJ_B8qDKsyKEIqt7W_7v91BI6Ak",
  authDomain: "test-649ca.firebaseapp.com",
  databaseURL: "https://test-649ca.firebaseio.com",
  storageBucket: "test-649ca.appspot.com",
};
firebase.initializeApp(config);

//set the view engine to ejs using html
app.set('views', __dirname+'/views');
//app.set('view engine','html');
app.engine('html',require('ejs').renderFile);
//test1
//find() method will return the first element meet the requirement
var findUser = function(name,pwd){
	//array.find(function(each_item){}) method, will excute for each element
return users_data.find(function(item){
	return (item.name == name && item.password==pwd)//T/F
});
};

//configuring express to use body-parser as middle-ware.
var parseUrlencoded = bodyParser.urlencoded({extended: false});//return a middleware function
app.use(bodyParser.json());

app.use(express.static('public'));

//setting session
app.use(session({
  secret: 'cookie_sig',
  resave: false,//resave session
  saveUninitialized:false,
 // store: new Filestore(),
  cookie: { maxAge: 30000 }//10 sec
}))
app.use(cookieParser());
app.get('/', function (req, res) {
    res.render('index.html');
});
app.get('/index', function (req, res) {
	//redirect
	res.redirect('/');
});
app.get('/signup', function (req, res) {
	//redirect
	//res.redirect([stauts],path.join(__dirname, 'login.html'))
    res.render('signup.html');
});

//when route match "/home",get will find home.html in views directory
//do not use "sendFile"-- it match absolute adress
app.get('/edit',function(req,res){
	res.render('edit.html');
});
app.get('/login',function(req,res){
	res.render('login.html');
});
app.get('/codeschool',function(req,res){
	res.sendFile(path.join(__dirname, './public', 'test_index.html'));
});

var blocks = {
		Fixed:"fastened securely in position",
		Movable:'capable of being moved',
		Rotating:'moving in a circle around its center'
	};
var passenger=[
{name:"John",age:25},
{name:"Susan",age:30},
{name:"Stephen",age:62}
];

app.get('/blocks',function(req,res){
	//var description = blocks[req.params.name]

	if(req.query.limit>=0){
		//res.json(blocks.slice(0,req.query.limit));//array method, not include limit
	}else
	res.json(blocks);
});
//route object and chain functions, eliminate intermediate variables
app.route('/passenger')
	.get(function(req,res){
	res.json(passenger);
})
	.post(parseUrlencoded,function(req,res){
	var temp = {};
	temp['name'] = req.body.name;
	temp['age'] = req.body.age;
	passenger.push(temp);
	res.json(passenger[passenger.length-1]);
});
app.route('/passenger/:index')
	.get(function(req,res){
	res.json(passenger[req.params.index]);//JSON.stringify(...)
})
	.delete(function(req,res){
	passenger.splice(req.params.index,1);//come with data
	res.sendStatus(200);//some cannot handle emply res properly
});
/*app.get('/test1', function(req,res){
	if(req.session.newUser)
		res.redirect('/test1/welcome');
	else
		res.render('test1_login.html',{retry:""});
});

app.get('/test1/welcome',function(req,res){
	if(req.session.newUser != undefined)
		res.render('test1_welcome.html',{message:"welcome, you have already logged in!",redirect:""});
	else
		res.render('test1_welcome.html',{message:"please logged in first!",redirect:"jump"});		
});
app.post('/test1',function(req,res){
	var user = req.body.user;
	var pwd = req.body.password;
	var newUser = {name: user, password: pwd};
	var hasUser = findUser(user,pwd);
	if(hasUser){
		//session.regenerate(callback)
	 
		req.session.newUser = newUser;
		res.redirect('/test1/welcome');
}
	else
		res.render('test1_login.html',{retry:"retry"});
});

app.get('/test1/reg',function(req,res){
	res.sendfile('test1_reg.html');
});
app.post('/test1/reg',function(req,res){
	var user = req.body.user;
	var pwd = req.body.password;
	if(req.session.newUser!= undefined || findUser(user,pwd))
		res.redirect('/test1');//redirect to login page	
	var newUser = {name: user, password: pwd};
	users_data.push(newUser);
	req.session.newUser = newUser;
	firebase.auth().createUserWithEmailAndPassword(user, pwd).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
	res.send("you have signup");
});
app.get('/test1/logout',function(req,res){
	req.session.destroy(function(){
		console.log("users logged out");
	});
	//rew.clearCookie('cookie_sig');
	res.redirect('/test1');
});

//send cookie to server
//app.use(cookieParser);
/**app.post('/process_post',urlencodedParser,function(req,res){
	//
	var response = {
		"username":req.body.username,
		"password":req.body.password,
		"url":req.body.url
	};
	res.send(response);
	
});
*/
app.use('/',router);//apply router
app.listen(1377,listening);
function listening(){
	console.log("sever listening...")
}
