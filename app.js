const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resultElement = document.getElementById("scan-result");

startButton.addEventListener("click", function() {
    resultElement.textContent = "Start button clicked."
});

stopButton.addEventListener("click", function() {
    stopButton.textContent = "Stop button clicked."
})

