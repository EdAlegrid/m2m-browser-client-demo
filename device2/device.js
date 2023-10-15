const { Device } = require('m2m');

const device = new Device(200);

device.connect('https://www.node-m2m.com', () => {
  //device.setGpio({mode:'input', pin:[11, 13]}, (gpio) => console.log('input pin', gpio.pin, 'state', gpio.state)); // rpi
  device.setGpio({mode:'input', pin:[11, 13], type:'simulation'}, (gpio) => console.log('input pin', gpio.pin, 'state', gpio.state));
  
  //device.setGpio({mode:'output', pin:[33, 35]}, (gpio) => console.log('output pin', gpio.pin, 'state', gpio.state)); // rpi
  device.setGpio({mode:'output', pin:[33, 35], type:'simulation'}, (gpio) => console.log('output pin', gpio.pin, 'state', gpio.state));
  
  device.publish('random-number', (data) => {
    let r = Math.floor(Math.random() * 100) + 25;
    data.send(r);
    console.log('random', r);
  });

  // error listener
  device.on('error', (err) => console.log('error:', err));
});
