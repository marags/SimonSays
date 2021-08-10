document.getElementById("green").addEventListener("click", function () {console.log("Green CLick")})
// Values represent the timing used in the setInterval setTimeout functions. The larger the number the longer
// the delay in the sequence for each color to turn on and off thus making it easier. 
// Standard: easy = 3000, medium = 2000, hard = 1000
const difficulty = 2000; //1000 milliseconds = 1 seconds


// Array values (0-3) represent colors (function call for a given color block)
// 0 = green (top left)
// 1 = red (top right)
// 2 = yellow (bottom left)
// 3 = blue (bottom right)
let colorSequence = [];

function getRandomInt(max) {
    console.log("getRandomInt")
    const num = Math.floor(Math.random() * max);
    console.log('num ', num);
    colorSequence.push(num);
}

(function game() {
    // This loop is generating values for the sequence for testing purposes
    // full game will increment the colorSequence array by one for each start of the sequence
    for(let i = 0; i < 0; i++)
    {
        getRandomInt(4);
    }
    // console.log("arr size ", colorSequence.length)
    // console.log("array ", colorSequence);

    //intervals that control the timing of the sequence execution for each color on and off
    let i = 0;
    let j = 0;
    let turnColorOn = setInterval(() => {
        console.log("setInterval ", i);

        if(colorSequence.length > 0)
        {
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

        }
    }, difficulty);
    

    let i = 0;
    let j = 0;
    if(colorSequence.length > 0)
    {
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

    //now do timeouts waiting for users to click
    getUserClicks();
})()



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
function playColor(colorIn) {
    const panel = document.getElementById(colorIn);
    panel.style.boxShadow = `0 0 15px 5px #fff, 0 0 30px 25px ${colorIn}, 0 0 30px 15px #0ff`;
    
    console.log("playColor ", panel);
}
function endColor(colorIn) {
    const panel = document.getElementById(colorIn);
    panel.style.boxShadow = ``;
    
    console.log("endColor ", panel);
}
 




let counter = 0;
function start(counter){
    if(counter < colorSequence.length){
      setTimeout(function(){
        counter++;
        console.log(counter);
        start(counter);
      }, 1000);
    }
}
start(0);
function getUserClicks() {

}