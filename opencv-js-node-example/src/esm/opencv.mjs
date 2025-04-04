import cv from "@techstark/opencv-js";

async function loadOpenCv() {
  return new Promise((resolve) => {
    cv.onRuntimeInitialized = () => {
      console.log("OpenCV.js is ready!");
      resolve();
    };
  });
}

export async function getOpenCv() {
  await loadOpenCv();
  return { cv };
  // this does not work
  // return cv;
}
