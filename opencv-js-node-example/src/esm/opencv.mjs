import cvReadyPromise from "@techstark/opencv-js";

async function loadOpenCv_4_10() {
  const cv = cvReadyPromise;
  return new Promise((resolve) => {
    cv.onRuntimeInitialized = () => {
      console.log("OpenCV.js is ready!");
      resolve({ cv });
    };
  });
}

async function loadOpenCv_4_11() {
  const cv = await cvReadyPromise;
  console.log("OpenCV.js is ready!");
  return { cv };
}

export async function getOpenCv() {
  return loadOpenCv_4_10();
  // return loadOpenCv_4_11();
}
