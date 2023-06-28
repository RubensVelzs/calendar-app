const {response} = require('express');
const Favorite = require ('../models/Favorite');


const getFavorites = async (req, res=response)=>{
    try {
     const favorites =  await Favorite.find();
     res.status(200).json({
        ok:true,
        favorites
     })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Contact with the administrator"
        });
    }
}

const createFavorite = async(req, res=response)=>{
    const favorite = new Favorite(req.body);
    try {
     favorite.user= req.uid;
     const savedFavorite =  await favorite.save();
       res.json({
        ok:true,
        savedFavorite
       });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Contact the administrator"
        })
    }
}


module.exports={
    createFavorite,
    getFavorites
}