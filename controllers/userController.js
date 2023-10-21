const Events = require("../models/eventModel");
const bycriptjs = require("bcryptjs");

const userController = {
  SignUP: async (req, res) => {
    const userExist = userExist.FormData.indexOf()      
  
  
  
  
  getEvents: async (req, res) => {
            try {
            const events = await Events.find();
            res.json({ mensaje: "Eventos de amazing events", events: events });
            } catch (error) {
            return res.status(500).json({ success: false });
            }
        },
        getEvent: async (res, req) => {
            try {
                const event = await Events.findById(req.params.id);
                return res.status(200).json({ success: true, event:event });
            } catch (error) {
                return res.status(500).json({ success: false });
            }
        },
        addEvent: async (req, res) => {
            try {
                const newEvent = await Events.create(req.body);
                return res.status(201).json({ success: true, event: newEvent });
            } catch (error) {
                return res.status(500).json({ success: false });
            }
        },
        updateEvent: async (req, res) => {
            console.log(req.params.id);
            console.log(req.body);
            try {
      const event = await Events.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      return res.status(200).json({ success: true, event: event });
    } catch (error) {
      return res.status(500).json({ success: false });
    }
  },

  deleteEvent: async (req, res) => {
    console.log(req.params.id);
    try {
      await Events.findOneAndDelete({ _id: req.params.id });
      return res.json({ success: true, message: "documento eliminado" });
    } catch (error) {
      return res.status(500).json({ success: false });
    }
  },
};

module.exports = eventsController;
