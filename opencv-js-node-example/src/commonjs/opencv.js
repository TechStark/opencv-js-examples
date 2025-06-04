async function loadOpenCv_4_10() {
  const cv = require("@techstark/opencv-js");
  return new Promise((resolve) => {
    cv.onRuntimeInitialized = () => {
      console.log("OpenCV.js is ready!");
      resolve({ cv });
    };
  });
}

async function loadOpenCv_4_11() {
  const cv = await require("@techstark/opencv-js");
  console.log("OpenCV.js is ready!");
  return { cv };
}

async function getOpenCv() {
  return loadOpenCv_4_10();
  // return loadOpenCv_4_11();
}

exports.getOpenCv = getOpenCv;
