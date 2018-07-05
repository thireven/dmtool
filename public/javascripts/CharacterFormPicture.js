const video = document.querySelector("#videoElement");
let videoDevices = [];
let currentDeviceIndex = 0;
let currentStream = null;
let facingFrontCamera = true;

let modalPicture;
$(() => {
  modalPicture = $('#pictureModal');
  $('#toggle-video-btn').click(() => {
    currentDeviceIndex = (currentDeviceIndex + 1) % videoDevices.length;
    facingFrontCamera = !facingFrontCamera;
    loadVideoStream(videoDevices[currentDeviceIndex]);
  });


  modalPicture
    .on('hide.bs.modal', () => {
      video.pause();
      video.src = '';
      video.srcObject = null;
      currentStream.getTracks()[0].stop();
    })
    .on('show.bs.modal', () => {
      handleCamera();
    })
})

function loadVideoStream(deviceId) {
  if (currentStream) currentStream.getTracks()[0].stop();
  return navigator.mediaDevices.getUserMedia({ video: { deviceId: deviceId, facingMode: facingFrontCamera ? 'user' : 'environment' }})
    .then(function(stream) {
      currentStream = stream;
      video.srcObject = stream;
      video.onloadedmetadata = (e) => {
        video.play();
      };

    })
    .catch(function(err) {
      console.error(err);
    });
}

function handleCamera() {
  if (navigator.mediaDevices.getUserMedia) {
    videoDevices = [];
    // currentDeviceIndex = 0;
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        devices.forEach((device) => {
          if (device.kind === 'videoinput') videoDevices.push(device.deviceId);
        });

        return loadVideoStream(videoDevices[currentDeviceIndex]);
      })
      .catch(function(err) {
        console.error(err);
      });
  }
}