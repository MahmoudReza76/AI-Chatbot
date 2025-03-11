"use client";

import {motion} from "framer-motion";
import {Bot, Check, CheckCheck} from "lucide-react";
import ReactMarkdown from "react-markdown";

function Message({message}) {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const markdownStyles = {
    p: "mb-3 last:mb-0",
    a:
      message.sender === "user"
        ? "text-blue-100 underline"
        : "text-blue-600 underline",
    code: `${
      message.sender === "user" ? "bg-blue-500/30" : "bg-gray-100"
    } font-mono text-[0.9em] px-1 py-0.5 rounded`,
    pre: `${
      message.sender === "user" ? "bg-blue-500/20" : "bg-gray-100"
    } p-2 rounded my-3 overflow-x-auto`,
    ul: "list-disc pr-5 mb-3 space-y-1",
    ol: "list-decimal pr-5 mb-3 space-y-1",
    li: "mb-1",
    h1: "text-sm font-bold mb-2",
    h2: "text-xs font-bold mb-2",
    h3: "text-xs font-semibold mb-1",
    blockquote: `${
      message.sender === "user" ? "border-blue-300" : "border-gray-300"
    } border-r-2 pr-2 italic my-2`
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 10}}
      animate={{opacity: 1, y: 0}}
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%]  ${
          message.sender === "user"
            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
            : "bg-white"
        } rounded-xl shadow-sm`}
      >
        <div className="p-2.5">
          {message.sender === "support" && (
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-900">
                  پشتیبان هوشمند
                </div>
              </div>
            </div>
          )}

          <div
            className={`text-xs leading-relaxed break-words ${
              message.sender === "user" ? "text-white" : "text-gray-800"
            }`}
          >
            {message.status === "typing" ? (
              <p>{message.text}</p>
            ) : (
              <ReactMarkdown
                components={{
                  p: ({node, ...props}) => (
                    <p className={markdownStyles.p} {...props} />
                  ),
                  a: ({node, ...props}) => (
                    <a className={markdownStyles.a} {...props} />
                  ),
                  code: ({node, inline, ...props}) =>
                    inline ? (
                      <code className={markdownStyles.code} {...props} />
                    ) : (
                      <code {...props} />
                    ),
                  pre: ({node, ...props}) => (
                    <pre className={markdownStyles.pre} {...props} />
                  ),
                  ul: ({node, ...props}) => (
                    <ul className={markdownStyles.ul} {...props} />
                  ),
                  ol: ({node, ...props}) => (
                    <ol className={markdownStyles.ol} {...props} />
                  ),
                  li: ({node, ...props}) => (
                    <li className={markdownStyles.li} {...props} />
                  ),
                  h1: ({node, ...props}) => (
                    <h1 className={markdownStyles.h1} {...props} />
                  ),
                  h2: ({node, ...props}) => (
                    <h2 className={markdownStyles.h2} {...props} />
                  ),
                  h3: ({node, ...props}) => (
                    <h3 className={markdownStyles.h3} {...props} />
                  ),
                  blockquote: ({node, ...props}) => (
                    <blockquote
                      className={markdownStyles.blockquote}
                      {...props}
                    />
                  )
                }}
              >
                {message.text}
              </ReactMarkdown>
            )}
          </div>

          {message.status === "typing" && (
            <div className="flex gap-1 mt-1">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-200"></span>
            </div>
          )}
        </div>
        <div className="px-2.5 py-1.5 border-t border-gray-100/10 flex items-center justify-end">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[10px] ${
                message.sender === "user" ? "text-blue-100" : "text-gray-500"
              }`}
            >
              {formatTime(message.timestamp)}
            </span>
            {message.sender === "user" && (
              <div className="text-blue-100">
                {message.status === "sent" ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <CheckCheck className="w-3 h-3" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Message;
