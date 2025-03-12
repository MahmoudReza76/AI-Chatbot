import React from "react";
import {createRoot} from "react-dom/client";
import ChatWidget from "@/components/ChatWidget";

// فانکشنی که ویجت را در صفحه نمایش می‌دهد
const initialize = (containerId = "chat-widget-container", config = {}) => {
  // اگر کانتینر وجود نداشت، آن را ایجاد می‌کنیم
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    document.body.appendChild(container);
  }

  // استفاده از createRoot برای React 18
  const root = createRoot(container);

  // رندر کردن ویجت در کانتینر
  root.render(<ChatWidget {...config} />);

  return {
    unmount: () => {
      root.unmount();
    }
  };
};

// API عمومی که در اختیار کاربران قرار می‌گیرد
const WidgetAPI = {
  initialize
};

// اگر window وجود داشته باشد (در مرورگر)، API را به آن اضافه می‌کنیم
if (typeof window !== "undefined") {
  window.ChatWidget = WidgetAPI;
}

export default WidgetAPI;
