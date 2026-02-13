import { useEffect, useRef } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";

export default function MotionTracking() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvasCtx = canvasRef.current.getContext("2d")!;
    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      canvasCtx.drawImage(results.image, 0, 0, canvasRef.current!.width, canvasRef.current!.height);

      if (results.poseLandmarks) {
        for (const landmark of results.poseLandmarks) {
          canvasCtx.beginPath();
          canvasCtx.arc(
            landmark.x * canvasRef.current!.width,
            landmark.y * canvasRef.current!.height,
            5,
            0,
            2 * Math.PI
          );
          canvasCtx.fillStyle = "red";
          canvasCtx.fill();
        }
      }
      canvasCtx.restore();
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await pose.send({ image: videoRef.current! });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => {
      camera.stop();
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} className="hidden" playsInline></video>
      <canvas ref={canvasRef} width={640} height={480} className="rounded-xl shadow-md" />
    </div>
  );
}
