const cvModule = require("@techstark/opencv-js");

async function getOpenCv() {
  let cv;
  if (cvModule instanceof Promise) {
    cv = await cvModule;
  } else {
    await new Promise((resolve) => {
      cvModule.onRuntimeInitialized = () => resolve();
    });
    cv = cvModule;
  }
  return { cv };
}

exports.getOpenCv = getOpenCv;
