$(() => {
  let video = document.querySelector("#video-element");
  let videoDevices = [];
  let currentDeviceIndex = 0;
  let currentStream = null;
  let facingFrontCamera = true;
  let pictureDimension = 350;

  let modalPicture;
  let canvasPicture;
  let imgPicture;
  let fileInputPicture;
  let crop = null;

  canvasPicture = $('#profile-picture-canvas')[0];
  modalPicture = $('#pictureModal');
  imgPicture = $('#profile-picture');
  fileInputPicture = $('#profile-picture-input');

  setTimeout(() => {
    crop = new Croppie(imgPicture[0], {
      viewport: {
          width: pictureDimension,
          height: pictureDimension
      }
    });
  }, 250);

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

  function takePicture() {
    modalPicture.find('.modal-content')[0].scrollTop = 0;
    const context = canvasPicture.getContext('2d');
    canvasPicture.setAttribute('width', video.videoWidth);
    canvasPicture.setAttribute('height', video.videoHeight);
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const imageData = canvasPicture.toDataURL('image/png');

    updateCropImage(imageData);
  }

  function updateCropImage(image) {
    crop.bind({
      url: image
    });
  }

  fileInputPicture.on('change', (e) => {
    const input = e.currentTarget;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateCropImage(e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  });

  $('#picture-save-btn').click(() => {
    crop.result({ type: 'blob', format: 'jpeg', quality: 0.75 })
      .then(imageData => {
        pictureBlob = imageData;
        modalPicture.modal('hide');
      })
      .catch(err => {
        console.error(err);
      });
  });

  $('#toggle-video-btn').click(() => {
    currentDeviceIndex = (currentDeviceIndex + 1) % videoDevices.length;
    facingFrontCamera = !facingFrontCamera;
    loadVideoStream(videoDevices[currentDeviceIndex]);
    video.scrollIntoView(true);
  });

  $('#take-picture-btn').click(takePicture);

  modalPicture
    .on('hide.bs.modal', () => {
      video.pause();
      video.src = '';
      video.srcObject = null;
      if (currentStream) currentStream.getTracks()[0].stop();
    })
    .on('show.bs.modal', () => {
      const pictureValue = modalCharacterForm.find('#characterForm input[name="Picture"]').val();
      if (pictureValue) {
        updateCropImage(pictureValue);
      }
      handleCamera();
    });

    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
      if (e.target.id === 'nav-picture-camera-tab') {
        video.scrollIntoView(true);
      }
    })
})

