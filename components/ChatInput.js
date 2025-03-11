import {useState, useEffect, useRef} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {Send, Paperclip, Image, Smile, Mic, Plus} from "lucide-react";

function ChatInput({newMessage, setNewMessage, handleSubmit, quickResponses}) {
  const [isTyping, setIsTyping] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setIsTyping(newMessage.length > 0);
  }, [newMessage]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await handleSubmit(e);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const iconVariants = {
    initial: {
      opacity: 0,
      scale: 0.3,
      rotate: -45
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.3,
      rotate: 45,
      transition: {
        duration: 0.2
      }
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-100 shadow-inner">
      <div className="mb-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary/30 scrollbar-track-primary/10 scroll-smooth pb-2 scrollbar-hide">
          {quickResponses.map((response, index) => (
            <button
              key={index}
              onClick={() => setNewMessage(response)}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-600 rounded-full text-xs whitespace-nowrap hover:shadow-md hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
            >
              {response}
            </button>
          ))}
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-2">
        <div className="flex gap-2 items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="پیام خود را بنویسید..."
              className="w-full px-4 py-3 bg-gray-50 text-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white text-sm transition-all duration-200"
            />
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Smile className="w-4 h-4 text-gray-500" />
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className={`p-1.5 hover:bg-gray-200 rounded-lg transition-colors ${
                    isDropdownOpen ? "bg-gray-200" : ""
                  }`}
                >
                  <Plus className="w-4 h-4 text-gray-500" />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden min-w-[120px] z-10"
                    >
                      <div className="py-1">
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Image className="w-4 h-4 text-gray-500" />
                          <span>تصویر</span>
                        </button>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Paperclip className="w-4 h-4 text-gray-500" />
                          <span>پیوست</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-3 rounded-xl transition-colors relative ${
              isTyping
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <AnimatePresence mode="wait">
              {isTyping ? (
                <motion.div
                  key="send"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Send className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="mic"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Mic className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
