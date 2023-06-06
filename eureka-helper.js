const Eureka = require('eureka-js-client').Eureka;
const eurekaHost = ('192.168.2.79');
const eurekaPort = 8761;
const hostName = ('localhost')
const ipAddr = '127.0.0.1';

exports.registerWithEureka = function(appName, PORT) {
    const client = new Eureka({
    instance: {
      app: appName,
      hostName: hostName,
      ipAddr: ipAddr,
      port: {
        '$': PORT,
        '@enabled': 'true',
      },
      vipAddress: appName,
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
 
    eureka: {
      host: eurekaHost,
      port: eurekaPort,
      servicePath: '/eureka/apps/',
      maxRetries: 10,
      requestRetryDelay: 2000,
    },
  })

client.logger.level('debug')

client.start( error => {
    console.log(error || "user service registered")
});



};
