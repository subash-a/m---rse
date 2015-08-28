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

	var dotBufferArray = new ArrayBuffer(audioCtx.sampleRate);
	var dashBufferArray = new ArrayBuffer(audioCtx.sampleRate*2);
	var dotBuffer = new Float32Array(dotBufferArray);
	var dashBuffer = new Float32Array(dashBufferArray);

	for(k = 2756; k < 8268; k = k + 8) {
		dotBuffer[k] = 0.2;
	}

	for(i = 5512; i < 16537; i = i + 8) {
		dashBuffer[i] = 0.2;
	}

	var channel0 = morseBuffer.getChannelData(0);
	for(m = 0; m < frameCount; m = m + 44100) {
		channel0.set(dotBuffer,m);
	}
	console.log(channel0);
	console.log(dotBuffer);
	console.log(dashBuffer);

	var bufferSource = audioCtx.createBufferSource();
	bufferSource.buffer = morseBuffer;
	bufferSource.connect(audioCtx.destination);
	bufferSource.start();
}
