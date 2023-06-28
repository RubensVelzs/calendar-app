const {Schema, model}= require('mongoose');


const FavoriteSchema= Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    name:{
        type:String,
        required: true
    },
    title:{
        type:String,
        required:true
    },
    image:{type:String, required:true},
    username:{type:String, required:true}
})

module.exports= model('Favorite',FavoriteSchema);