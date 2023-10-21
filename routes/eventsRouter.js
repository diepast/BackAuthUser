const express = require('express')
const eventsRouter = express.Router()

const eventsController = require ('../controllers/eventsController')

eventsRouter.get( '/events', eventsController.getEvents )
eventsRouter.post( '/events', eventsController.addEvent )

eventsRouter.get( '/event/:id', eventsController.getEvent )
eventsRouter.put( '/event/:id', eventsController.updateEvent )
eventsRouter.delete( '/event/:id', eventsController.deleteEvent )

module.exports = eventsRouter