let mediaRecorder;
let recordedChunks = [];

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia();
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };
    mediaRecorder.onstop = () => {
      const recordedBlob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      document.getElementById("recordedVideo").src =
        URL.createObjectURL(recordedBlob);
    };

    mediaRecorder.start();
    document.getElementById("startRecording").disabled = true;
    document.getElementById("stopRecording").disabled = false;
  } catch (error) {
    console.log("Error", error);
  }
};
const stopRecording = () => {
  mediaRecorder.stop();
  document.getElementById("startRecording").disabled = false;
  document.getElementById("stopRecording").disabled = true;
};

document
  .getElementById("startRecording")
  .addEventListener("click", startRecording);
document
  .getElementById("stopRecording")
  .addEventListener("click", stopRecording);
