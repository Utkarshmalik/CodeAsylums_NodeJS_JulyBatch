var express=require('express');
var app=express();


var bodyParser=require('body-parser');

//url encoded data
app.use(bodyParser.urlencoded({extended:false}));

//parse json data
app.use(bodyParser.json());


app.get('/things',(req,res)=>
{
    console.log(req.body);
    res.send("things");
})

app.listen(3000,()=>
{
    console.log('Listening at port 3000');
})