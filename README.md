Real-time Polls App
===================

This app is using the MEAN stack and sockets.io. It is recreated from this tutorial [http://www.ibm.com/developerworks/library/wa-nodejs-polling-app/](http://www.ibm.com/developerworks/library/wa-nodejs-polling-app/). The original was using express 3 and socket.io 0.9, I have upgraded the app to express 4 and socket.io 1.

I have also added the code to make it run on an OpenShift instance with Node and MongoDB cartridges installed. 

To run locally: 
```
git clone https://github.com/katjad/pollsapp-meanstack.git
cd pollsapp-meanstack
npm install
```
You also need to create data/db under root for the MongoDB data. 

To run, first start MongoDB:
```
mongod --dbpath data/db
```
Then in different terminal tab start the node server:
```
node server.js
```

Visit localhost:8080 to see the app and create polls



