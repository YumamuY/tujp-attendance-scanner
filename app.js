const videoElement = document.getElementById("camera");

const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");

const cameraStatus = document.getElementById("camera-status");
const cameraPlaceholder = document.getElementById("camera-placeholder");

const resultElement = document.getElementById("scan-result");

let cameraStream = null;

async function startCamera() {

    try {
        cameraStatus.textContent = "Status: requesting camera...";
        
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: {
                    ideal: "environment"
                }
            },
            audio: false
        });

        videoElement.srcObject = cameraStream;

        cameraPlaceholder.hidden = true;

        startButton.disabled = true;
        stopButton.disabled = false;

        cameraStatus.textContent = "Status: camera running";
    } catch (error) {
        console.error("Camera error:", error);

        cameraStatus.textContent = 
            `Status: camera error (${error.name})`;

        resultElement.textContent = 
            "Could not access the camera.";
    }
}

function stopCamera() {

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(track => track.stop());

        cameraStream = null;
    }

    videoElement.srcObject = null;

    cameraPlaceholder.hidden = false;

    startButton.disabled = false;
    stopButton.disabled = true;

    cameraStatus.textContent = "Status: stopped";
}

startButton.addEventListener("click", startCamera);
stopButton.addEventListener("click", stopCamera);