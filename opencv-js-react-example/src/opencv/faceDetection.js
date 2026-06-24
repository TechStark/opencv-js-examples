import { loadDataFile } from "./cvDataFile";

const MODEL_FILE = "face_detection_yunet_2023mar.onnx";
const MODEL_URL = "models/face_detection_yunet_2023mar.onnx";

let modelsLoaded = false;
export async function loadFaceModels() {
  if (modelsLoaded) {
    return;
  }
  modelsLoaded = true;
  console.log("=======start downloading YuNet face detection model=======");
  await loadDataFile(MODEL_FILE, MODEL_URL);
  console.log("=======downloaded YuNet face detection model=======");
}

/**
 * Detect faces from the input image using FaceDetectorYN (YuNet).
 * Replaces the removed CascadeClassifier in OpenCV 5.x.
 * @param {object} cv OpenCV instance
 * @param {cv.Mat} img Input image (RGBA from cv.imread)
 * @returns a new image with detected faces drawn on it.
 */
export function detectFace(cv, img) {
  const newImg = img.clone();
  const { width, height } = newImg.size();

  // FaceDetectorYN expects BGR input
  const bgr = new cv.Mat();
  cv.cvtColor(newImg, bgr, cv.COLOR_RGBA2BGR);

  const detector = new cv.FaceDetectorYN(
    MODEL_FILE,
    "",
    new cv.Size(width, height),
    0.6,  // score threshold
    0.3,  // nms threshold
    5000  // top k
  );

  const faces = new cv.Mat();
  detector.detect(bgr, faces);

  for (let i = 0; i < faces.rows; i++) {
    const x = Math.round(faces.floatAt(i, 0));
    const y = Math.round(faces.floatAt(i, 1));
    const w = Math.round(faces.floatAt(i, 2));
    const h = Math.round(faces.floatAt(i, 3));

    const pt1 = new cv.Point(x, y);
    const pt2 = new cv.Point(x + w, y + h);
    cv.rectangle(newImg, pt1, pt2, [255, 0, 0, 255], 2);

    // Draw 5 landmarks: right eye, left eye, nose, mouth-right, mouth-left
    const landmarkColors = [
      [255, 0, 0, 255],   // right eye — blue
      [0, 0, 255, 255],   // left eye  — red
      [0, 255, 0, 255],   // nose      — green
      [255, 0, 255, 255], // mouth-r   — magenta
      [0, 255, 255, 255], // mouth-l   — yellow
    ];
    for (let k = 0; k < 5; k++) {
      const lx = Math.round(faces.floatAt(i, 4 + k * 2));
      const ly = Math.round(faces.floatAt(i, 4 + k * 2 + 1));
      cv.circle(newImg, new cv.Point(lx, ly), 2, landmarkColors[k], -1);
    }
  }

  bgr.delete();
  faces.delete();
  detector.delete();

  return newImg;
}
