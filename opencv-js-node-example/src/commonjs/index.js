const { getOpenCv } = require("./opencv.js");

async function main() {
  const { cv } = await getOpenCv();
  console.log("OpenCV.js is ready!");
  console.log(cv.getBuildInformation());
}

main();
