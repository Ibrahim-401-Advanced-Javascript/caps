// 'use strict';

// const emitter = require('../index.js');

// const handleEvents = (eventName) => {
//   return payload => {
//     let time = new Date();
//     console.log('EVENT', { event:eventName, time, payload });
//   };
// };

// emitter.on('pickup', handleEvents('pickup'));
// emitter.on('in-transit', handleEvents('in-transit'));
// emitter.on('delivered', handleEvents('delivered'));

const inquirer = require('inquirer');
const net = require('net');

const client = new net.Socket();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3001;

client.connect(port, host, () => {
  console.log('successfully connected to', host, ':', port);
});

let name = '';
let messages = [];

client.on('data', function(data) {
  let event = JSON.parse(data);
  if (event.event === 'message') {
    messages.push(event.payload);

    console.clear();
    messages.forEach(message => console.log(message));
    console.log('');
  }
});

function sendMessage(text) {
  console.log('sending', text);
  let message = `[${name}]: ${text}`;
  let event = JSON.stringify({ event: 'message', payload: message });
  client.write(event);
};

async function getInput() {
  let input = await inquirer.prompt([{ 'name': 'text', 'message': ' ' }]);
  sendMessage(input.text);
  getInput();
}

async function getName() {
  console.clear();
  let input = await inquirer.prompt([{ 'name': 'name', 'message': 'EVENT LOG' }]);
  name = input.name;
}

getName();
getInput();
