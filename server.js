var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');

mongoose.promise=global.promise;

//url encoded data
app.use(bodyParser.urlencoded({extended:false}));

//parse json data
app.use(bodyParser.json());

const dbConfig=require('./config/database.config');

mongoose.connect(dbConfig.url,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
}).then(()=>console.log("Successfully connected to database"))
.catch(()=>console.log("Couldnot connect to database"));


app.get('/',(req,res)=>
{
    res.json({"message":"Hello"});
})

require('./app/routes/note.routes')(app);


app.listen(3000,()=>
{
    console.log('Listening at port 3000');
})