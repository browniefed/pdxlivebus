# PDXLiveBus  

The PDXLiveBus app built in React and React Native.
It uses Express, and Socket.io.
Server located in the server folder.

![http://i.imgur.com/PLh6pce.jpg](http://i.imgur.com/PLh6pce.jpg)

## React Native

The React Native version is inside of the native folder.

## Running it

Run `yarn` or `npm install` in the `web`, `server`, and `native` directories.

### Server

You'll need an API Key from here [http://developer.trimet.org/appid/registration/](http://developer.trimet.org/appid/registration/)

Then you'll need to create a  `.env` file in the `server` folder and add. But you'll replace `API_KEY_HERE` with the api key from Trimet.

```
TRIMET_KEY=API_KEY_HERE
```

Then run `npm start` inside the server to spin up a server at `localhost:3001`.



### Apps

In either the `web` or `native` directories run `npm start`.
The apps should kick off and connect to your running server