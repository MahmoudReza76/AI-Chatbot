(function () {
  // تنظیمات اصلی
  const config = {
    widgetUrl: "https://your-domain.com/widget",
    styles: {
      iframe: {
        position: "fixed",
        bottom: "0",
        right: "0",
        width: "350px",
        height: "500px",
        border: "none",
        zIndex: "999999",
        background: "transparent"
      }
    }
  };

  function createWidget() {
    // ساخت iframe
    const iframe = document.createElement("iframe");

    // اعمال استایل‌ها
    Object.assign(iframe.style, config.styles.iframe);

    // تنظیم آدرس
    iframe.src = config.widgetUrl;

    // اضافه کردن به صفحه
    document.body.appendChild(iframe);

    // مدیریت پیام‌ها
    window.addEventListener("message", function (event) {
      if (event.origin !== config.widgetUrl) return;

      // مدیریت پیام‌های دریافتی
      switch (event.data.type) {
        case "resize":
          iframe.style.height = event.data.height + "px";
          break;
        case "close":
          iframe.style.display = "none";
          break;
        case "open":
          iframe.style.display = "block";
          break;
      }
    });
  }

  // اجرای اسکریپت بعد از لود صفحه
  if (document.readyState === "complete") {
    createWidget();
  } else {
    window.addEventListener("load", createWidget);
  }

  // API عمومی
  window.ChatWidget = {
    open: function () {
      iframe.contentWindow.postMessage({type: "open"}, config.widgetUrl);
    },
    close: function () {
      iframe.contentWindow.postMessage({type: "close"}, config.widgetUrl);
    }
  };
})();
