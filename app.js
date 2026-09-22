const videoElement = document.getElementById("camera");

const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");

const cameraStatus = document.getElementById("camera-status");
const cameraPlaceholder = document.getElementById("camera-placeholder");

const resultElement = document.getElementById("scan-result");

const codeReader = 
    new ZXingBrowser.BrowserQRCodeReader();

let scannerControls = null;

async function startScanner() {
    
    if (scannerControls) {
        return;
    }

    try {

        cameraStatus.textContent = 
            "Status: starting scanner...";
        
        scannerControls =
            await codeReader.decodeFromConstraints(

                {
                    video: {
                        facingMode: {
                            ideal: "environment"
                        }
                    },

                    audio: false
                },

                videoElement,

                function (result, error) {
                    
                    if (result) {

                        const decodedText = 
                            result.getText();

                        console.log(
                            "QR detected:",
                            decodedText
                        );

                        resultElement.textContent =
                            decodedText;
                    }
                }

            );
        
        cameraPlaceholder.hidden = true;

        startButton.disabled = true;
        stopButton.disabled = false;

        cameraStatus.textContent = 
            "Status: scanning";
    } catch (error) {

        console.error(
            "Scanner error",
            error
        );

        cameraStatus.textContent = 
            `Status: scanner error (${error.name})`;

        scannerControls = null;
    }
}


function stopScanner() {

    if(scannerControls) {

        scannerControls.stop();

        scannerControls = null;
    }

    videoElement.srcObject = null;

    cameraPlaceholder.hidden = false;

    startButton.disabled = false;
    stopButton.disabled = true;

    cameraStatus.textContent = 
        "Status: stopped";
}

startButton.addEventListener(
    "click",
    startScanner
);

stopButton.addEventListener(
    "click",
    stopScanner
);