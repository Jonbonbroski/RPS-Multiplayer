$("document").ready(function(){

//variables to change and update game

var gameName;
var joinName
var room;
var choice;
var choiceOne;
var choiceTwo = 0;
var playerOneName;
var playerOneChoice;
var playerOneWins=0;
var playerOneLosses=0;
var playerOneChat;
var playerTwoChoice;
var playerTwoWins=0;
var playerTwoLosses=0;
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

$("#rps-btn-one").hide();
$("#rps-btn-two").hide();


//function to create new game information to firebase.
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

database.ref("games").on("value", function(chatSnapshot){
   // console.log(chatSnapshot.val());
});


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

database.ref("games").on("value", function(updateSnap){
   
});


//Even to make new game and update HTML to game view. 
$("body").on("click", "#create-game", function(){
    createGame();
    makeGame();
    player=1;
    console.log(player);
    $("#rps-btn-one").show();
    $("#rps-btn-two").hide();
    $("#main-display").hide();

});


//Function to join game that has already been created. This also defines player 2
$("body").on("click", "#join-game", function(){
    playerTwoName = prompt("Please enter your gamer name:", "Dumpster Juice");
    joinName = prompt("Please enter game name:", "Sock'em Boppers");
    player=2;
    console.log(player);
    var gameSearch = database.ref().child(joinName);
    if(gameSearch === null || undefined){        
        alert("Game does not exist.");
    }else{

    $("#rps-btn-two").show();
    $("#main-display").hide();

    
};
    
    
});



//function rules to be ran in the game so it isn't typed twice
//this compares the player choices.

function rules(a,b){
    console.log(a);
    console.log(b);
  
    if(a == b){
        //it's a tie

        //update html no points added,
    }
    if(a==1 && b==2, a==2 && b==3, a==3 && b==1){
        if(player == 1){
            //player2wins html
            playerOneLosses++;
            database.ref("games/"+gameName+"/player1losses").set(playerOneLosses);
            playerTwoWins++;
            database.ref("games/"+gameName+"/player2wins").set(playerTwoWins);

         }
         if(player == 2){
            //player1Wins HTML
            playerTwoLosses++;
            database.ref("games/"+joinName+"/player2losses").set(playerTwoLosses);
            playerOneWins++;
            database.ref("games/"+joinName+"/player1wins").set(playerOneWins);

        }
    }else{
        if (player == 1){
            //player1HTML
            playerTwoLosses++;
            database.ref("games/"+gameName+"/player2losses").set().val(playerTwoLosses);
            playerOneWins++;
            database.ref("games/"+gameName+"/player1wins").set(playerOneWins);
        }
        if(player == 2){
            //player2wins html
            playerOneLosses++;
            database.ref("games/"+joinName+"/player1losses").set(playerOneLosses);
            playerTwoWins++;
            database.ref("games/"+joinName+"/player2wins").set(playerTwoWins);
        }
    }
};


//This function runs the game for player one. If player chooses first, it will display
//player is ready. If player clicks second, it will run the game and update score. 

function playerOneGame(){
    if(player == 1){
        function checker1(){
            //choice = $(this).attr("value");
            console.log(choice);
            database.ref("games/"+gameName+"/player1choice").set(choice);
   
        };
        
        function run1(){
            //console.log(otherChoice)
            if(choiceTwo == 0){
                console.log(choiceTwo);
                database.ref("games/"+gameName+"/playerReady").set("Player 1 Ready!");
                //notify player two is ready
                
            }else{
                console.log(choiceTwo)
                rules(choice,choiceTwo);
                database.ref("games/"+gameName+"/player1choice").set(0);
                database.ref("games/"+gameName+"/player2choice").set(0);
            }
        }
        checker1();
        run1();
    };
};


//Click event to set player 1 and check player 2 selection.

$("body").on("click",".choice", function(){

    if( $(this).attr("value")=="1"){
        choice = 1
    }
    if( $(this).attr("value")=="2"){
        choice = 2
    }else{
        choice = 3
    };

    console.log(choice);
    database.ref("games/"+gameName).on("value", function(updateSnap){
    var pick = updateSnap.val().player2choice;
    if(pick == "1"){
        choiceTwo = 1
    }if(pick == "2"){
        choiceTwo = 2
    }else{
        choiceTwo = 3
    };
    
})

   
    playerOneGame();

});

//Similar function but for player two. If player two makes a choice first, it displays
//player 2 ready, otherwise it runs game and updates score. 
    
    function playerTwoGame(){
    if(player == 2){
        function checker2(){
            //choice = $(this).attr("value");

            database.ref("games/"+joinName+"/player2choice").set(choice);

        };
        
        function run2(){
            console.log(choiceTwo)
            if(choiceTwo == "none"){
                console.log(choiceTwo);
                database.ref("games/"+joinName+"/playerReady").set("Player 2 Ready!");
                //notify player two is ready
                
            }else{
                console.log(choiceTwo)
                rules(choice,choiceTwo);
                database.ref("games/"+joinName+"/player1choice").set(0);
                database.ref("games/"+joinName+"/player2choice").set(0);
            }
        }
        checker2();
        run2();
    };
};

$("body").on("click",".choice2", function(){
   
    if( $(this).attr("value")=="1"){
        choice = 1
    }
    if( $(this).attr("value")=="2"){
        choice = 2
    }else{
        choice = 3
    };

    console.log(choice);
    database.ref("games/"+joinName).on("value", function(updateTwoSnap){
        var pick = updateTwoSnap.val().player1choice;
        if(pick == "1"){
            choiceTwo = 1
        }if(pick== "2"){
            choiceTwo =2
        }else{
            choiceTwo = 3
        };
        
    })

  
    playerTwoGame();
    });

});








