var express=require('express');
var app=express();

const resources=["react","nodejs"];


app.get('/',(req,res)=>
{
    res.send("We are learning express");
});


app.get('/resources/:subject/:author',(req,res)=>
{
    if(resources.includes(req.params.subject))
    res.send(`Sending the resources for ${req.params.subject} by author ${req.params.author}`);
    else
    res.send('Resources unavailable');
});

app.listen(3000,()=>
{
    console.log('Listening at port 3000');
})