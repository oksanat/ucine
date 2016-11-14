# ucine
## Film Locations in San Francisco
If you love movies, and you love San Francisco, you're bound to love this. - 
Search filming locations of movies shot in San Francisco starting from 1924.

Feeling lucky? Why not to try "I am feeling lucky" button to find location right
on your street?

Live demo: http://52.16.150.246:8080

### Application
* Node.js backend with Express and MongoDB
* AngularJS frontend

## Setting up
### Prerequisites
* Node.js
* MongoDB (Installation instructions for MongoDB can be found on the Mongo website).

### Using setup.sh
```
./setup.sh
```

### Manual setup
Npm install
```
    npm install
```
Start application
```
    node App.js
```

## Configuration file
```
    config/index.js
```
Name                | Description
--------------------| -------------
env                 | Running environment
port                | Port for connections
mongodb.host        | MongoDB host
mongodb.port        | MongoDB port
maps.apiKey         | Maps apiKey
maps.provider       | Maps provider (Google by default)
maps.httpAdapter    | Maps http adapter
maps.formatter      | Maps formatter
boundaries.ne.lat   | Location boundaries: North East latitude
boundaries.ne.lng   | Location boundaries: North East longitude
boundaries.sw.lat   | Location boundaries: South West latitude
boundaries.sw.lng   | Location boundaries: South West longitude

## Running tests
### jasmine_node
```
    grunt jasmine_node
```
### karma
```
    grunt karma
```
### all
```
    grunt test
```


### TODO:
* Support language templating
* User Preferences

