"use client";
import {useState, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import {createThread, sendMessage, runWithStream} from "@/app/api/api";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import ToggleChatButton from "./ToggleChatButton";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const [assistantId] = useState("asst_0WxKHzZZugGKJqj0IT5OJQFy");
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const newThreadId = await createThread();
        setThreadId(newThreadId);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };
    initializeChat();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !threadId) return;

    const userMessage = {
      id: `${Date.now()}-${uuidv4()}`,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sent"
    };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    try {
      await sendMessage(threadId, newMessage);

      const stream = await runWithStream(threadId, assistantId);
      const tempMessageId = uuidv4();
      setMessages((prev) => [
        ...prev,
        {
          id: tempMessageId,
          text: "",
          sender: "support",
          timestamp: new Date(),
          status: "typing"
        }
      ]);
      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let fullMessageContent = "";

      while (true) {
        const {done, value} = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, {stream: true});

        const lines = chunk.split("\n").filter((line) => line.trim());
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const dataContent = line.substring(6);

              if (dataContent.trim() === "[DONE]") {
                continue;
              }

              const data = JSON.parse(dataContent);

              if (data.object === "thread.message.delta") {
                if (data.delta?.content?.length > 0) {
                  for (const content of data.delta.content) {
                    if (content.type === "text" && content.text?.value) {
                      const textChunk = content.text.value;
                      fullMessageContent += textChunk;

                      setMessages((prev) =>
                        prev.map((msg) =>
                          msg.id === tempMessageId
                            ? {...msg, text: fullMessageContent}
                            : msg
                        )
                      );
                    }
                  }
                }
              }
            } catch (parseError) {
              console.error(
                "Error parsing JSON:",
                parseError,
                "Text:",
                line.substring(6)
              );
            }
          }
        }
      }

      setIsTyping(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          text: "متأسفانه در پردازش پیام شما خطایی رخ داد. لطفاً دوباره تلاش کنید.",
          sender: "support",
          timestamp: new Date(),
          status: "error"
        }
      ]);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const quickResponses = [
    "سلام، به کمک شما نیاز دارم",
    "چگونه میتوانم به شما اعتماد کنم؟",
    "از شما ممنونم"
  ];

  return (
    <div
      className={`${
        isFullScreen ? "fixed inset-0 z-50" : "fixed bottom-4 right-4 z-50"
      }`}
      dir="rtl"
    >
      {!isFullScreen && (
        <ToggleChatButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      )}

      {(isOpen || isFullScreen) && (
        <div
          className={`${
            isFullScreen
              ? "w-full h-full"
              : "absolute bottom-16 right-0 w-80 sm:w-96 h-[500px]"
          } bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100`}
        >
          <ChatHeader
            isFullScreen={isFullScreen}
            toggleFullScreen={toggleFullScreen}
            onClose={() => {
              setIsFullScreen(false);
              setIsOpen(false);
            }}
          />

          <MessageList
            isFullScreen={isFullScreen}
            messages={messages}
            isTyping={isTyping}
          />

          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSubmit={handleSubmit}
            quickResponses={quickResponses}
          />
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
