
// ----- COLORED TILE ELEMENTS ----- //
const green = document.getElementById("green");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");

// ----- VIDEO ELEMENT ----- //
const videoDiv = document.getElementById("videoDiv");

// ----- SOUNDS ----- //
const losingSounds = ['./audio/lost/bart_laugh.mp3','./audio/lost/not_going_to_curse.mp3','./audio/lost/number_for_911.mp3','./audio/lost/save_me_superman.mp3','./audio/lost/stupider_like_a_fox.mp3','./audio/lost/tried_your_best.mp3','./audio/lost/trying_to_impress_people.mp3']
const winningSounds = ['./audio/won/nerrrrd.mp3', './audio/won/so_long_losers.mp3', './audio/won/I_Am_So_Smart.mp3'];
const lost = ['./audio/wrong/ahh.mp3'];

// ----- VARIABLES ----- //
// colorSequence keeps track of the game sequence
let colorSequence = [];

// difficulty sets the starting level of difficulty by controlling the delay between each color sequence
// level begings at difficulty and decreases after 9 rounds of play
const difficulty = 1000;
let level = difficulty;
// transitionTime controls the setTimeout delay for resetting/continued round during user turn
const transitionTime = 1000;

// userClickCount tracks correct clicks user has entered for the current round
let userClickCount = 0;

// This will disengage users click input while the computer plays sequence
let userTurn = false;
// change to false for game play

// current round (starts at 1 ends at 31)
let roundCount = 0;

// ----- VIDEO FUNCTIONS ---- //

// Video intro controls (fade out, animation triggering and volume lowering)
// function fadeVideo() {
//     const videoDiv = document.getElementById("video");
//     let videoFade = document.getElementById("video");
//     videoFade.style.opacity = 1;


//     console.log("videofade ", videoFade.style.opacity)
//     let fade = setInterval(() => {
//         if(videoFade.style.opacity <= .20) {
//             clearInterval(fade)
//             removeVideo(); 
//         }
       
//         videoFade.style.opacity -= 0.1;
//     }, 200);
// }
// setTimeout("fadeVideo()", 27000); 

// function removeVideo() { 
    
//     console.log("removeVideo")
//     const test = document.getElementById("videoDiv");
//     test.classList.add("removed");
//     test.addEventListener("transitionend", () => {
//         console.log("transitioned");
//         videoDiv.remove(); 
//     })
// }



// videoDiv.oncanplay = function() {
//     console.log("canplaythrough")
//     setTimeout(function() {
//         var fades = document.getElementById('video');
//         fade(fades);
//     }, 1000);
// }

// function fade(element) {
//     var op = 0;
//     var timer = setInterval(function() {
//         if (op >= 1) clearInterval(timer);
//         element.style.opacity = op;
//         element.style.filter = 'alpha(opacity=' + op * 100 + ")";
//         op += op * 0.1 || 0.1;
//     }, 50);
// }; 

// function lowerVolume() {
//     var vid = document.getElementById("video");
//     vid.volume = 1; 

//     let volumeOff = setInterval(() => {
//         if(vid.volume < 0.21){
//             clearInterval(volumeOff)
//         }
           
//         vid.volume -= 0.2;
//     }, 200);
// }
// setTimeout("lowerVolume()", 28500);

// ----- SOUND FUNCTIONS ----- //
function gameWon() 
{
    console.log("Game Won!!");
    const sound = new Audio(winningSounds[getRandomInt(winningSounds.length)]);
    return sound;
    // sound.onloadedmetadata;
    // console.log("sound = ", sound , " duration ", sound.duration);
    // sound.play();
    // sound.onended = function() {
    //     console.log("sound has ended");
    //     return true;
    // }
}

function wrongPlay() 
{
    console.log("Wrong Play");
    const sound = new Audio(lost[getRandomInt(lost.length)]);
    return sound;
    // sound.play();
}

function gameOver() 
{
    console.log("Game Over");
    const sound = new Audio(lost[losingSounds[getRandomInt(losingSounds.length)]]);
    return sound;
    // sound.play();
}



// ----- CONTROLS ----- //
const gameStart = document.getElementById("start")
gameStart.onclick = function() 
    {
        setGame();
    }




// ----- COLORED TILE EVENTS ----- //
// ----- GREEN ----- //
green.onmousedown = function() 
    {
        // console.log("Green Mouse Down ", userTurn);
        if (userTurn) {
            // console.log("User Turn")
            playGreen();
            checkSequenceForMatch("green");
        }
    }
green.onmouseup = function() 
    {
        // console.log("Green Mouse UP")
        // restore original color 
        if (userTurn) {
            endGreen();
        }
    }
// ----- RED ----- //
red.onmousedown = function() 
    {
        if (userTurn) {
            playRed();
            checkSequenceForMatch("red");
        }
    }
red.onmouseup = function() 
    {
        // restore original color 
        if (userTurn) {
            endRed();
        }
    }
// ----- YELLOW ----- //
yellow.onmousedown = function() 
    {
        if (userTurn) {
            playYellow();
            checkSequenceForMatch("yellow");
        }
    }
yellow.onmouseup = function() 
    {
        // restore original color 
        if (userTurn) {
            endYellow();
        }
    }
// ----- BLUE ----- //
blue.onmousedown = function() 
    {
        if (userTurn) {
            playBlue();
            checkSequenceForMatch("blue");
        }
    }
blue.onmouseup = function() 
    {
        // restore original color 
        if (userTurn) {
            endBlue();
        }
    }





// ----- GAME FUNCTIONS ----- //

function setGame() {
    console.log("New Game");
    colorSequence = [];
    userClickCount = 0; 
    userTurn = false;
    roundCount = 1;
    level = difficulty;

    if (generateRandomSequence()) 
    {
        // play round 1
        playSequence();
    }
}


// ----- RANDOM NUMBER GENERATOR ----- //
// random number (0-3) used to add the next color to the game sequence and appends the colorSequence array
function getRandomInt(max) 
{
    return num = Math.floor(Math.random() * max);
}

// ----- CONVERT NUMBER TO COLOR ----- //
// getColor takes in a value (0-3) generated randomly by getRandomInt() and returns the appropriate color value
// 0 = green (top left)
// 1 = red (top right)
// 2 = yellow (bottom left)
// 3 = blue (bottom right)
function getColor(colorIn) 
{
    let color;

    if(colorIn === 0)
        color = "green";
    else if (colorIn === 1)
        color = "red";
    else if (colorIn === 2)
        color = "yellow";
    else if (colorIn === 3)
        color = "blue";
    else
        console.log("getColor() colorIn value out of range or null--colorIn = ", colorIn);
    return color;
}

// ----- COLOR SEQUENCE GENERATOR ----- //
// Generates all 31 colors in the sequence to initialize the game
function generateRandomSequence() 
{
    for(let i = 0; i < 31; i++)
    {
        colorSequence.push(getColor(getRandomInt(4)));
    }
    console.log("Game Color Sequence Generated: ", colorSequence)

    // when sequence is populated, tell setGame() it's clear to initiate playSequence() to start round 1
    return true;
}

function increaseDifficulty() 
{
    level -= 200;
}

// ----- COMPUTER PLAY (COLORED SEQUENCE) ----- //
function playSequence() 
{
    console.log("computer playSequence ", roundCount)
    // i is the iterator for each round
    let i = 0;
    
    // disengage user ability to click on tiles
    userTurn = false;

    if(roundCount % 2 == 0 && level > 200)
    {
        increaseDifficulty();
        console.log("difficulty increase level= ", level)
    }




    // Interval for computer play sequence (difficulty above to adjust sequence speed)
    let playRound = setInterval( () => 
        { 
        
            // console.log("interval")

            switch (colorSequence[i]) 
            {
                case "green": 
                    playGreen();
                    setTimeout(function() {
                        console.log("Timeout Green")
                        endGreen();
                    }, 600);
                    break;
                
                case "red":
                    playRed();
                    setTimeout(function() {
                        console.log("Timeout Red")
                        endRed();
                    }, 600);
                    break;
                
                case "yellow":
                    playYellow();
                    setTimeout(function() {
                        console.log("Timeout Yellow")
                        endYellow();
                    }, 900);
                    break;
                
                case "blue":
                    playBlue();
                    setTimeout(function() {
                        console.log("Timeout Blue")
                        endBlue();
                    }, 600);
                    break;
            }


            if (++i >= roundCount)
            {
                // console.log("clear computer interval i = ", i )
                window.clearInterval(playRound);
                userTurn = true;
            }
        }, level);
}




// ------ USER PLAY (SEQUENCE MATCHING) ----- //
function checkSequenceForMatch(colorIn) 
{
    // trigger onmousedown event while checking
    setTimeout(function() {
        endGreen();
        endRed();
        endYellow();
        endBlue();
    }, 200);

    // console.log("color at userClick ",userClickCount, " ", colorSequence[userClickCount]);

    // if user pick is wrong, end round and start game over
    if (colorIn != colorSequence[userClickCount])
    {
        console.log("Wrong");
        // reset game
        setTimeout(function() {
    
            wrongPlay(); 
    
        }, 2000);
        setTimeout(function() {
            
            setGame();
        }, 2000);
    }

    // increment userClick
    userClickCount++;

    // if user click equals roundCount, all picks were correct, advance to next round
    if (userClickCount >= roundCount)
    {
        console.log("round correct!")
        userTurn = false;
        userClickCount = 0;
        roundCount++;
        // console.log("play sequence called with userClick ", userClickCount, " roundCount ", roundCount)

        setTimeout(function() {
            playSequence();
        }, transitionTime);
    }
}


function waitFor(conditionFunction) 
{
    console.log("conditionFunction = ", conditionFunction)
    const poll = resolve => {
        if (conditionFunction())
            resolve();
        else    
            setTimeout(_ => poll(resolve), 4000);
    }
    return new Promise(poll); 
}
 




 // GREEN
function playGreen() {
    // console.log("GREEN clicked");
    const sound = new Audio('./audio/colored_tiles/doh.mp3');
    sound.play();
    green.style.backgroundColor = "#02d837"; 
}
function endGreen() {
    green.style.backgroundColor = "green";
}

// RED
function playRed() {
    // console.log("Red clicked")
    const sound = new Audio('./audio/colored_tiles/Why_You_Little.mp3');
    sound.play();
    red.style.backgroundColor = "#ff8080";
}
function endRed() {
    red.style.backgroundColor = "red";
}

// YELLOW
function playYellow() {
    // console.log("Yellow clicked")
    const sound = new Audio('./audio/colored_tiles/mmmm_donut.mp3');
    sound.play();
    yellow.style.backgroundColor = "yellow"; 
}
function endYellow() {
    yellow.style.backgroundColor = "#FED90F"
}

// BLUE
function playBlue() {
     // console.log("Blue clicked")
    const sound = new Audio('./audio/colored_tiles/woohoo.mp3');
    sound.play();
    blue.style.backgroundColor = "#70D1FE";
}
function endBlue() {
    blue.style.backgroundColor = "blue";
}



