var fs = require('fs');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './views' );

app.use(express.static('public'));

//body-parser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

//multer
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, '/public/img/upload')
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	}
});

var upload = multer({storage: storage}).single('imageFile');

app.listen(3000, function (err){
	if (err) {
		throw err;
	}
	console.log('Listening on port 3000');
})

app.get('/', function (req, res){
	res.render('mainpage');
});

app.get('/admin', function (req, res){
	res.render('addItem');
})
