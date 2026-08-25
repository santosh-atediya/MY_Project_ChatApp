import React, { useEffect, useState } from "react";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import toast from "react-hot-toast";
import LoadingPage from "../components/LoadingPage";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authenticatedUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authenticatedUser, // run only when authenticatedUser is available
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authenticatedUser || !callId) return;
      try {
        console.log("Initializing Stream video client...");

        const user = {
          id: authenticatedUser._id,
          name: authenticatedUser.fullName,
          image: authenticatedUser.image,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);

        await callInstance.join({ create: true });

        console.log("Joined call successfully");

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error Joining Call:", error);
        toast.error("Error Joining Call Please try again");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();

    return () => {
      if (call) {
        call.leave().catch((error) => {
          console.error("Error leaving call:", error);
        });
      }
      if (client) {
        client.disconnectUser().catch((error) => {
          console.error("Error disconnecting video client:", error);
        });
      }
    };
  }, [tokenData, authenticatedUser, callId]);

  if (isLoading || isConnecting) return <LoadingPage />;

  return (
    <div className="h-screen flexCenter flex-col">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/");
    }
  }, [callingState, navigate]);

  if (callingState === CallingState.LEFT) return null;

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
