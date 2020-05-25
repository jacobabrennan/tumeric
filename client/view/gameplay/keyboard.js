

//== Keyboard ==================================================================

//-- Dependencies --------------------------------
import {
    ACTION_KEY_DOWN,
    ACTION_KEY_UP,
    dataSend,
} from './network.js';

//-- Constants -----------------------------------
// note canonical (lowercase) representation
export const KEY_ARROW_UP = 'arrowup';
export const KEY_ARROW_DOWN = 'arrowdown';
export const KEY_ARROW_RIGHT = 'arrowright';
export const KEY_ARROW_LEFT = 'arrowleft';

//-- These should be elsewhere -------------------
const NORTH = 1;
const SOUTH = 2;
const EAST = 4;
const WEST = 8;

//-- Key Mapping ---------------------------------
// this should be reversed and placed into user editable preferences
const keyMap = {
    [KEY_ARROW_UP]: NORTH,
    [KEY_ARROW_DOWN]: SOUTH,
    [KEY_ARROW_RIGHT]: EAST,
    [KEY_ARROW_LEFT]: WEST,
};

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

//-- Keyboard state change handlers --------------
function handleKeyDown(key) {
    key = key.toLowerCase();
    const command = keyMap[key];
    if(!command) { return;}
    dataSend(ACTION_KEY_DOWN, command);
}
function handleKeyUp(key) {
    key = key.toLowerCase();
    const command = keyMap[key];
    if(!command) { return;}
    dataSend(ACTION_KEY_UP, command);
}
