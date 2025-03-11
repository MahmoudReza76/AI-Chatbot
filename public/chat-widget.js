window.initChatWidget = function (options) {
  if (document.getElementById("chat-widget-container")) return;

  const container = document.createElement("div");
  container.id = "chat-widget-container";
  document.body.appendChild(container);

  const iframe = document.createElement("iframe");
  iframe.src = "https://your-domain.com/widget";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "400px";
  iframe.style.height = "500px";
  iframe.style.border = "none";
  iframe.style.zIndex = "1000";
  iframe.style.borderRadius = "10px";
  container.appendChild(iframe);
};
