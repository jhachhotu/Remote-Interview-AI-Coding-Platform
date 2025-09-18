import { useEffect, useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";

export default function InterviewRoom() {
  const { code } = useParams();
  const wsRef = useRef<WebSocket | null>(null);
  const [value, setValue] = useState("// Start coding together...\n");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const wsUrl = useMemo(() => {
    const base = (import.meta.env.VITE_WS_BASE_URL as string) || "ws://localhost:8000";
    return `${base.replace(/\/$/, "")}/ws/editor/${code}/`;
  }, [code]);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    ws.onmessage = (ev) => {
      try {
        const text = typeof ev.data === "string" ? ev.data : "";
        setValue(text);
      } catch {}
    };
    return () => ws.close();
  }, [wsUrl]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch {
        // ignore if permissions denied
      }
    })();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  function onChange(val?: string) {
    const text = val ?? "";
    setValue(text);
    wsRef.current?.send(text);
  }

  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      <div className="p-2 bg-gray-900 text-white flex items-center gap-4">
        <div className="text-sm">Room: {code}</div>
        <video ref={videoRef} className="h-16 rounded border border-gray-700" muted playsInline></video>
      </div>
      <Editor height="100%" defaultLanguage="typescript" value={value} onChange={onChange} theme="vs-dark" />
    </div>
  );
}

