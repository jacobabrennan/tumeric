

//== Keyboard ==================================================================

//-- Dependencies --------------------------------

//-- Constants -----------------------------------
export const KEY_ARROW_UP = 'ArrowUp';
export const KEY_ARROW_DOWN = 'ArrowDown';
export const KEY_ARROW_RIGHT = 'ArrowRight';
export const KEY_ARROW_LEFT = 'ArrowLeft';

//-- Module State --------------------------------
const keyState = {};
let keyHandlers = {};

//-- Setup ---------------------------------------
export async function setup(container) {
    function handleEventKeyDown(eventKeyDown) {
        handleKeyDown(eventKeyDown.key.toLowerCase());
    }
    function handleEventKeyUp(eventKeyUp) {
        handleKeyUp(eventKeyUp.key.toLowerCase());
    }
    container.addEventListener('keydown', handleEventKeyDown);
    container.addEventListener('keyup'  , handleEventKeyUp  );
}

//-- Key Management ------------------------------
export function keyCheck(key) {
    // enforce canonical key representation
    key = key.toLowerCase();
    // check key state
    if(!keyState[key]){
        return false;
    }
    return true;
}
export function registerKeyHandler(key, handler) {
    // enforce canonical key representation
    key = key.toLowerCase();
    // Set handler
    keyHandlers[key] = handler;
}
export function cancelKeyHandler(key) {
    // enforce canonical key representation
    key = key.toLowerCase();
    // Delete handler
    delete keyHandlers[key];
}
export function flushKeyHandlers() {
    keyHandlers = {};
}

//-- Keyboard state change handlers --------------
function handleKeyDown(key) {
    // Set keyState
    keyState[key] = true;
    // trigger key handler
    const keyHandler = keyHandlers[key]
    if(!keyHandler) { return;}
    keyHandler(key);
}
function handleKeyUp(key) {
    delete keyState[key];
}
