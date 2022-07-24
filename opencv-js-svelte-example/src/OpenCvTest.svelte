<script lang="ts">
  import cv from "@techstark/opencv-js";

  let buildInfo: string = "";

  window.setTimeout(() => {
    (window as any).cv = cv;
    buildInfo = cv.getBuildInformation();
  }, 1000);
</script>

<h1>opencv.js build information</h1>
<textarea class="build-info">
  {buildInfo}
</textarea>

<style>
  .build-info {
    width: 600px;
    height: 400px;
  }
</style>
