const mongoose= require('mongoose');

const dbConection = async()=>{
    try {

        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('db online')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error to initialize database');
    }
}

module.exports={
    dbConection
}