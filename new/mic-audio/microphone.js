export const initMic = () => {
  const audioContext = new AudioContext();

  console.log("audio is starting up ...");

  const BUFF_SIZE_RENDERER = 16384;

  const audioInput = null;
  const micStream = null;
  const gainNode = null;
  const scriptProcessorNode = null;
  const scriptProcessorAnalysisNode = null;
  const analyserNode = null;

  if (!navigator.getUserMedia)
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia(
      { audio: true },
      function (stream) {
        startMic(stream);
      },
      (e) => console.error("Error capturing audio.")
    );
  } else {
    console.error("getUserMedia not supported in this browser.");
  }

  function startMic(stream) {
    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);

    micStream = audioContext.createMediaStreamSource(stream);
    micStream.connect(gainNode);

    scriptProcessorNode = audioContext.createScriptProcessor(
      BUFF_SIZE_RENDERER,
      1,
      1
    );

    micStream.connect(scriptProcessorNode);

    // pause the stream
    micStream.mediaStream.getAudioTracks()[0].enabled = false;

    document.getElementById("volume").addEventListener("change", function () {
      var curr_volume = this.value;
      gainNode.gain.value = curr_volume;
    });

    scriptProcessorAnalysisNode = audioContext.createScriptProcessor(
      2048,
      1,
      1
    );

    scriptProcessorAnalysisNode.connect(gainNode);

    analyserNode = audioContext.createAnalyser();
    analyserNode.smoothingTimeConstant = 0;
    analyserNode.fftSize = 2048;

    micStream.connect(analyserNode);

    analyserNode.connect(scriptProcessorAnalysisNode);

    var buffer_length = analyserNode.frequencyBinCount;

    var array_freq_domain = new Uint8Array(buffer_length);
    var array_time_domain = new Uint8Array(buffer_length);

    scriptProcessorAnalysisNode.onaudioprocess = function () {
      // get the average for the first channel
      analyserNode.getByteFrequencyData(array_freq_domain);
      analyserNode.getByteTimeDomainData(array_time_domain);

      // console.log(array_freq_domain);
    };

    // get ref to a div with the id of mic
    var microphone_element = document.getElementById("mic");

    // create a button to start/stop the stream and append it to the DOM
    var button = document.createElement("button");
    button.innerHTML = "Start";
    button.onclick = function () {
      if (micStream.mediaStream.getAudioTracks()[0].enabled === false) {
        micStream.mediaStream.getAudioTracks()[0].enabled = true;
        button.innerHTML = "Stop";
        console.log(micStream.mediaStream.getAudioTracks());
      } else {
        micStream.mediaStream.getAudioTracks()[0].enabled = false;
        button.innerHTML = "Start";
        console.log(micStream.mediaStream.getAudioTracks());
      }
    };
    microphone_element.appendChild(button);
  }
};
