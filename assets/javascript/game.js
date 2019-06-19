$("document").ready(function(){

//variables to change and update game

var gameName;
var playerOneName;
var playerOneChoice;
var playerOneWins;
var playerOneLosses;
var playerOneChat;
var playerTwoChoice;
var playerTwoWins;
var playerTwoLosses;
var playerTwoChat; 
var playerOne=0;
var playerTwo=0;

//linking Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAe3XpDEdF2AHX1R4QkRdHxRMALaFp0ERQ",
    authDomain: "hurt-me-plenty.firebaseapp.com",
    databaseURL: "https://hurt-me-plenty.firebaseio.com",
    projectId: "hurt-me-plenty",
    storageBucket: "hurt-me-plenty.appspot.com",
    messagingSenderId: "90828627260",
    appId: "1:90828627260:web:d2815d5f56f0d55a"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var newGame = firebase.database().ref();

database.ref().set({
    games:{}
});


//function to create information to firebase.
function makeGame(){
    firebase.database().ref().child('games').set({
        [gameName]:{
            player1name:playerOneName,
            player1choice: playerOneChoice,
            player1wins: playerOneWins,
            player1losses:playerOneLosses,
            player1chat:playerOneChat,
            player2choice:playerTwoChoice,
            player2wins:playerOneWins,
            player2losses:playerOneLosses,
            player2chat:playerOneChat,            
        }
     });
};

//function to set var values and make player one.

function createGame(){
        playerOneName = prompt("Please enter your gamer name:", "Dumpster Juice");
        gameName = prompt("Please enter game name:", "Sock'em Boppers");
        playerOneChoice = null;
        playerOneWins = 0;
        playerOneLosses = 0;
        playerOneChat = 0;
        playerTwoName= null;
        playerTwoChoice = null;
        playerTwoWins = 0;
        playerTwoLosses = 0;
        playerTwoChat = 0;

};



//function to make game 
$("body").on("click", "#create-game", function(){
    createGame();
    makeGame();
    playerOne=1;
    console.log(playerOne);
    console.log(playerTwo);

    //update html and load game data here


});


//function to join game
$("body").on("click", "#join-game", function(){
    playerTwoName = prompt("Please enter your gamer name:", "Dumpster Juice");
    gameName = prompt("Please enter game name:", "Sock'em Boppers");

playerTwo=1;
console.log(playerOne);
console.log(playerTwo);

    //update html and load game data here. "if" no game is found do an alert.
    
});


//run game. if playerone/two == 1 then update info for that player data

});







