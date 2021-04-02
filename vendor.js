'use strict';

const io = require('socket.io-client');
const faker = require('faker');


const host = 'http://localhost:3000';

const socket = io.connect(host);
const store = process.env.STORE

setInterval(()=>{
  let payload = {
    storeName:'tana flower shop',
    // orderID:faker.random.number(),
    orderID:Math.random()*1000,
    customer:faker.name.findName(),
    address: faker.address.streetAddress(),
    date:new Date()

  }
  socket.emit('pickup',{event:'pickup',payload:payload,time:Date.now})
},5000)
socket.on('delivered',payload=>{
 console.log('Thank you for delivering orderID',payload.payload.orderID)

})