# Web-application demo using only an m2m client

![](https://raw.githubusercontent.com/EdoLabs/src2/master/quicktour4.svg?sanitize=true)
[](quicktour.svg)

This is a quick demo on how to integrate *m2m* into your web application project.

The demo consists of a simple front-end using an *m2m client* and a back-end server using node and express.

The *m2m client* in the browser will directly access and capture resources from the remote devices.

The back-end server can be hosted from any platform - Linux, Windows or Mac. The server practically just serves a static index.html file and the node-m2m.min.js file in the public folder.

The remote devices ideally should be a Raspberry Pi device for this demo. However, if their are not available, you can just use any computers - Linux or Windows instead.

## Option1 - Setup Remote Devices using a Raspberry Pi with Led Actuator
On both devices, install an led actuator on pin 33 and 35.
Remote Device1

##### 1. Create a device project directory and install m2m and array-gpio inside the directory.
```js
$ npm install m2m array-gpio
```
##### 2. Save the code below as device.js in your device project directory.

```js
const { Device } = require('m2m');

let device = new Device(100);

let myData = 'myData';

device.connect('https://dev.node-m2m.com', () => {

  device.setGpio({mode:'input', pin:[11, 13]});
  device.setGpio({mode:'output', pin:[33, 35]});

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
```
##### 3. Start your device application.
```js
$ node device.js
```
#### Remote Device2

##### 1. Create a device project directory and install m2m and array-gpio inside the directory.
```js
$ npm install m2m array-gpio
```
##### 2. Save the code below as device.js in your device project directory.

```js
const { Device } = require('m2m');

const device = new Device(200);

device.connect('https://dev.node-m2m.com', () => {
  device.setGpio({mode:'out', pin:[33, 35]}, gpio => console.log(gpio.pin, gpio.state));
  
  device.setData('random-number', (data) => {
    let r = Math.floor(Math.random() * 100) + 25;
    data.send(r);
    console.log('random', r);
  });
});
```
##### 3. Start your device application.
```js
$ node device.js
```
## Option2 - Setup Remote Devices using Windows or Linux
#### Remote Device1
##### Here, we don't need to install array-gpio instead the gpio output will run in simulation mode.
##### 1. Create a device project directory and install m2m inside the directory.
```js
$ npm install m2m
```
##### 2. Save the code below as device.js in your device project directory.

```js
const { Device } = require('m2m');

let device = new Device(100);

let myData = 'myData';

device.connect('https://dev.node-m2m.com', () => {

  device.setGpio({mode:'input', pin:[11, 13], type:'simulation'});
  device.setGpio({mode:'output', pin:[33, 35], type:'simulation'});

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
```
##### 3. Start your device application.
```js
$ node device.js
```
#### Remote Device2

##### 1. Create a device project directory and install m2m inside the directory.
```js
$ npm install m2m
```
##### 2. Save the code below as device.js in your device project directory.

```js
const { Device } = require('m2m');

const device = new Device(200);

device.connect('https://dev.node-m2m.com', () => {
  device.setGpio({mode:'out', pin:[33, 35], type:'simulation'}, gpio => console.log(gpio.pin, gpio.state));
  
  device.setData('random-number', (data) => {
    let r = Math.floor(Math.random() * 100) + 25;
    data.send(r);
    console.log('random', r);
  });
  
});
```
##### 3. Start your device application.
```js
$ node device.js
```

## Web Application Setup

##### 1. Click the link below to create an access token.
[Create Access Token for Browser Client.](https://github.com/EdAlegrid/m2m-api#create-an-access-token-for-browser-client)

##### 2. Download the *m2m-browser-client-demo* project from *GitHub*.
```js
$ git clone https://github.com/EdAlegrid/m2m-browser-client-demo.git
```
##### 3. Install all dependencies inside *m2m-browser-client-demo* directory.
```js
$ cd m2m-browser-client-demo
```
```js
$ npm install
```
##### 4. Replace the access token in your index.html file.

Replace the acces token from the `script` section of your `/m2m-browser-client-demo/public/index.html` file. 
```js
<script>

// Replace the tkn below with your actual access token. Protect your access token at all times.  
var tkn = 'fce454138116159a6ad9a4234e7de810a1087fa9e7fbfda74503d9f52616fc5';

var client = new NodeM2M.Client();

client.connect(tkn, () => {

  ...

});  
```
##### 5. Start the web application server.
```js
$ node app
```
##### 6. Open a browser tab.
`http://127.0.0.1:4500`

The web application page should show the various sections with control buttons to try out how *m2m* communicates with the remote devices to control gpio outputs and access data.
