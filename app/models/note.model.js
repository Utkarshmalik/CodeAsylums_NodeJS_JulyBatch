const mongoose=require('mongoose');;

const NotesSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title not there']
    },
    content:String
},{
    timestamps:true
})

module.exports=mongoose.model('Note',NotesSchema);