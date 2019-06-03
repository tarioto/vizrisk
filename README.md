# Risk Visualization - Hurricanes in the Caribbean

This is a basic map app for the Understanding Risk competition to visualize risk. More on that here: https://understandrisk.org/vizrisk/

## Installation and setup

This is a basic map app that uses Angular, NodeJS, and MongoDB. There are some scripts included that use Python3 to initialize and update database values. Installation and setup recommendations are provided here for ease of local development.

### NodeJS

#### Mac

Install with homebrew

~~~~
brew install n
npm install node-sass@4.10.0 --no-save
~~~~

If the node-sass doesn’t install due to an “Failed at the node-sass@4.10.0 postinstall script”, then try:

~~~~
n lts
~~~~

#### Windows

Follow instructions at this link: https://blog.teamtreehouse.com/install-node-js-npm-windows

1. Download installer: https://nodejs.org/en/
2. Run the installer
3. Accept default settings

To run Node for an existing app, navigate to the appropriate directory and type in the following to install required packages:

~~~~
npm install
~~~~

Once all appropriate packages have been installed, you can type the following in to start up the app:

~~~~
npm start
~~~~

To see the app in your browser, just type in: localhost:4200

Note that many of our apps only work in Google Chrome

### MongoDB

#### Windows

Install Mongo: https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-4.0.9-signed.msi
* Don’t install as a service (i.e. uncheck box for Mongo as a service)
* Don’t install Mongo Compass

Set path variable:
System Properties > Advanced > Environment Variables

In the “User variables” select “Path” click ‘Edit…’ and add:  `C:\Program Files\MongoDB\Server\4.0\bin`

Run PowerShell and go to C: and type:

~~~~
mkdir data\db
~~~~

To run Mongo, type:

~~~~
mongod
~~~~
