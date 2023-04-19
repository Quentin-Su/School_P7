# Project Setup

## Installing Dependencies
To install the dependencies for the project, run the following commands:

1. Clone the repo
2. Navigate to the client directory: `cd client`
3. Install the dependencies: `npm i`
4. Navigate to the server directory: `cd ../server`
5. Install the dependencies: `npm i`
6. Create a folder named **images**: `mkdir images`
7. In the .env file at the root of the **server** directory, define the following variables:

> PORT: the port on which the server will listen for requests (default value: 4000)
> 
> DB_PASSWORD: the password of the MongoDB database
> 
> API_KEY: the secret key used to sign authentication tokens

## Usage

### Node Console (CMD)
1. Start the client application: `cd client && npm start`
2. Start the server: `cd ../server && npm start`

### Powershell Console
1. Start the client application: `cd client`, `npm start`
2. Start the server: `cd ../server`, `npm start`

Remember to replace the values of the .env variables with the appropriate values for your environment.
