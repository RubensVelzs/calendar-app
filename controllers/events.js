const {response} = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res=response)=>{
    try {
     const events =  (await Event.find().populate('user',['name','email']))
     res.status(200).json({
        ok:true,
        events
     })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Contact with the administrator"
        });
    }
}

const createEvent = async(req, res=response)=>{
    const event = new Event(req.body);
    try {
     event.user= req.uid;
     const savedEvent =  await event.save();
       res.json({
        ok:true,
        savedEvent
       });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Contact the administrator"
        })
    }
}

const editEvent = async(req, res=response)=>{
    const eventId = req.params.id;
    try {
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'Event not found'
            });
        }

        if(event.user.toString()!==req.uid){
            return res.status(401).json({
                ok:false,
                msg:"You don't have permissions to update this evnt"
            })
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new:true});

        res.status(200).json({
            ok:true,
            event:updatedEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Contact with the administrator"
        });
    }
}

const deleteEvent = async (req, res=response)=>{
    const eventId = req.params.id;
    try {
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'Event not found'
            });
        }

        if(event.user.toString()!==req.uid){
            return res.status(401).json({
                ok:false,
                msg:"You don't have permissions to delete this evnt"
            })
        }

        const updatedEvent = await Event.findByIdAndDelete(eventId);

        res.status(200).json({
            ok:true,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Contact with the administrator"
        });
    }
}

module.exports={
    getEvents,
    createEvent,
    editEvent,
    deleteEvent
}