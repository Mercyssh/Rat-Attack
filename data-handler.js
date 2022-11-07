//Initialize SupaBase
const { createClient } = supabase;
const supabaseUrl = 'https://srhvetdcccijazdjhwnk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyaHZldGRjY2NpamF6ZGpod25rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc4MTQ2NzgsImV4cCI6MTk4MzM5MDY3OH0.I2m0Nbhpfw6YyoV3UB1nk6ZlrSTR5bTnJf9kgFFtZ0M';
const _supabase = createClient(supabaseUrl, supabaseKey);

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
                name: nameInput.value
            }]).select()

        // Fail :(
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

    // Catch error
    if (error) { alert("Can't retrieve reports! Contact Om") }
    if (data) { console.log(data); localData = data };
}
pullReports();

// loads reports into UI
function loadReports() {

}