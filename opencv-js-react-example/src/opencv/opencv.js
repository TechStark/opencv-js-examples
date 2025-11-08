import cvModule from "@techstark/opencv-js";

export async function getOpenCv() {
  let cv;
  if (cvModule instanceof Promise) {
    cv = await cvModule;
  } else {
    if (cvModule.Mat) {
      // already initialized
      cv = cvModule;
    } else {
      await new Promise((resolve) => {
        cvModule.onRuntimeInitialized = () => resolve();
      });
      cv = cvModule;
    }
  }
  return { cv };
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
