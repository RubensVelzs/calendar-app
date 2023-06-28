const {Schema, model}= require('mongoose');

const GifSchema= Schema({
    name:{
        type:String,
        required: true
    },
    title:{
        type:String,
        required:true
    },
    images:{type:String, required:true},
    username:{type:String, required:true}
})

module.exports= model('Gif', GifSchema);