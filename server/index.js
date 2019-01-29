
//constants always comes first and express needs to be the first constant
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const mc = require('./messagesCtrl')
const session = require ('express-session')

//middleware
app.use(bodyParser.json());
const {SESSION_SECRET} = process.env
app.use(session({
    secres: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use((req,res,next) => {
    const badWords = ['terd', 'fool', 'internet explorer']
    if(req.body.message){
        for(let i = 0; i< badWords.length; i++){
            let regex = new RegExp(badWords[i], 'g')
            req.body.message=req.body.message.replace(regex, '****')
        }
        next()
    }
    else {
        next()
    }
})

//endpoints
app.get(`/api/messages`, mc.getAllMessages)
app.post(`/api/messages`, mc.createMessage)
app.get(`api/messages/history`, mc.history)

//Where the magic happens. app.listen needs to come last.
const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
    console.log(`Someone is eaves dropping on ${PORT}.`)
})