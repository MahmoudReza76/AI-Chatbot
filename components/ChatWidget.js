"use client";
import {useState, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import {
  createThread,
  sendMessage,
  runWithStream,
  getChatbot
} from "@/app/api/api";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import ToggleChatButton from "./ToggleChatButton";

function ChatWidget({domain, chatBotId}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [previousOpenState, setPreviousOpenState] = useState(false);
  const [chatbotConfig, setChatbotConfig] = useState(null);

  useEffect(() => {
    const initializeChatbot = async () => {
      try {
        const chatbotData = await getChatbot(domain, chatBotId);
        setChatbotConfig(chatbotData);
        const newThreadId = await createThread();
        setThreadId(newThreadId);
      } catch (err) {
        console.error("Error initializing chatbot:", err);
        setError("خطا در بارگذاری چت‌بات. لطفاً دوباره تلاش کنید.");
      }
    };
    initializeChatbot();
  }, [chatBotId, domain]);

  useEffect(() => {
    if (isOpen !== previousOpenState) {
      if (isOpen && !previousOpenState) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) => ({...msg, animated: true}))
        );
      }
      setPreviousOpenState(isOpen);
    }
  }, [isOpen, previousOpenState]);

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
      const stream = await runWithStream(threadId, chatbotConfig.assistantId);
      const tempMessageId = uuidv4();
      let accumulatedContent = "";

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
      let buffer = "";

      while (true) {
        const {done, value} = await reader.read();

        if (done) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === tempMessageId ? {...msg, status: "sent"} : msg
            )
          );
          setIsTyping(false);
          break;
        }

        buffer += decoder.decode(value, {stream: true});
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.trim().startsWith("data: ")) {
            const dataContent = line.substring(6).trim();

            if (dataContent === "[DONE]") continue;

            try {
              const parsedData = JSON.parse(dataContent);

              if (parsedData.object === "thread.message.delta") {
                if (parsedData.delta?.content?.length > 0) {
                  for (const content of parsedData.delta.content) {
                    if (content.type === "text" && content.text?.value) {
                      accumulatedContent += content.text.value;

                      setMessages((prev) =>
                        prev.map((msg) =>
                          msg.id === tempMessageId
                            ? {...msg, text: accumulatedContent}
                            : msg
                        )
                      );
                    }
                  }
                }
              }
            } catch (parseError) {
              console.error("Error parsing stream data:", parseError);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error processing stream:", error);
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
    if (!isFullScreen) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => ({...msg, animated: true}))
      );
    }
    setIsFullScreen(!isFullScreen);
  };

  const toggleChat = () => {
    if (!isOpen) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => ({...msg, animated: true}))
      );
    }
    setIsOpen(!isOpen);
  };

  const quickResponses = [
    "سلام، به کمک شما نیاز دارم",
    "چگونه می‌توانم به شما اعتماد کنم؟",
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
        <ToggleChatButton
          chatbotConfig={chatbotConfig}
          isOpen={isOpen}
          onClick={toggleChat}
        />
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
            chatbotConfig={chatbotConfig}
            toggleFullScreen={toggleFullScreen}
            onClose={() => {
              setIsFullScreen(false);
              setIsOpen(false);
            }}
          />

          <MessageList
            isFullScreen={isFullScreen}
            chatbotConfig={chatbotConfig}
            messages={messages}
            isTyping={isTyping}
          />

          <ChatInput
            newMessage={newMessage}
            chatbotConfig={chatbotConfig}
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
