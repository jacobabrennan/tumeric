

//== Client ====================================================================

//-- Dependencies --------------------------------
import viewLoading from './view/loading.js';
import viewLogin from './view/login.js';
import viewGameplay from './view/gameplay/index.js';
import resourceLibrary from './resource_library/index.js';
import networking from './networking/index.js';

//-- Constants -----------------------------------
// should be defined elsewhere
const ACTION_LOG_IN = 'logIn';

//------------------------------------------------
export default {
    async configure(configuration) {
        // Configure and Display Loading View
        await viewLoading.configure(configuration);
        this.viewSwitch(viewLoading);
        // Configure all other components and views
        await resourceLibrary.configure(configuration);
        await networking.configure(configuration);
        await viewLogin.configure(configuration);
        await viewGameplay.configure(configuration);
        // Display Login Form
        this.viewSwitch(viewLogin);
    },
    viewSwitch(viewNew) {
        if(this.viewCurrent) {
            this.viewCurrent.blur();
        }
        this.viewCurrent = viewNew;
        this.viewCurrent.focus();
    },
    nameSelect(nameNew) {
        this.name = nameNew;
        networking.send({
            action: ACTION_LOG_IN,
            data: nameNew,
        });
    }
};
