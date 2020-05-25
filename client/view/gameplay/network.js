

//==============================================================================

//-- Dependencies --------------------------------
import networking from '../../networking/index.js';

//-- Constants -----------------------------------
export const ACTION_KEY_DOWN = 'keyDown';
export const ACTION_KEY_UP = 'keyUp';

//------------------------------------------------
export function dataSend(action, data) {
    const gameMessage = {
        action: action,
        data: data,
    };
    networking.send(gameMessage);
}
export function dataReceive(action, data) {

}
