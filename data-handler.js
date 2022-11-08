//Initialize SupaBase
const { createClient } = supabase;
const supabaseUrl = 'https://srhvetdcccijazdjhwnk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyaHZldGRjY2NpamF6ZGpod25rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc4MTQ2NzgsImV4cCI6MTk4MzM5MDY3OH0.I2m0Nbhpfw6YyoV3UB1nk6ZlrSTR5bTnJf9kgFFtZ0M';
const _supabase = createClient(supabaseUrl, supabaseKey);
const data_refresh_interval = 10000; //enter value in milisecs

localData = null;

// Call function to push everything inside the form
async function pushReport() {
    //Only push if allowed to submit!
    var _d = new Date;

    //Submit data if allowed
    if (allowSubmit) {
        const { data, error } = await _supabase
            .from('reports')
            .insert([{
                id: Date.now(),
                created_at: _d,
                wing: wingValue,
                floor: floorValue,
                description: descInput.value,
                name: nameInput.value == "" ? "Anonymous" : nameInput.value
            }]).select()

        // Error Handling
        if (error) {
            console.log(error);
        }

        // Success!
        if (data) {
            console.log("pushed successfully")
            console.log(data);

            pullReports();  //Update local copy again
            closeForm();
        }
    }
}
submitBtn.addEventListener("click", pushReport);

//Pulls Data from the database
async function pullReports() {
    // Fetch Table
    const { data, error } = await _supabase
        .from('reports')
        .select()
        .order('id', { ascending: false })

    // Catch error
    if (error) { alert("Can't retrieve reports! Contact Om") }
    if (data) { localData = data; loadReports(); };
}
pullReports();

// reloads reports into UI
function loadReports() {

    //Empty everything
    wingA.innerHTML = '';
    wingB.innerHTML = '';
    wingC.innerHTML = '';
    wingD.innerHTML = '';

    //iterate through and repopulate
    for (var report of localData) {
        var toPush = `<img onclick="updateInfoCard(this)" src="assets/rat.png" alt="" class="ratImage" data-floor="${report.floor}" data-time="${report.created_at}" data-desc="${report.description}" data-name="${report.name}"/>`
        var target_column;

        //Determine which column to push under
        if (report.wing == "A") target_column = wingA;
        if (report.wing == "B") target_column = wingB;
        if (report.wing == "C") target_column = wingC;
        if (report.wing == "D") target_column = wingD;

        target_column.innerHTML += toPush;  //Append
    }
}

// Data Auto Reload Loop
function pullReportsLoop() {
    console.log('data refreshed!');
    setTimeout(pullReportsLoop, data_refresh_interval);
    pullReports();
}
setTimeout(pullReportsLoop, data_refresh_interval);