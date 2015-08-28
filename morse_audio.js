var audioCtx = new AudioContext();
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

// Linking up nodes together
oscillator.connect(gainNode);

// Playing the oscillator
oscillator.type = "sine";
oscillator.frequency.value = 4500;
oscillator.start();

// Setting volume using gain node
gainNode.gain.value = 0.5;

// disconnecting the audio (turning it off)

function stop() {
	gainNode.disconnect(audioCtx.destination);
}

// connecting the audio to the speaker (turning it on)
function start() {
	gainNode.connect(audioCtx.destination);
}

function createMorse() {
	var morseBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 10, audioCtx.sampleRate);
var frameCount = audioCtx.sampleRate * 10.0;
	var channel0 = morseBuffer.getChannelData(0);
	for(j = 0; j < frameCount; j = j+32) {
channel0[j] = 0.2;
	}
	var bufferSource = audioCtx.createBufferSource();
	bufferSource.buffer = morseBuffer;
	bufferSource.connect(audioCtx.destination);
	bufferSource.start();
var dotBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 1, audioCtx.sampleRate);
var dashBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
var dotBufferArray = new ArrayBuffer(audioCtx.sampleRate/4);
var dashBufferArray = new ArrayBuffer(audioCtx.sampleRate/2);
for(k = 0; k < dotBufferArray.byteLength; k = k + 8) {
	dotBufferArray[k] = 0.2;
}

for(i = 0; i < dashBuffer.byteLength; i = i + 8) {
	dashBufferArray[i] = 0.2;
}
dotBuffer.getChannelData(0).set(dotBufferArray, 11025);
dashBuffer.getChannelData(0).set(dashBufferArray, 22050);
}
