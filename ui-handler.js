// Grab handles
var reportBtn = document.querySelector("#reportBtn");
var cancelBtn = document.querySelector("#cancelBtn");
var submitBtn = document.querySelector("submitBtn");

var reportForm = document.querySelector("#reportForm");



function openForm() {
    reportForm.classList.add("show");
}
function closeForm() {
    reportForm.classList.remove("show");
}
reportBtn.addEventListener("click", openForm);
cancelBtn.addEventListener("click", closeForm);
