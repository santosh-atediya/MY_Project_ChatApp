import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStreamToken } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { EmojiPicker } from "stream-chat-react/emojis";
import CallButton from "../components/CallButton";
import LoadingPage from "../components/LoadingPage";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const navigate = useNavigate();
  const { authenticatedUser } = useAuthUser();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authenticatedUser, // run only when authenticatedUser is available
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData || !authenticatedUser) return;
      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authenticatedUser._id,
            name: authenticatedUser.fullName,
            image: authenticatedUser.image,
          },
          tokenData.token,
        );

        const channelId = [authenticatedUser._id, targetUserId]
          .sort()
          .join("-");

        // Jane and sara
        // if Jane start the chat => channelId: [JaneId, SaraId]
        // if Sara start the chat => channelId: [SaraId, JaneId] => [janeId, saraId]

        const currChannel = client.channel("messaging", channelId, {
          members: [authenticatedUser._id, targetUserId],
        });

        await currChannel.watch();

        setChannel(currChannel);
        setChatClient(client);
      } catch (error) {
        console.error("Error initializing stream chat:", error);
        toast.error("Could not initialize stream chat, Please try again");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authenticatedUser, targetUserId]);

  const handleVideoCall = async () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      try {
        await channel.sendMessage({
          text: `I've started a video call. Join me here: ${callUrl}`,
        });
      } catch (error) {
        console.error("Failed to send video call message:", error);
      }

      navigate(`/call/${channel.id}`);
    }
  };

  if (loading || !chatClient || !channel)
    return <LoadingPage chatpage={true} />;

  return (
    <div className="h-[87vh] overflow-hidden">
      <div className="card bg-base-100 card-sm">
        <div className="card-body p-0">
          <Chat client={chatClient}>
            <Channel channel={channel} EmojiPicker={EmojiPicker}>
              <div className="w-full relative">
                <CallButton handleVideoCall={handleVideoCall} />
                <Window>
                  <ChannelHeader />
                  <MessageList />
                  <MessageInput focus />
                </Window>
              </div>
              <Thread />
            </Channel>
          </Chat>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
