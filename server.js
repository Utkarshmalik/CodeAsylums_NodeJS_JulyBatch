var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var moongose=require('mongoose');

moongose.promise=global.promise;

//url encoded data
app.use(bodyParser.urlencoded({extended:false}));

//parse json data
app.use(bodyParser.json());

const dbConfig=require('./config/database.config');

moongose.connect(dbConfig.url,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
}).then(()=>console.log("Successfully connected to database"))
.catch(()=>console.log("Couldnot connect to database"));

//notes
//title , content , time : createdAt , updatedAt

const NotesSchema=moongose.Schema({
    title:String,
    content:String
},{
    timestamps:true
})

const Note=moongose.model('Note',NotesSchema);


app.post('/notes',(req,res)=>
{
    const newNote=new Note({
        title:req.body.title,
        content:req.body.content
    });

    newNote.save()
    .then(data=> res.send(data))
    .catch(err=>{
        res.status(500).send({message:err.message});
    })

})

app.get('/notes',(req,res)=>
{
    Note.find()
    .then((notes)=>res.send(notes))
    .catch(err=>res.status(500).send({message:err.message}))
})

//find a  note with a given id 

app.get('/notes/:id',(req,res)=>
{
    const id=req.params.id;

    Note.findById(id)
    .then(note=>
        {
            if(!note)
            {
                res.status(404).send({message:"invalid Id"});
            }
            res.send(note);
        })
    .catch(err=>{

        if(err.kind=="ObjectId"){
            res.status(404).send({message:"invalid Object Id"});
        }
        res.status(500).send({message:err.message})    
    })
})

app.put('/notes/:id',(req,res)=>
{
    const id=req.params.id;
    
    Note.findByIdAndUpdate(id,{
        title:req.body.title,
        content:req.body.content
    })
    .then(note=>{

        if(!note)
        {
            res.status(404).send({message:"invalid Id"});
        }
        res.send(note);
    })
    .catch(err=>{
        if(err.kind=="ObjectId"){
            res.status(404).send({message:"invalid Object Id"});
        }
        res.status(500).send({message:"unable to update"})    
    })
})



app.delete('/notes/:id',(req,res)=>
{
    const id=req.params.id;

    Note.findByIdAndRemove(id)
    .then(note =>{
        if(!note)
        {
            res.status(404).send({message:"invalid Id"});
        }
        res.send({message:"Note deleted successfully"});
    })
    .catch(err=>
        {
            if(err.kind=="ObjectId"){
                res.status(404).send({message:"invalid Object Id"});
            }
            res.status(500).send({message:"unable to delete"})    
    })
})



app.get('/',(req,res)=>
{
    res.json({"message":"Hello"});
})





app.listen(3000,()=>
{
    console.log('Listening at port 3000');
})