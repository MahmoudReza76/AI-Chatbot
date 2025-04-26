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

  function createWidgetContainer() {
    const container = document.createElement("div");
    container.id = widgetConfig.containerId;
    container.style.position = "fixed";
    container.style.bottom = "20px";
    container.style.right = "20px";
    container.style.zIndex = "9999";
    container.style.display = "none";
    container.innerHTML = `
        <div style="width: 350px; height: 500px; background: white; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); overflow: hidden;">
          <iframe src="${widgetConfig.widgetUrl}?domain=${encodeURIComponent(
      widgetConfig.domain
    )}&chatBotId=${encodeURIComponent(
      widgetConfig.chatBotId
    )}" style="width: 100%; height: 100%; border: none;"></iframe>
        </div>
      `;
    document.body.appendChild(container);
  }

  function createToggleButton() {
    const button = document.createElement("button");
    button.id = widgetConfig.buttonId;
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.zIndex = "10000";
    button.style.background = "#3b82f6";
    button.style.color = "white";
    button.style.width = "60px";
    button.style.height = "60px";
    button.style.borderRadius = "50%";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    button.innerHTML = "💬";
    button.onclick = toggleWidget;
    document.body.appendChild(button);
  }

  function toggleWidget() {
    const container = document.getElementById(widgetConfig.containerId);
    if (container.style.display === "none") {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  }

  function initWidget() {
    getConfigFromScript();
    createWidgetContainer();
    createToggleButton();
  }

  if (document.readyState === "complete") {
    initWidget();
  } else {
    window.addEventListener("load", initWidget);
  }
})();
