import { Component } from '@angular/core';
import * as cv from '@techstark/opencv-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'opencv-js-angular-example';
  buildInfo = '';

  constructor() {
    setTimeout(() => {
      (window as any).cv = cv;
      this.buildInfo = cv.getBuildInformation();
    }, 1_000);
  }
}
