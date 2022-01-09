// handle the window onload event
export function handleOnLoad() {
  // Importing these will execute all the js in each file
  // which will init the audio file and mic funcitonality

  import("./file-audio/audio.js").then((initFileUpload) => {
    console.log("file audio init");
  });

  import("./mic-audio/microphone.js").then((initMicAudio) => {
    console.log("mic audio init");
  });
}
