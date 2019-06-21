$("document").ready(function(){

//variables to change and update game

var gameName;
var joinName
var room;
var playerOneName;
var playerOneChoice;
var playerOneWins;
var playerOneLosses;
var playerOneChat;
var playerTwoChoice;
var playerTwoWins;
var playerTwoLosses;
var playerTwoChat; 
var player = 0;

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

$("#rps-btn").hide();

database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val())
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
            playerReady: "",            
        }
     });
};

database.ref("games").on("value", function(changedSnapshot){
    console.log(changedSnapshot.val());
})

//function to set var values and make player one.

function createGame(){
        playerOneName = prompt("Please enter your gamer name:", "Dumpster Juice");
        gameName = prompt("Please enter game name:", "Sock'em Boppers");
        playerOneChoice = "none";
        playerOneWins = 0;
        playerOneLosses = 0;
        playerOneChat = 0;
        playerTwoName= null;
        playerTwoChoice = "none";
        playerTwoWins = 0;
        playerTwoLosses = 0;
        playerTwoChat = 0;

};



//function to make game 
$("body").on("click", "#create-game", function(){
    createGame();
    makeGame();
    player=1;
    console.log(player);
    $("#rps-btn").show();
    $("#main-display").hide();

    //update html and load game data here

});


//function to join game
$("body").on("click", "#join-game", function(){
    playerTwoName = prompt("Please enter your gamer name:", "Dumpster Juice");
    joinName = prompt("Please enter game name:", "Sock'em Boppers");
    player=2;
    console.log(player);
    var gameSearch = database.ref().child(joinName);
    if(gameSearch === null || undefined){        
        alert("Game does not exist.");
    }else{

    $("#rps-btn").show();
    $("#main-display").hide();

    
};
    
    
});



//function rules to be ran in the game so it isn't typed twice

function rules(a,b){

    if(a === b){
        //it's a tie

        //update html no points added,
    }else if(a==="rock" && b==="paper" || a==="paper" && b==="scissors" || a==="scissors" && b==="rock" ){
        //player a loses
    }else{
        //player wins
    }


};

//click event to run game

$("body").on("click",".choice", function(){

   // theGame = database.ref("games").child(gameName);

     if(player == 1){

       // theGame = database.ref("games").child(gameName);
        //I need to get choice from button. Update that as player onechoice
        choice = $(this).attr("value");
        database.ref("games/"+gameName+"/player1choice").set(choice);
        console.log(choice);
        choiceTwo = theGame.player2choice;
        console.log(choice2);


        
        if(choiceTwo == "none" || undefined){
            //notify player one is ready through HTML
            //database.ref("games").child(gameName).playerReady.set("Player 1 Ready!")
            //$("#player-ready").text() = database.ref("games").child(gameName).playerReady;
            database.ref("games/"+gameName+"/playerReady").set("Player 1 Ready!");
    
        }else{
            rules(choice,choice2);
        }
    };

    if(player == 2){
        var choice = $(this).attr("value");
        console.log(choice);
        var choice2 = database.ref().child(joinName).player1choice;
        console.log(choice2)
        theGame.set({"player2choice":choice});

        if(playerOneChoice == 0){
        //notify player two is ready


        }else{
            rules();
        }
    }

})
});







