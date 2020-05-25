

//== Client ====================================================================

//-- Dependencies --------------------------------
import viewLoading from './view/loading.js';
import viewLogin from './view/login.js';
import viewGameplay from './view/gameplay.js';
import resourceLibrary from './resource_library/index.js';
import networking from './networking/index.js';

//-- Constants -----------------------------------

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
        //
        const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true});
        // const trackAudio = mediaStream.getAudioTracks()[0];
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
    }
};
