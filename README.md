# ucine
## Film Locations in San Francisco
If you love movies, and you love San Francisco, you're bound to love this! 
Search filming locations of movies shot in San Francisco starting from 1924.

Feeling lucky? Why not to try **"I am feeling lucky"** button to find location right
on your street?

[Live demo](http://52.16.150.246:8080)

10 most recent film locations are shown by default (on page load).
Click on each pointer to get more information about: 
* Actors
* Director
* Location
* Fun Facts
* Plot

Click on a **"Street View"** icon to wander the locations and see what you ou stumble upon.

If available: 
* Click on a **"Imdb"** icon to open Imdb movie page
* Click on a **"Poster"** icon to open poster image

> "I am feeling lucky" button won't be able to determine your location on live demo site because it requires https.

## Application
* Node.js backend with Express and MongoDB
* AngularJS frontend

## Setting up
### Prerequisites
* Node.js
* MongoDB (local or remote)

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
### Backend
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
### Frontend
```
    public/js/config/Env.js
```
Name                      | Description
--------------------------| -------------
gitRepo                   | Git repo
enableDebug               | Enable/disable $log.debug messages
maps.zoom                 | Maps zoom level
maps.position             | Default positon on a map
movies.limit              | Default number of movies to load
movies.firstReleaseYear   | Maps http adapter
movies.sfgovUrl           | SFGov api
movies.appToken           | SFGov application token
apiUrl                    | Backend server api

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


## TODO:
* More unit tests
* End to end tests
* Responsive design
* Deployment script
* Support https
* Support language templating
* User Preferences

