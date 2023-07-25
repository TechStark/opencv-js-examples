export async function getOpenCv() {
  const cv = await import("@techstark/opencv-js");
  // for development
  window.cv = cv;
  return cv;
}
