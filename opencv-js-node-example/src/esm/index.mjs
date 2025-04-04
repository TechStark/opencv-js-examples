import { getOpenCv } from "./opencv.mjs";

async function main() {
  const { cv } = await getOpenCv();
  console.log(cv.getBuildInformation());
}

main();
