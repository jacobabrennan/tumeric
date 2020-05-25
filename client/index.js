

//==============================================================================

//-- Dependencies --------------------------------
import client from "./client.js";

//-- Constants -----------------------------------

//-- Configure Client ----------------------------
const clientConfiguration = {};
client.configure(clientConfiguration).then(handleClientLoaded);

//------------------------------------------------
function handleClientLoaded() {
    // alert('Loaded');
}
