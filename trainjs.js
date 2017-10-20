// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDhfHBcRMqbAaZOke_aIZhjjsMbovdC7SA",
    authDomain: "train-hw-9860d.firebaseapp.com",
    databaseURL: "https://train-hw-9860d.firebaseio.com",
    projectId: "train-hw-9860d",
    storageBucket: "train-hw-9860d.appspot.com",
    messagingSenderId: "392674435566"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "hh:mm").format("hh:mm");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("Choo-choo! Train successfully added.");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);


  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstRun = moment(trainStart, "hh:mm").subtract(1, "years");
  console.log(firstRun);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var timeDiff = moment().diff(moment(firstRun), "minutes");
  console.log("DIFFERENCE IN TIME: " + timeDiff);

  // Time apart (remainder)
  var tRemainder = timeDiff % trainFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var minutesTillTrain = trainFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

  // Next Train
  var nextTrain = moment().add(minutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + minutesTillTrain);
});