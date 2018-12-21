# TrainTime

### Overview

This is a train schedule application that incorporates Firebase to host arrival and departure data. This app retrieves and manipulates train scheculde information with Moment.js. This website will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station. 
The "minutes to arrival" and "next train time" will be automatically updated every minute.

This page can be found at https://joann675.github.io/TrainTime/

### Before You begin

In order to keep the firebase api key information secure, this information was placed in assets/javascript/config.js.
This file was then added to .gitignore file.
To recreate this file, you must have firebase database information and create the config.js including the following information:
// Initialize Firebase
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};