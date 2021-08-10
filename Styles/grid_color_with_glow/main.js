
// Events for user clicking
const green = document.getElementById("green").addEventListener("click", function () {getUserClicks(0)});
const red = document.getElementById("red").addEventListener("click", function () {getUserClicks(1)});
const yellow = document.getElementById("yellow").addEventListener("click", function () {getUserClicks(2)});
const blue = document.getElementById("blue").addEventListener("click", function () {getUserClicks(3)});

// Values represent the timing used in the setInterval setTimeout functions. The larger the number the longer
// the delay in the sequence for each color to turn on and off thus making it easier. 
// Standard: easy = 3000, medium = 2000, hard = 1000
const difficulty = 1000; //1000 milliseconds = 1 seconds

// colorSequenceIndex is the current size and index for colorSequence array for adding the next color in the
// automated sequence. 
let colorSequenceIndex = 0;

// userClickCount tracks correct clicks user has entered for the current round
let userClickCount = 0;


// Array values (0-3) represent colors (function call for a given color block)
// 0 = green (top left)
// 1 = red (top right)
// 2 = yellow (bottom left)
// 3 = blue (bottom right)
let colorSequence = [];

// random number (0-3) used to add color to the sequence
function getRandomInt(max) {
    const num = Math.floor(Math.random() * max);
    colorSequence.push(num);
    colorSequenceIndex++;
}

// main function for computer 
// 1. Generates the next color to the sequence/pattern
// 2. Displays entire sequence/pattern on the gameboard
// 3. Repeats steps 1-2 with current or new sequence
function game() { 
    // add color to the sequence/pattern
    getRandomInt(4);
    
    let i = 0;
    let j = 0;
    
    // Display sequence/pattern on gameboard
    let turnColorOn = setInterval(() => {
        console.log("setInterval ", i);

        
            const color = getColor(colorSequence[i]);
            // const panel = document.getElementById(color);
            playColor(color)

            let turnColorOff = setTimeout(() => {
                console.log("setTimeout ", j);
                endColor(color)
                // if(j == 1) 
                //     clearInterval(turnColorOff);
                // j++
            }, difficulty - 500);

            if (i == colorSequence.length - 1)
                clearInterval(turnColorOn);
            i++;

    }, difficulty);
    
}
// uncomment game(); to begin game in the current state (more functionality will be added to initiate game)
// game();


function getColor(colorIn) {
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

// add effect to gameboard for current color in the sequence/pattern
function playColor(colorIn) {
    const panel = document.getElementById(colorIn);
    panel.style.boxShadow = `0 0 15px 5px #fff, 0 0 30px 25px ${colorIn}, 0 0 30px 15px #0ff`;
    
    // console.log("playColor ", panel);
}
// remove effect to gameboard for current color in the sequence/pattern
function endColor(colorIn) {
    const panel = document.getElementById(colorIn);
    panel.style.boxShadow = ``;
    
    // console.log("endColor ", panel);
}
 
// capture and track user selection for current round for the sequence/pattern
// function will also repeat game if the pattern is matched correctly
// or resets the game if the pattern is incorrect.
function getUserClicks(color) {
    console.log("Inside getUserClicks ", color);
    
    if(color == colorSequence[userClickCount])
    {
        console.log("correct")
        userClickCount++;
    } 
    else 
    {
        console.log("wrong")
        colorSequence = [];
        colorSequenceIndex = 0;
        userClickCount = 0;
        alert("GAME OVER");
        game();
    }
    if(userClickCount == colorSequence.length)
    {
        //user has correctly clicked on the color sequence, continue game with next color in the pattern
        console.log("user matched pattern")
        userClickCount = 0;
        game();
    } 
}
