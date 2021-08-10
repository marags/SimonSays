


const topLeft = document.getElementById("topLeft");
let topLeftGlow = false;

document.addEventListener("click", function() {
    console.log("HERE")
    if(topLeftGlow) {
        topLeft.classList.remove("topLeftGlow");
        topLeftGlow = false;
    }
    else 
    {
        topLeft.classList.add("topLeftGlow");
        topLeftGlow = true;
    }
        

});