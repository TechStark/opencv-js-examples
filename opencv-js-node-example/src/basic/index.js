const cv = require("@techstark/opencv-js");

cv.onRuntimeInitialized = () => {
  console.log("OpenCV.js is ready!");
  // You can now use OpenCV functions here
  console.log(cv.getBuildInformation());
};
