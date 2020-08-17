var express    = require("express");
var bodyParser = require('body-parser');
/*
Module:multer
multer is middleware used to handle multipart form data
*/
var multer = require('multer');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});

router.post('/login' , function (req, res){
    res.status(200);
    res.send('Login Successfull.')
})

app.use('/api', router);
app.listen(4000);