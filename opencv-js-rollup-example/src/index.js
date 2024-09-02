import cv from "@techstark/opencv-js";

window.CV = cv;

cv.onRuntimeInitialized = () => {
  document.getElementById("build-info").value = cv.getBuildInformation();
};
