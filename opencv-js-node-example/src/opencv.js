const cv = require("@techstark/opencv-js");

async function loadOpenCv() {
  return new Promise((resolve) => {
    cv.onRuntimeInitialized = () => {
      console.log("OpenCV.js is ready!");
      resolve();
    };
  });
}

async function getOpenCv() {
  await loadOpenCv();
  return { cv };
  // this does not work
  // return cv;
}

exports.getOpenCv = getOpenCv;
