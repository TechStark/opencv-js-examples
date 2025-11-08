import { getOpenCv } from "./opencv";

export async function loadDataFile(fileName, url) {
  const { cv } = await getOpenCv();
  // see https://docs.opencv.org/master/utils.js
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const data = new Uint8Array(buffer);
  cv.FS_createDataFile("/", fileName, data, true, false, false);
}
