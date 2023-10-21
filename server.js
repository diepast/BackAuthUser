require('dotenv').config()
const express = require('express')
const app = express()
require('./config/database.js')

const eventsRouter = require('./routes/eventsRouter')

app.use( express.json() )

const PORT = process.env.PORT || 4000

app.set("port", PORT)

app.get('/', (req,res)=>{res.send("servidor creado")})
app.use('/api' , eventsRouter )

app.listen(PORT, ()=>{console.log("Servidor corriendo en puerto: "+app.get('port'))})