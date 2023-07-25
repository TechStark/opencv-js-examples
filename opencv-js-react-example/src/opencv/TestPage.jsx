import React from "react";
import { getOpenCv } from "./loader";
import { loadHaarFaceModels, detectHaarFace } from "./haarFaceDetection";
import "./style.css";

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.inputImgRef = React.createRef();
    this.grayImgRef = React.createRef();
    this.cannyEdgeRef = React.createRef();
    this.haarFaceImgRef = React.createRef();
    this.state = {
      imgUrl: null,
    };
  }

  componentDidMount() {
    loadHaarFaceModels();
  }

  /////////////////////////////////////////
  //
  // process image with opencv.js
  //
  /////////////////////////////////////////
  async processImage(imgSrc) {
    const cv = await getOpenCv();
    const img = cv.imread(imgSrc);

    // to gray scale
    const imgGray = new cv.Mat();
    cv.cvtColor(img, imgGray, cv.COLOR_BGR2GRAY);
    cv.imshow(this.grayImgRef.current, imgGray);

    // detect edges using Canny
    const edges = new cv.Mat();
    cv.Canny(imgGray, edges, 100, 100);
    cv.imshow(this.cannyEdgeRef.current, edges);

    // detect faces using Haar-cascade Detection
    const haarFaces = await detectHaarFace(img);
    cv.imshow(this.haarFaceImgRef.current, haarFaces);

    // need to release them manually
    img.delete();
    imgGray.delete();
    edges.delete();
    haarFaces.delete();
  }

  render() {
    const { imgUrl } = this.state;
    return (
      <div>
        <div style={{ marginTop: "30px" }}>
          <span style={{ marginRight: "10px" }}>Select an image file:</span>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                this.setState({
                  imgUrl: URL.createObjectURL(e.target.files[0]),
                });
              }
            }}
          />
        </div>

        {imgUrl && (
          <div className="images-container">
            <div className="image-card">
              <div style={{ margin: "10px" }}>↓↓↓ The original image ↓↓↓</div>
              <img
                alt="Original input"
                src={imgUrl}
                onLoad={(e) => {
                  this.processImage(e.target);
                }}
              />
            </div>

            <div className="image-card">
              <div style={{ margin: "10px" }}>↓↓↓ The gray scale image ↓↓↓</div>
              <canvas ref={this.grayImgRef} />
            </div>

            <div className="image-card">
              <div style={{ margin: "10px" }}>↓↓↓ Canny Edge Result ↓↓↓</div>
              <canvas ref={this.cannyEdgeRef} />
            </div>

            <div className="image-card">
              <div style={{ margin: "10px" }}>
                ↓↓↓ Haar-cascade Face Detection Result ↓↓↓
              </div>
              <canvas ref={this.haarFaceImgRef} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TestPage;
