

//==============================================================================

//-- Dependencies --------------------------------
import resourceLibrary from './resource_library/index.js';
import networking from './networking/index.js';
import login from './login/index.js';
import gameplay from './gameplay/index.js';

//------------------------------------------------
export default {
    async configure(configuration) {
        await resourceLibrary.configure();
        await networking.configure();
        await login.configure();
        await gameplay.configure();
    }
};
