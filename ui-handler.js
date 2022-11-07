// Grab handles
// Buttons
var reportBtn = document.querySelector("#reportBtn");
var cancelBtn = document.querySelector("#cancelBtn");
var submitBtn = document.querySelector("submitBtn");

// Input Fields
var nameInput = document.querySelector(".nameInput input");
var descInput = document.querySelector(".descInput textarea");

// others
var reportForm = document.querySelector("#reportForm");

// Open & Close Buttons : Attach Event Handlers
function openForm() {
    reportForm.classList.add("show");
}
function closeForm() {
    reportForm.classList.remove("show");
}
reportBtn.addEventListener("click", openForm);
cancelBtn.addEventListener("click", closeForm);

