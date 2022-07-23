<script lang="ts">
  import * as CV from "@techstark/opencv-js";

  let buildInfo: string = "";

  window.setTimeout(() => {
    buildInfo = CV.getBuildInformation();
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
