(function () {
  if (window.ChatBotLoaded) return;
  window.ChatBotLoaded = true;

  const script = document.createElement("script");
  script.src = "https://ai-chatbot-eta-six-79.vercel.app/widget";
  script.async = true;
  document.head.appendChild(script);

  script.onload = function () {
    window.initChatWidget({
      apiUrl: "https://your-api.com",
      position: "bottom-right",
      themeColor: "#007bff"
    });
  };
})();
