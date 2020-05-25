

//==============================================================================

//-- Dependencies --------------------------------
import view, { ID_VIEW_GAMEPLAY } from '../index.js';
import * as keyboard from './keyboard.js';

//-- Constants -----------------------------------
const TAG_CANVAS = 'canvas';
const CANVAS_WIDTH = 256;
const CANVAS_HEIGHT = Math.floor(CANVAS_WIDTH * (9/16));

//------------------------------------------------
export default Object.assign(Object.create(view), {
    elementId: ID_VIEW_GAMEPLAY,
    async configure(configuration) {
        const container = document.getElementById(this.elementId);
        const canvas = document.createElement(TAG_CANVAS);
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        canvas.style.background = 'blue'
        container.appendChild(canvas);
        await keyboard.setup(document.body);
    }
});
