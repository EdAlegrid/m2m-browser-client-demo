const { Device } = require('m2m');

const device = new Device(200);

device.connect('https://dev.node-m2m.com', () => {
  //device.setGpio({mode:'out', pin:[33, 35]}, gpio => console.log(gpio.pin, gpio.state)); // raspberry pi
  device.setGpio({mode:'out', pin:[33, 35], type:'simulation'}, gpio => console.log(gpio.pin, gpio.state)); // windows or linux
});
