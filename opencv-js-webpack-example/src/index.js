import cv from '@techstark/opencv-js';

setTimeout(() => {
  const textarea = document.createElement('textarea');
  textarea.style = 'width:1000px;height:800px;';
  textarea.textContent = cv.getBuildInformation();
  document.getElementById('root').append(textarea);
}, 1000);
