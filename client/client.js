

//==============================================================================

//-- Dependencies --------------------------------
import viewLoading from './view/loading/index.js';
import viewLogin from './view/login/index.js';
import viewGameplay from './view/gameplay/index.js';
import resourceLibrary from './resource_library/index.js';
import networking from './networking/index.js';

//-- Constants -----------------------------------

//------------------------------------------------
export default {
    async configure(configuration) {
        this.viewSwitch(viewLoading);
        await resourceLibrary.configure(configuration);
        await networking.configure(configuration);
        this.viewSwitch(viewLogin);
    },
    viewSwitch(viewNew) {
        if(this.viewCurrent) {
            this.viewCurrent.blur();
        }
        this.viewCurrent = viewNew;
        this.viewCurrent.focus();
    }
};
