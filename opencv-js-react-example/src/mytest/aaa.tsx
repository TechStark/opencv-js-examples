import { time } from 'console';
import React, {useEffect, useRef, useState} from 'react';
import cv from "@techstark/opencv-js";

const cameraSize = { w: 360, h: 240 };
const canvasSize = { w: 360, h: 240 };
const resolution = { w: 1080, h: 720 };


export function Aaa() {

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // const canvasContextRef = useRef<{context: CanvasRenderingContext2D | null}>({context: null}})
  // const ss = useRef<context: CanvasRenderingContext2D>({context: null}})
  const [context,setContext] = useState<CanvasRenderingContext2D>()

  useEffect(()=>{

    if(videoRef.current){
      videoRef.current.id       = 'video';
      videoRef.current.width    = cameraSize.w;
      videoRef.current.height   = cameraSize.h;
      videoRef.current.autoplay = true;
    }



    const media = navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: { ideal: resolution.w },
        height: { ideal: resolution.h }
      }
    }).then(function(stream) {
      if(videoRef.current){
        videoRef.current.srcObject = stream;
      }
    });

    if(canvasRef.current){
      canvasRef.current.id     = 'canvas';
      canvasRef.current.width  = canvasSize.w;
      canvasRef.current.height = canvasSize.h;
      const aaa = canvasRef.current.getContext('2d');
      setContext(aaa!)
    }

    // setInterval(()=>{
      _canvasUpdate();
    // }, 1000);
  })

  const _canvasUpdate = () => {
    if(context && videoRef.current){
      context.drawImage(videoRef.current, 0, 0, canvasSize.w, canvasSize.h);
      requestAnimationFrame(_canvasUpdate);
    }
  };

  const canvasAnalyze = () => {
    if(context){
      let imgData = context.getImageData(0, 0, canvasSize.w, canvasSize.h);
      let src = cv.matFromImageData(imgData);




    }

  }


  return (
    <div>
      video from
      <video ref={videoRef}></video>
      eee

      <canvas className="canvas" ref={canvasRef} />
    </div>
  )
}
