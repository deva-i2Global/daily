"use client";

import Daily, { DailyCall } from "@daily-co/daily-js";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";

type Props = { 
  roomId: string; 
  role: "admin" | "participant"; 
  name?: string;
};

const MeetingCall = ({ roomId, role, name }: Props) => {
  const iframeRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<DailyCall | null>(null);
  const router = useRouter();

  const createMeetingToken = useCallback(async () => {
    const body = {
      properties: {
        room_name: roomId,
        user_id: Math.random().toString(36).substring(7),
        user_name: name || (role === "admin" ? "Admin User" : "User"),
        enable_recording_ui: false,
        ...(role === "admin" && {
          is_owner: true,
          start_cloud_recording: true,
          start_cloud_recording_opts: {
            width: 1280,
            height: 720,
            fps: 25,
            backgroundColor: "#FF1F2D3D",
            layout: {
              preset: "default",
              max_cam_streams: 5,
            },
          },
        }),
      },
    };

    const response = await fetch("https://api.daily.co/v1/meeting-tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to create meeting token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.token;
  }, [roomId, role, name]);

  useEffect(() => {
    if (!iframeRef.current) return;

    let mounted = true;

    const initializeCall = async () => {
      try {
        const call = Daily.createFrame(iframeRef.current!, {
          showLeaveButton: true,
          url: `https://i2global.daily.co/${roomId}`,
          iframeStyle: {
            position: "absolute",
            width: "100%",
            height: "100%",
            border: "0",
          },
        });

        callRef.current = call;

        call.on("left-meeting", () => {
          call.destroy();
          router.replace("/");
        });

        const token = await createMeetingToken();
        
        if (mounted) {
          await call.join({ token });
        }
      } catch (error) {
        console.error("Error initializing call:", error);
        if (mounted) {
          router.replace("/");
        }
      }
    };

    initializeCall();

    return () => {
      mounted = false;
      if (callRef.current) {
        callRef.current.destroy();
        callRef.current = null;
      }
    };
  }, [roomId, createMeetingToken, router]);

  return <div className="h-dvh w-dvw" ref={iframeRef} />;
};

export default MeetingCall;
