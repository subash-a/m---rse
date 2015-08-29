var audioCtx = new AudioContext();
var dotBufferArray, dashBufferArray, dotBuffer, dashBuffer, emptyBuffer, emptyBufferArray;

function createAudioSnippets() {
	dotBufferArray = new ArrayBuffer(audioCtx.sampleRate);
	dashBufferArray = new ArrayBuffer(audioCtx.sampleRate*2);
	emptyBufferArray = new ArrayBuffer(audioCtx.sampleRate);
	dotBuffer = new Float32Array(dotBufferArray);
	dashBuffer = new Float32Array(dashBufferArray);
	emptyBuffer = new Float32Array(emptyBufferArray);

	for(k = 2756; k < 8268; k = k + 8) {
		dotBuffer[k] = 0.2;
	}

	for(i = 5512; i < 16537; i = i + 8) {
		dashBuffer[i] = 0.2;
	}

	Object.keys(morsecode.code).map(function(c) {
		var morseArray = morsecode.code[c].string.split("");
		morsecode.code[" "].audio = [emptyBuffer];
		var audioArray = morseArray.map(function(code) {
			if(code === ".") {
				return dotBuffer;
			}
			else if(code === "-") {
				return dashBuffer;
			}
		});
		morsecode.code[c].audio = audioArray;
	});
}

function createMorse(text) {
	var finalAudioClip = [];
	createAudioSnippets();
	var textArray = text.split("");
	textArray.map(function(d) {
		var audioClip = morsecode.code[d.toUpperCase()].audio;
		finalAudioClip = finalAudioClip.concat(audioClip).concat([emptyBuffer]);
	});

	var frameCount = audioCtx.sampleRate * finalAudioClip.length;
	var morseBuffer = audioCtx.createBuffer(1, frameCount, audioCtx.sampleRate);

	var channel0 = morseBuffer.getChannelData(0);


	var m = 0;
	finalAudioClip.forEach(function(clip){
		channel0.set(clip,m);
		m = m + 44100;
	});
	// channel0.set(dotBuffer,m);
	// m = m + 44100;
	// channel0.set(dashBuffer,m);
	// m = m + 44100;
	// channel0.set(dotBuffer, m);
	var bufferSource = audioCtx.createBufferSource();
	bufferSource.buffer = morseBuffer;
	bufferSource.connect(audioCtx.destination);
	bufferSource.start();
}
