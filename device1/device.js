const { Device } = require('m2m');

let device = new Device(100);

let myData = 'myData';

device.connect('https://www.node-m2m.com', () => {

  //device.setGpio({mode:'input', pin:[11, 13]}, (gpio) => console.log('input pin', gpio.pin, 'state', gpio.state)); // rpi
  device.setGpio({mode:'input', pin:[11, 13], type:'simulation'}, (gpio) => console.log('input pin', gpio.pin, 'state', gpio.state));
  
  //device.setGpio({mode:'output', pin:[33, 35]}, (gpio) => console.log('output pin', gpio.pin, 'state', gpio.state)); // rpi
  device.setGpio({mode:'output', pin:[33, 35], type:'simulation'}, (gpio) => console.log('output pin', gpio.pin, 'state', gpio.state));
  
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
