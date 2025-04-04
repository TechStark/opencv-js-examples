import { Jimp } from "jimp";
import { getOpenCv } from "./opencv.mjs";

async function main() {
  const { cv } = await getOpenCv();
  console.log(cv.getBuildInformation());

  // convert Lenna.png to gray image
  const jimpSrc = await Jimp.read("Lenna.png");
  const img = cv.matFromImageData(jimpSrc.bitmap);
  const gray = new cv.Mat();
  cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY);

  // save the gray image to disk
  // Note: Jimp does not support grayscale images directly
  // convert gray image to RGBA format for Jimp
  const rgbaGray = new cv.Mat();
  cv.cvtColor(gray, rgbaGray, cv.COLOR_GRAY2RGBA);
  const grayJimp = new Jimp({
    width: gray.cols,
    height: gray.rows,
    data: Buffer.from(rgbaGray.data),
  });
  await grayJimp.write("output.png");
  console.log(`Saved gray image to output.png`);

  // release memory
  img.delete();
  gray.delete();
  rgbaGray.delete();
  console.log("Memory released");
}

main();
