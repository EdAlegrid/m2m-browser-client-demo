const { Device } = require('m2m');

let device = new Device(100);

let myData = 'myData';

device.connect('https://dev.node-m2m.com', () => {

  //device.setGpio({mode:'output', pin:[33, 35]}); // raspberry pi
  device.setGpio({mode:'output', pin:[33, 35], type:'simulation'}); // windows or linux
  
  device.setData('get-data', (data) => {
    data.send(myData);
  });

  device.setData('send-data', (data) => {
    if(data.payload){
      myData = data.payload;
      data.send(data.payload);
    }
  });

  // error listener
  device.on('error', (err) => console.log('error:', err))
});
