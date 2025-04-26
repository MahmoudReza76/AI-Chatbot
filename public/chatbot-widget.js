(function () {
  const widgetConfig = {
    widgetUrl: "https://ai-chatbot-eta-six-79.vercel.app/widget",
    domain: "test.danavan.ai",
    chatBotId: "ac5fefda-5607-49bd-a8fd-071ac64f6eba",
    containerId: "chatbot-widget-container",
    buttonId: "chatbot-toggle-button"
  };

  function getConfigFromScript() {
    const scriptTag = document.querySelector(
      'script[src*="chatbot-widget.js"]'
    );
    if (scriptTag) {
      const customDomain = scriptTag.getAttribute("data-domain");
      const customChatBotId = scriptTag.getAttribute("data-chatbot-id");
      if (customDomain) widgetConfig.domain = customDomain;
      if (customChatBotId) widgetConfig.chatBotId = customChatBotId;
    }
  }

  function initWidget() {
    getConfigFromScript();
  }

  if (document.readyState === "complete") {
    initWidget();
  } else {
    window.addEventListener("load", initWidget);
  }
})();
