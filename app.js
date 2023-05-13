const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// if you want to change the port change here
const port = 3000;

// to convert Date obj() into english string format
var today = new Date();
var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};
var day = today.toLocaleDateString("en-US", options);
var items = [];

app.get('/',function (req,res){
    res.render('list',{kindOfDay: day, finalList: items});
});

app.post('/', function(req,res){
    var newItem = req.body.listItem;
    items.push(newItem);
    res.redirect("/");
});

app.listen(process.env.PORT || port, () => console.log('Server is running at port: '+ port + '/' + process.env.PORT));