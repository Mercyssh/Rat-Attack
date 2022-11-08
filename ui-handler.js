// Grab handles
// Buttons
var reportBtn = document.querySelector("#reportBtn");
var cancelBtn = document.querySelector("#cancelBtn");
var submitBtn = document.querySelector("#submitBtn");

// Input Fields
var nameInput = document.querySelector("#nameInput");
var descInput = document.querySelector("#descInput");
var wingInputs = document.querySelectorAll(".wingBtn");
var floorInputs = document.querySelectorAll(".floorBtn");

// others
var reportForm = document.querySelector("#reportForm");

//Info Cards
var ratInfo = document.querySelector("#ratInfo");
var floor = document.querySelector("#floor");
var description = document.querySelector("#description");
var reporter = document.querySelector("#reporter");

//Grid
var wingA = document.querySelector("#wingA");
var wingB = document.querySelector("#wingB");
var wingC = document.querySelector("#wingC");
var wingD = document.querySelector("#wingD");

//FORM VALUE TRACKERS
var wingValue = null;
var floorValue = null;
var allowSubmit = false;

//####INFO CARDS###########
function updateInfoCard(ele) {
    ratInfo.classList.remove("hideInfo");   // Unhide info card

    var _floor = ele.getAttribute("data-floor");    // what floor it on?
    var _description = ele.getAttribute("data-desc");   // description of report
    var _name = ele.getAttribute("data-name");  // Name of rat reporter
    var _time = ele.getAttribute("data-time");    //time of report

    //Time Info
    let te = dayjs(_time);
    var timeString = te.utc().fromNow();

    //Update Floor info
    if (_floor == "1") { floor.innerHTML = "1st Floor" };
    if (_floor == "2") { floor.innerHTML = "2nd Floor" };
    if (_floor == "3") { floor.innerHTML = "3rd Floor" };
    if (_floor == "4") { floor.innerHTML = "4th Floor" };

    //Update Description and Name
    description.innerHTML = _description;
    reporter.innerHTML = "By " + _name;
    timeString.innerHTML = timeString;

    //Highlight selected rat
    ele.classList.add("selected-rat");

}
//#########################


//###OPEN AND CLOSE FORM###
function openForm() {
    reportForm.classList.add("show");
}
function closeForm() {
    reportForm.classList.remove("show");

    //Reset all backend trackers
    wingValue = null;
    floorValue = null;
    allowSubmit = false;

    //Reset all UI
    for (var item of wingInputs) { item.classList.remove("selected") }
    for (var item of floorInputs) { item.classList.remove("selected") }
    nameInput.value = "";
    descInput.value = "";

    handleSubmitBtn();
}
reportBtn.addEventListener("click", openForm);
cancelBtn.addEventListener("click", closeForm);
//#########################


//#######INPUT VALIDATION######
//run whenever you want to validate
function validateInput(eve) {
    var ele = eve.target;   //Cache element
    var value = ele.value;  //Cache value

    var length = value.length;
    var max_length = ele.getAttribute("maxlength");

    var counter = ele.parentElement.querySelector(".counter");

    //Update counter UI
    counter.innerHTML = + (length) + "/" + max_length;
    handleSubmitBtn();
}
function handleSubmitBtn() {
    allowSubmit = true;   //Start off assuming its correct
    if (nameInput.value == null || descInput.value == "" || wingValue == null || floorValue == null)
        allowSubmit = false;  //disable flag

    //Add to btn classlist
    if (!allowSubmit) submitBtn.classList.add("btn-off");
    else submitBtn.classList.remove("btn-off");
}
// Attach event handlers
nameInput.addEventListener("keydown", validateInput)
nameInput.addEventListener("keyup", validateInput)
descInput.addEventListener("keydown", validateInput)
descInput.addEventListener("keyup", validateInput)
//#############################


//###########WING INPUT####
function updateWingInput(evt) {
    var btn = evt.target;   //Get reference to btn pressed
    var value = btn.getAttribute("data-value"); //cache

    // Unhighlight all wing btns
    for (var input of wingInputs) {
        input.classList.remove("selected");
    }

    // Highlight the current one
    btn.classList.add("selected");
    wingValue = value;  //Save value

    handleSubmitBtn();
}
//Attach Event handlers
for (var input of wingInputs) { input.addEventListener("click", updateWingInput); }
//#########################


//#########FLOOR INPUT#####
// Update the floorInputs
function updateFloorInput(evt) {
    var btn = evt.target;   //Get reference to btn pressed
    var value = btn.getAttribute("data-value"); //cache

    // Unhighlight all wing btns
    for (var input of floorInputs) {
        input.classList.remove("selected");
    }

    // Highlight the current one
    btn.classList.add("selected");
    floorValue = value;  //Save value
    handleSubmitBtn();
}
//Attach Event Handlers
for (var input of floorInputs) { input.addEventListener("click", updateFloorInput); }
//#########################