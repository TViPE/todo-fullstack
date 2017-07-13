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
		cb(null, 'public/img/upload')
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
	res.render('mainpage', {data: data});
});

app.get('/admin', function (req, res){
	res.render('addItem');
});

app.post('/upload', urlencodedParser, function (req, res){
	upload(req, res, function (err){
		if(err) {
			console.log(err);
		}
		var title = req.body.title;
		var description = req.body.description;
		var image = req.file.filename;

		data.push(new Task(title, description, image));
		res.redirect('/');
	})
});

app.get('/remove/:i', function (req, res){
	var i = req.params.i;
	data.splice(i, 1);
	res.redirect('/');
});

app.get('/edit/:i', function (req, res){

});

var data = [];

var Task = function(title,description, image) {
	this.title = title,
	this.description = description,
	this.image = image;
}
