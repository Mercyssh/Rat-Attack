// Grab handles
// Buttons
var reportBtn = document.querySelector("#reportBtn");
var cancelBtn = document.querySelector("#cancelBtn");
var submitBtn = document.querySelector("submitBtn");
var wingInputs = document.querySelectorAll(".wingBtn");
var floorInputs = document.querySelectorAll(".floorBtn");

// Input Fields
var nameInput = document.querySelector(".nameInput input");
var descInput = document.querySelector(".descInput textarea");

// others
var reportForm = document.querySelector("#reportForm");


//###OPEN AND CLOSE FORM###
// Open & Close Buttons : Attach Event Handlers
function openForm() {
    reportForm.classList.add("show");
}
function closeForm() {
    reportForm.classList.remove("show");
}
reportBtn.addEventListener("click", openForm);
cancelBtn.addEventListener("click", closeForm);
//#########################


//###########WING INPUT####
// Updates the wingInput when called
function updateWingInput(ele) {

}
//#########################
