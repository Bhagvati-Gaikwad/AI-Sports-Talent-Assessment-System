// src/components/CameraAssessment.tsx
import React, { useEffect, useRef, useState } from "react";
import { Pose, POSE_CONNECTIONS, Results, NormalizedLandmarkList } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import * as drawMod from "@mediapipe/drawing_utils";
import axios from "axios";

type Props = {
  onBack?: () => void;
};

export function CameraAssessment({ onBack }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFrames, setRecordedFrames] = useState<NormalizedLandmarkList[]>([]);

  const camRef = useRef<Camera | null>(null);
  const poseRef = useRef<Pose | null>(null);

  useEffect(() => {
    let cancelled = false;

    const setup = async () => {
      try {
        const { drawConnectors } = drawMod;

        if (cancelled) return;

        const pose = new Pose({
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });

        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        pose.onResults((results: Results) => {
          const canvas = canvasRef.current!;
          const video = videoRef.current!;
          if (!canvas || !video) return;

          const w = video.videoWidth || 640;
          const h = video.videoHeight || 480;
          if (canvas.width !== w) canvas.width = w;
          if (canvas.height !== h) canvas.height = h;

          const ctx = canvas.getContext("2d")!;
          ctx.save();
          ctx.clearRect(0, 0, w, h);

          const lm = results.poseLandmarks;
          if (lm && lm.length) {
            drawConnectors(ctx, lm, POSE_CONNECTIONS, { lineWidth: 3, color: "#00FFAA" });
            lm.forEach((point) => {
              ctx.beginPath();
              ctx.arc(point.x * w, point.y * h, 6, 0, 2 * Math.PI);
              ctx.fillStyle = "#FF4444";
              ctx.fill();
            });

            if (isRecording) setRecordedFrames((prev) => [...prev, lm]);
          }

          ctx.restore();
        });

        poseRef.current = pose;

        const cam = new Camera(videoRef.current!, {
          onFrame: async () => {
            if (!poseRef.current || !videoRef.current) return;
            await poseRef.current.send({ image: videoRef.current });
          },
          width: 1280,
          height: 720,
        });

        camRef.current = cam;
        await cam.start();
      } catch (e: any) {
        console.error(e);
        setError(e?.message ?? "Could not initialize camera. Check permissions.");
      }
    };

    setup();

    return () => {
      cancelled = true;
      camRef.current?.stop();
      poseRef.current?.close();
    };
  }, [isRecording]);

  const handleStart = () => {
    setRecordedFrames([]);
    setIsRecording(true);
  };

  const handleStop = async () => {
    setIsRecording(false);
    camRef.current?.stop(); // ✅ stop camera

    if (recordedFrames.length > 0) {
      try {
        await axios.post("http://localhost:5000/save-assessment", {
          email: "uday@gmail.com", // replace with dynamic user email
          data: recordedFrames,
        });
        console.log("Assessment saved to database!");
      } catch (err) {
        console.error("Failed to save assessment:", err);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {error && (
          <div className="absolute left-3 bottom-3 bg-red-600 text-white px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {onBack && (
          <div className="absolute top-3 left-3">
            <button
              onClick={onBack}
              className="px-3 py-1 bg-gray-800/70 text-white rounded-md text-sm"
            >
              ⬅ Back
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-900/90 rounded-xl p-4 flex flex-col items-center gap-3 text-center">
        {!isRecording ? (
          <button
            onClick={handleStart}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
          >
            ▶ Start Recording
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md"
          >
            ⏹ Stop & Save
          </button>
        )}

        <p className="text-sm text-gray-300">
          {isRecording
            ? "Recording in progress... Perform your exercise."
            : "Stand straight and press Start to begin assessment."}
        </p>
      </div>
    </div>
  );
}
