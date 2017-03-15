var Web3 = require('web3');
var httpProvider = new Web3.providers.HttpProvider('http://$host$:$port$');
httpProvider.send = function () { console.log('Synchronous methods are not allowed since they would freeze the NodeJS process and make you think the App had crashed. Dont use synchronous methods in Node.'); return null; }
var web3 = new Web3(httpProvider);
