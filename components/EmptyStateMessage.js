"use client";

import {motion} from "framer-motion";
import {MessageSquare, HelpCircle, Clock, Star, Bot} from "lucide-react";

function EmptyStateMessage({isFullScreen, chatbotConfig}) {
  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      className={`flex flex-col items-center justify-center px-4 py-6 text-center overflow-y-auto`}
    >
      <div
        style={{backgroundColor: chatbotConfig?.Color}}
        className={`${
          isFullScreen ? "w-20 h-20" : "w-16 h-16"
        }  rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}
      >
        <MessageSquare
          className={`${isFullScreen ? "w-10 h-10" : "w-8 h-8"} text-white`}
        />
      </div>

      <h3
        className={`${
          isFullScreen ? "text-lg" : "text-base"
        } font-bold text-gray-800 mb-2 sm:mb-3`}
      >
        {chatbotConfig?.welcomeMessage}
      </h3>
      <p
        className={`${
          isFullScreen ? "text-sm" : "text-xs"
        } text-gray-600 mb-6 sm:mb-8 ${isFullScreen ? "max-w-md" : "max-w-xs"}`}
      >
        در هر زمان می‌توانید سوالات خود را بپرسید. ما آماده کمک به شما هستیم.
      </p>

      <div
        className={`grid ${
          isFullScreen ? "grid-cols-2" : "grid-cols-1"
        } gap-2 sm:gap-4 w-full ${isFullScreen ? "max-w-lg" : "max-w-xs"}`}
      >
        <div className="flex items-center gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <div className="text-right">
            <h4 className="text-xs sm:text-sm font-medium text-gray-800">
              پاسخ سریع
            </h4>
            <p className="text-[10px] sm:text-xs text-gray-500">
              به سوالات شما در لحظه پاسخ می‌دهیم
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
          </div>
          <div className="text-right">
            <h4 className="text-xs sm:text-sm font-medium text-gray-800">
              ۲۴/۷ در دسترس
            </h4>
            <p className="text-[10px] sm:text-xs text-gray-500">
              در هر ساعت از شبانه‌روز پاسخگو هستیم
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          </div>
          <div className="text-right">
            <h4 className="text-xs sm:text-sm font-medium text-gray-800">
              راهنمایی دقیق
            </h4>
            <p className="text-[10px] sm:text-xs text-gray-500">
              اطلاعات دقیق و کاربردی دریافت کنید
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </div>
          <div className="text-right">
            <h4 className="text-xs sm:text-sm font-medium text-gray-800">
              هوش مصنوعی
            </h4>
            <p className="text-[10px] sm:text-xs text-gray-500">
              با فناوری پیشرفته هوش مصنوعی
            </p>
          </div>
        </div>
      </div>

      <div
        className={`mt-6 sm:mt-8 ${
          isFullScreen ? "text-sm" : "text-xs"
        } text-gray-500`}
      >
        پیام خود را در کادر پایین بنویسید تا گفتگو را آغاز کنیم
      </div>
    </motion.div>
  );
}

export default EmptyStateMessage;
