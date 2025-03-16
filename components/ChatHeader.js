"use client";

import {
  Bot,
  Search,
  Phone,
  Video,
  MoreVertical,
  Maximize2,
  Minimize2,
  X
} from "lucide-react";

function ChatHeader({isFullScreen, toggleFullScreen, onClose}) {
  return (
    <div
      dir="rtl"
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-inner">
              <Bot className="w-5 h-5" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-sm font-bold">پشتیبانی هوشمند</h3>
            <div className="text-xs text-blue-100 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              همیشه در دسترس
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors duration-200">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors duration-200">
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors duration-200">
            <Video className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullScreen}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors duration-200"
          >
            {isFullScreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors duration-200">
            <MoreVertical className="w-4 h-4" />
          </button>
          {isFullScreen && (
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
