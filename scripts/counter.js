"use strict";
const counterValue = document.getElementById("counter__value");
const counterDecrement = document.getElementById("counter__decrement");
const counterIncrement = document.getElementById("counter__increment");
const counterForm = document.getElementById("counter__form");
const counterFormIncrementorInput = counterForm.incrementor;
let incrementor = 1;
counterDecrement.addEventListener("click", () => {
    counterValue.innerText = (+counterValue.innerText - incrementor).toString();
});
counterIncrement.addEventListener("click", () => {
    counterValue.innerText = (+counterValue.innerText + incrementor).toString();
});
counterForm.addEventListener("submit", event => {
    event.preventDefault();
    incrementor = +counterFormIncrementorInput.value;
});
