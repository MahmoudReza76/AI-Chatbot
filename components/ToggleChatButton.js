"use client";

import {motion} from "framer-motion";
import {MessageCircle, X} from "lucide-react";

function ToggleChatButton({isOpen, onClick}) {
  return (
    <motion.button
      onClick={onClick}
      className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{scale: 1.05}}
      whileTap={{scale: 0.95}}
    >
      {isOpen ? (
        <X className="w-5 h-5 " />
      ) : (
        <>
          <MessageCircle className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-medium">
            3
          </span>
        </>
      )}
    </motion.button>
  );
}

export default ToggleChatButton;
