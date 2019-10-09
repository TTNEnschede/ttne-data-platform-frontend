# Frontend to the TTNE dataplatform

This repository contains the implementation of the frontend application of the
TTN Enschede data platform. The frontend consists of a map that displays the
location of (IoT) nodes in system.

The frontend connects to a backend which consists of:
 * an Ingest service: https://github.com/TTNEnschede/ttne-data-platform-ingest
 * a Devices service: https://github.com/TTNEnschede/ttne-data-platform-devices

## Project setup

To install the required dependencies clone this repository and run in its root:
```
npm install
```

### Compiles and hot-reloads for development

For local development and testing run (after having installed the dependencies).
```
npm run serve
```

### Compiles and minifies for production

To build a production package use the command below. The package will be build and
stored in the '/dist' folder. Don't forget to run npm install to install the required packages.
```
npm run build
```

### Run your tests
(Not used at the moment).
```
npm run test
```

### Lints and fixes files
(Not used at the moment).
```
npm run lint
```

## Configuration

In order for the frontend to work properly the following things need to be configured:
 * Set a valid token for the mapbox map. Please register at www.mapbox.com to get
 a valid map token. In the application configuration ('/config/app.config.js') you
 should set the token in order for the map to display correctly. Details below.
 * Set the devicesServiceUrl to connect to the device service. Your device service
 is deployed to a specific server. Supply the server's ip address or DNS name (and
 optionally its port) so that the frontend where to connect to. Details below.
 * (Optionally) Set the baseUrl for the application. This is particularly useful
 when your application is served from a S3 bucket for example. In this case you
 should set the 'baseUrl' to name of the bucket. Details below.

### Set a valid mapboxToken and devicesServiceUrl
In config/app.config.js set the *mapboxToken* and *devicesServiceUrl*:
```
export default {
  notification_timeout: 3000,
  mapboxToken: '<YOUR_TOKEN_HERE>',
  mapStyles: {
    default: 'mapbox://styles/mapbox/streets-v10',
    light: 'mapbox://styles/mapbox/light-v9'
  },
  defaultMapCenter: {
    lat: 52.2137814,
    lon: 6.8888004
  },
  defaultMapZoom: 12,
  devicesServiceUrl: 'http://localhost:3002/api/devices'
}

```

### Set the baseUrl for the application
In vue.config.js you will find the baseUrl property.
Important if you want to deploy to S3. Set the name of the bucket here.
```
// vue.config.js
module.exports = {
  baseUrl: 'ttne-data-platform'
}

```
