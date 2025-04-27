(function () {
  // تنظیمات پیش‌فرض
  const widgetConfig = {
    domain: "test.danavan.ai",
    chatBotId: "ac5fefda-5607-49bd-a8fd-071ac64f6eba",
    containerId: "chatbot-container"
  };

  // خواندن تنظیمات از اسکریپت
  function getConfigFromScript() {
    const scriptTag = document.querySelector('script[src*="chatbot-embed.js"]');
    if (scriptTag) {
      const customDomain = scriptTag.getAttribute("data-domain");
      const customChatBotId = scriptTag.getAttribute("data-chatbot-id");
      if (customDomain) widgetConfig.domain = customDomain;
      if (customChatBotId) widgetConfig.chatBotId = customChatBotId;
    }
  }

  // تابع رندر React
  function renderChatWidget() {
    const container = document.getElementById(widgetConfig.containerId);
    if (!container) {
      console.error(`Container with ID ${widgetConfig.containerId} not found.`);
      return;
    }

    // رندر ChatWidget با استفاده از ReactDOM
    ReactDOM.render(
      React.createElement(ChatWidget, {
        domain: widgetConfig.domain,
        chatBotId: widgetConfig.chatBotId
      }),
      container
    );
  }

  // بررسی آماده بودن DOM و اجرای اسکریپت
  function initWidget() {
    getConfigFromScript();
    renderChatWidget();
  }

  if (document.readyState === "complete") {
    initWidget();
  } else {
    window.addEventListener("load", initWidget);
  }
})();
