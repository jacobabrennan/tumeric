

//==============================================================================

//-- Dependencies --------------------------------
import networking from '../../networking/index.js';
import gameplay from './index.js';

//-- Constants -----------------------------------
export const ACTION_KEY_DOWN = 'keyDown';
export const ACTION_KEY_UP = 'keyUp';
export const ACTION_AUDIO_BUFFER = 'audioBuffer';

//------------------------------------------------
export function dataSend(action, data) {
    const gameMessage = {
        action: action,
        data: data,
    };
    networking.send(gameMessage);
}
export function dataReceive(action, data) {
    switch(action) {
        case ACTION_AUDIO_BUFFER:
            gameplay.audioPort.postMessage(data);
            break;
    }
}
