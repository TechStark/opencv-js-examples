import cvReadyPromise from "@techstark/opencv-js";

let cvInstance = null;

export async function getOpenCv() {
  if (!cvInstance) {
    cvInstance = await cvReadyPromise;
  }
  return { cv: cvInstance };
}

export function translateException(cv, err) {
  if (typeof err === "number") {
    try {
      const exception = cv.exceptionFromPtr(err);
      return exception;
    } catch (_error) {
      // ignore
    }
  }
  return err;
}
