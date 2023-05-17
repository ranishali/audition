# Audition

This project provides the url shortening service.

## Getting Started

The project is written in Typescript and uses the NodeJS framework for backend with MongoDb as datasource

### Prerequisites

- NodeJS (latest)
- npm
- Typescript

### Installing

This project consists of two directories with different node packages

#### src
This is the main program

#### test
unit tests for program

From **main level**
```shell script
> npm install
> npm run clean
> npm run build
> npm run start
```

#### deployment
This defines the process when deploying a build to localhost.

**To test on localhost**

From **main level**
```shell script
> npm run clean
> npm run build
> npm run install
```
this will start the server and listen on port 5001 by default. Port can be configured using .env file

**To deploy on cloud**

once there is a custom domain, replace it in .env file and run above commands to build. A folder named dist is created which need to be deployed on cloud 

#### Customer use
Once server is up and running, user can either call the webpage or api endpoint to get the shorten url

**Using webpage**
on any web browser navigate to <domain:port>/
e.g. https://localhost:5001/
it will open a webpage asking to put the long/original url and after clicking submit it will create a shorten url.

**Using api endpoint**
user can call the following apis
- POST <domain:port>/api/url/shorten with body {url: <longurl>}
  this will return an object with code and shorten url
- GET <domain:port>/api/url/:id where id is the code of the shorten url
  this will return the an object original/long url
  
## Running the tests
from main level 
```shell script
> npm run clean
> npm run build
> npm run coverage
```

## Built With

* [NodeJS](https://nodejs.org/en/) - Javascript framework
* [Typescript](https://www.typescriptlang.org/) - Javascript typed superset
* [npm](https://www.npmjs.com/) - Package manager

## Authors

* **Ranish Ali**
