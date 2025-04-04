const { getOpenCv } = require("./opencv.js");

async function main() {
  const { cv } = await getOpenCv();
  console.log(cv.getBuildInformation());
}

main();
