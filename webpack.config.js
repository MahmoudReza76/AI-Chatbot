const path = require("path");

module.exports = {
  // تنظیم حالت به development برای دیباگ یا production برای بهینه‌سازی
  mode: "development", // برای دیباگ راحت‌تر، می‌توانید به "production" تغییر دهید

  // نقطه ورود (فایل اصلی ChatWidget)
  entry: "./components/ChatWidget.js",

  // تنظیمات خروجی
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "ChatWidget.bundle.js",
    library: "ChatWidget",
    libraryTarget: "umd" // برای سازگاری با محیط‌های مختلف (مرورگر، Node.js)
  },

  // قوانین برای پردازش ماژول‌ها
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // پردازش فایل‌های .js و .jsx
        exclude: /node_modules/, // نادیده گرفتن node_modules
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env", // برای سازگاری با مرورگرهای مختلف
              "@babel/preset-react" // برای پردازش JSX و React
            ]
          }
        }
      }
    ]
  },

  // تنظیمات برای مدیریت مسیرهای alias
  resolve: {
    alias: {
      // نقشه‌برداری @ به ریشه پروژه
      "@": path.resolve(__dirname),
      // نقشه‌برداری مسیرهای خاص
      "@/app": path.resolve(__dirname, "app"),
      "@/components": path.resolve(__dirname, "components")
    },
    // پسوندهای فایل‌هایی که Webpack باید در نظر بگیرد
    extensions: [".js", ".jsx"]
  },

  // ماژول‌های خارجی (برای جلوگیری از باندل کردن React و ReactDOM)
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },

  // فعال کردن source map برای دیباگ بهتر
  devtool: "source-map"
};
