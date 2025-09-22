const calc = document.querySelector(".calculator")
const display = document.querySelector(".calc-display")
calc.addEventListener("click", function(event) {
    display.innerText = event.target.innerText;
})