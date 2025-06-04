require("@techstark/opencv-js").then((cv) => {
  console.log("OpenCV.js is ready!");
  // You can now use OpenCV functions here
  console.log(cv.getBuildInformation());
});
