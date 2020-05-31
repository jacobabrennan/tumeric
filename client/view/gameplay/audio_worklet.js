let total = 0;
//------------------------------------------------
class RelayProcessor extends AudioWorkletProcessor {
    constructor() {
        super(...arguments);
        this.port.onmessage = (eventMessage) => {
            if(this.audioSnippet) {
                this.audioSnippet.append(eventMessage.data);
                return;
            }
            this.audioSnippet = new AudioSnippet(eventMessage.data);
        }
        this.d = 0;
    }
    process (inputs, outputs, parameters) {
        // Do nothing when inputs aren't ready
        const firstInput = inputs[0];
        if(!firstInput || firstInput.length < 1) {
            return false;
        }
        //
        this.port.postMessage(firstInput);
        //
        while(this.audioSnippet && this.audioSnippet.exhausted) {
            this.audioSnippet = this.audioSnippet.next();
        }
        if(!this.audioSnippet) { return;}
        //
        const output = outputs[0];
        // for(let indexChannel = 0; indexChannel < 2; indexChannel++) {
        //     const channelOutput = output[indexChannel];
        for(let indexSample = 0; indexSample < 128; indexSample++) {
            const [sample0, sample1] = this.audioSnippet.getSample();
            output[0][indexSample] = sample0;
            output[1][indexSample] = sample1;
        }
        return true;
    }
}
  
registerProcessor('relay-processor', RelayProcessor);

//------------------------------------------------
class AudioSnippet {
    constructor(channelData) {
        this.channelData = channelData;
        this.indexCurrent = 0;
    }
    next() {
        return this.nextSnippet;
    }
    append(channelData) {
        if(this.nextSnippet) {
            return this.nextSnippet.append(channelData);
        }
        return this.nextSnippet = new AudioSnippet(channelData);
    }
    getSample() {
        let indexSample = this.indexCurrent;
        this.indexCurrent++;
        //
        if(indexSample < 128) {
            return [
                this.channelData[0][indexSample],
                this.channelData[1][indexSample],
            ];
        }
        //
        this.exhausted = true;
        if(!this.nextSnippet) {
            // console.log('exhausted')
            return [0, 0];
        }
        //
        return this.nextSnippet.getSample();
    }
}
