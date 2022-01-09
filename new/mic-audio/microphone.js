let audioCtx;

export function createtMic() {
  const getMicInput = () => {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: true,
        autoGainControl: true,
        latency: 0,
      },
      video: false,
    });
  };

  async function setUpMicAudioContent() {
    const micStream = audioCtx.createMediaStreamSource(micInput);
    micStream.connect(gainNode);
    oscillator.start();
  }

  const handleMicStart = async (setAudioCtxState) => {
    // create web audio api context
    AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    const micAudioInput = await getMicInput();

    const source = audioCtx.createMediaStreamSource(micAudioInput);
    source.connect(audioCtx.destination);

    setAudioCtxState("running");

    // report the state of the audio context to the
    // console, when it changes
    audioCtx.onstatechange = function () {
      console.log(audioCtx.state);
    };
  };

  const handleMicStop = () => {
    if (audioCtx) {
      console.log(audioCtx.state);

      if (audioCtx.state !== "closed") {
        audioCtx.close().then(function () {
          console.log("Mic Audio context is now closed.");
          setAudioCtxState("closed");
        });
      }
    }
    console.warn("Mic Audio context DNE");
  };

  const handleMicSuspend = () => {
    if (audioCtx?.state === "running") {
      audioCtx.suspend().then(function () {
        console.log("Mic Audio context is now suspended.");
        setAudioCtxState("suspended");
      });
    } else if (audioCtx?.state === "suspended") {
      audioCtx.resume().then(function () {
        console.log("Mic Audio context is now resumed.");
        setAudioCtxState("running");
      });
    }
  };

  // get a reference to a div with an id of "mic"
  const mic = document.getElementById("mic");

  // create a button to start the mic
  const startMicButton = document.createElement("button");
  startMicButton.innerText = "Start Mic";
  startMicButton.addEventListener("click", handleMicStart);

  // append the button to the div
  mic.appendChild(startMicButton);

  // create a button to stop the mic and append it to the DOM
  const stopMicButton = document.createElement("button");
  stopMicButton.innerText = "Stop Mic";
  stopMicButton.addEventListener("click", handleMicStop);
  mic.appendChild(stopMicButton);

  // create a button to pause the mic and append it to the DOM
  const suspendMicButton = document.createElement("button");
  suspendMicButton.innerText = "Suspend Mic";
  suspendMicButton.addEventListener("click", handleMicSuspend);
  mic.appendChild(suspendMicButton);
}

// analyser, bufferLength, dataArray
