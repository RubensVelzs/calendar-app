const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {generateJWT}= require('../helpers/jwt');

const createUser = async(req, res = response)=>{
    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                ok:false,
                msg: 'Email already exist'
            })
        }

        user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok:true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'no duplicate registries'
        })
    }    
}

const userLogin = async(req,res)=>{
    const {email, password} = req.body;

    try {

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                ok:false,
                msg: 'This user not exist.'
            })
        }

        const validPassword= bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Invalid credentials'
            })
        }

        const token = await generateJWT(user.id, user.name);

        res.json({
            ok:true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'An error has ocurred, please contact with the administrator.'
        })
    }
}

const renewToken = async (req,res)=>{
    const {uid, name} = req;
    
    const token = await generateJWT(uid, name);

    res.json({
        ok:true,
        uid,name,
        token
    });
}


module.exports = {
    createUser,
    renewToken,
    userLogin
}