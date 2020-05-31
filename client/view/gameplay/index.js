

//==============================================================================

//-- Dependencies --------------------------------
import view, { ID_VIEW_GAMEPLAY } from '../index.js';
import * as keyboard from './keyboard.js';
import { dataSend, ACTION_AUDIO_BUFFER } from './network.js';

//-- Constants -----------------------------------
const TAG_CANVAS = 'canvas';
const CANVAS_WIDTH = 256;
const CANVAS_HEIGHT = Math.floor(CANVAS_WIDTH * (9/16));
const URL_WORKLET = 'view/gameplay/audio_worklet.js';

//------------------------------------------------
export default Object.assign(Object.create(view), {
    elementId: ID_VIEW_GAMEPLAY,
    async configure(configuration) {
        // Graphics Setup
        await keyboard.setup(document.body);
        //
        const container = document.getElementById(this.elementId);
        const canvas = document.createElement(TAG_CANVAS);
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        canvas.style.background = 'blue'
        container.appendChild(canvas);
        //
        this.context = canvas.getContext('2d');
        // Audio Setup
        const audioContext = new AudioContext();
        //
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        const audioSourceNode = audioContext.createMediaStreamSource(stream);
        //
        await audioContext.audioWorklet.addModule(URL_WORKLET);
        const relayNode = new AudioWorkletNode(audioContext, 'relay-processor');
        relayNode.port.onmessage = (eventMessage) => {
            dataSend(ACTION_AUDIO_BUFFER, eventMessage.data);
        }
        this.audioPort = relayNode.port;
        //
        audioSourceNode.connect(relayNode);
        relayNode.connect(audioContext.destination);
    },
    update(roomData) {
        //
        if(!this.context) { return;}
        //
        this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        for(const particle of roomData.particles) {
            this.context.fillStyle = particle.color;
            this.context.fillRect(particle.x, particle.y, 16, 16);
        }
    },
    audioUpdate(audioData) {
        this.audioPort.postMessage(audioData);
    }
});
