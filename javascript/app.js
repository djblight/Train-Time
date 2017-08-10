
  // Initialize Firebase
  // Initialize Firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyApRFjVzeeweRcm3gPNpKBt27zdbbWFBKA",
    authDomain: "train-time-99040.firebaseapp.com",
    databaseURL: "https://train-time-99040.firebaseio.com",
    projectId: "train-time-99040",
    storageBucket: "train-time-99040.appspot.com",
    messagingSenderId: "758807974528"
  };
  firebase.initializeApp(config);

var database = firebase.database();
    
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;
var nextArrival = "";
var minutesAway = 0;
var currentTime = "";

// Show current time
var datetime = null;
date = null;

var update = function () {
  date = moment(new Date());
  datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
  datetime = $('#current-status');
  update();
  setInterval(update, 1000);

   
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#time").val().trim();
    var frequency = $("#frequency").val().trim();
    var audiotrain = document.getElementById("train");
              audiotrain.play();


    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: destination,
      time: firstTrainTime,
      frequency: frequency,
      minutesAway: minutesAway,
      nextArrival: nextArrival,
    };
    console.log(newTrain);
    // Uploads train data to the database
    database.ref().push(newTrain);

   // dateAdded: firebase.database.ServerValue.TIMESTAMP;

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
    
    $("#name").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");

  });
});
 
// Grabs user input from data input bars


  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;

    console.log("name: " + childSnapshot.val().name);
    console.log("destination: " + childSnapshot.val().destination);
    console.log("time: " + childSnapshot.val().time);
    console.log("frequency: " + childSnapshot.val().frequency);
    

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    
    // First train time (pushed back 1 year to make sure it comes before current time)
    var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    console.log(firstTrainTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES AWAY: " + minutesAway);

    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm a"));
   
         
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

});

   
   


    
  

 