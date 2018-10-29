$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyBtTGhmLgjubNljFlUK6Mr1ndts6AXPpiE",
        authDomain: "st-project-d021e.firebaseapp.com",
        databaseURL: "https://st-project-d021e.firebaseio.com",
        projectId: "st-project-d021e",
        storageBucket: "st-project-d021e.appspot.com",
        messagingSenderId: "789390668967"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var name = "";
    var destination = "";
    var time = "";
    var frequency = 0;
    var currentTime = moment();

    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        name = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        time = $("#time-input").val().trim();
        frequency = $("#frequency-input").val().trim();

        database.ref().push({
            name: name,
            destination: destination,
            time: time,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    })

    database.ref().on("child_added", function (childSnapshot) {
        $(name).append("<td><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().time + "</td><td>" + childSnapshot.val().frequency + "</td></tr>");
        $("#train-table tbody").append(
                                        "<tr><td>" + childSnapshot.val().name + "</td>" +
                                        "<td>" + childSnapshot.val().destination + "</td>" +
                                        "<td>" + childSnapshot.val().time + "</td>" +
                                        "<td>" + childSnapshot.val().frequency + "</td>") +
                                        "<td>" + (moment(frequency).diff(moment(), "mins") + "</td></tr>");
                                        //I really ran out of time trying to figure out the countdown till next train.
                                        //I realized that I didnt allot enough time to do this. Line 44 is what I came up with.
    
    });

})