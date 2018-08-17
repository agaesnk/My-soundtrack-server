'use strict';

require('dotenv').config();
const mongoose = require ('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true
})
.then(()=> {
    console.log('CONNECTED TO DATABASE')
})
.catch(error => { 
    console.error('ERROR CONNECTING TO DATABASE:', error)})


module.exports = mongoose;