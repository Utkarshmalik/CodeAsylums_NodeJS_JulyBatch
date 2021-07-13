var express=require('express');
var app=express();
var cors = require('cors')
const path = require('path');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
const port = process.env.PORT || 3000


mongoose.promise=global.promise;

//url encoded data
app.use(bodyParser.urlencoded({extended:false}));

//parse json data
app.use(bodyParser.json());

app.use(cors())

const dbConfig=require(path.join(__dirname,'./config/database.config'));

mongoose.connect(dbConfig.url,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
}).then(()=>console.log("Successfully connected to database"))
.catch(()=>console.log("Couldnot connect to database"));


app.get('/',(req,res)=>
{
    res.json({"message":"Hello"});
})

require(path.join(__dirname,'./app/routes/note.routes'))(app);


app.listen(port,()=>
{
    console.log('Listening at port 3000');
})