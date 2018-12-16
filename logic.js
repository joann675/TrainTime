

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBQf70pI5VfxEayXWiw2ykFceB_KFOx2Mk",
  authDomain: "joann-sfirebase.firebaseapp.com",
  databaseURL: "https://joann-sfirebase.firebaseio.com",
  projectId: "joann-sfirebase",
  storageBucket: "joann-sfirebase.appspot.com",
  messagingSenderId: "435142571720"
};
firebase.initializeApp(config);

var database = firebase.database();
// Update table every minute
intervalId = setInterval(updateTable, 60000);

//Button for adding Trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grab user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#dest-input").val().trim();
  var firstTime = $("#firstTime-input").val().trim();
  var frequency = parseInt($("#freq-input").val().trim());

  

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: destination,
    time: firstTime,
    freq: frequency
  };
  console.log("Object " + newTrain);
  console.log(newTrain.trainName)

  // Uploads employee data to the database
  database.ref("trains").push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.firstTime);
  console.log(newTrain.frequency);


  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#firstTime-input").val("");
  $("#freq-input").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref("trains").on("child_added", function (trainSnapshot) {
  console.log(trainSnapshot.val());

  // Store everything into a variable.
  var trainName = trainSnapshot.val().name;
  var dest = trainSnapshot.val().dest;
  var firstTime = trainSnapshot.val().time;
  var freq = trainSnapshot.val().freq;

  // Employee Info
  console.log(trainName);
  console.log(dest);
  console.log(firstTime);
  console.log(freq);



  // Calculate the next arrival time and the minutes away
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % freq;
  var minAway = freq - tRemainder;
  var nextArrival = moment().add(minAway, "minutes").format('hh:mm A');



  // Create the new row
  var newRow = $("<tr class='item'>").append(
    $("<td class='name'>").text(trainName),
    $("<td>").text(dest),
    $("<td>").text(freq),
    $("<td class='next'>").text(nextArrival),
    $("<td class='min'>").text(minAway),

  );

  // Append the new row to the table
  $("#trainTable > tbody").append(newRow);

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

function updateTable() {

  $("#trainTable > tbody").empty();




  database.ref("trains").once('value', function (snap) {

    snap.forEach(function (trainSnapshot) {

      console.log('trains', trainSnapshot.val());

      // Store everything into a variable.
      var trainName = trainSnapshot.val().name;
      var dest = trainSnapshot.val().dest;
      var firstTime = trainSnapshot.val().time;
      var freq = trainSnapshot.val().freq;


      // Calculate the next arrival time and the minutes away
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      var currentTime = moment();
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      var tRemainder = diffTime % freq;
      var minAway = freq - tRemainder;
      var nextArrival = moment().add(minAway, "minutes").format('hh:mm A');;

      // Create the new row
      var newRow = $("<tr class='item'>").append(
        $("<td class='name'>").text(trainName),
        $("<td>").text(dest),
        $("<td>").text(freq),
        $("<td class='next'>").text(nextArrival),
        $("<td class='min'>").text(minAway),

      );

      // Append the new row to the table
      $("#trainTable > tbody").append(newRow);

    });

  });


}




