"use client";

import {useRef, useEffect} from "react";
import {motion} from "framer-motion";
import {Bot} from "lucide-react";
import Message from "./Message";
import EmptyStateMessage from "./EmptyStateMessage";

function MessageList({messages, isTyping, isFullScreen, chatbotConfig}) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary/30 scrollbar-track-primary/10 scroll-smooth bg-gray-50">
        <EmptyStateMessage
          isFullScreen={isFullScreen}
          chatbotConfig={chatbotConfig}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary/30 scrollbar-track-primary/10 scroll-smooth p-4 space-y-4 bg-gray-50">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          chatbotConfig={chatbotConfig}
        />
      ))}

      {isTyping && !messages.some((msg) => msg.status === "typing") && (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="bg-white p-2 rounded-xl shadow-sm">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
