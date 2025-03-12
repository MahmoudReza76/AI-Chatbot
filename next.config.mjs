import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
    // فقط در سمت کلاینت و در محیط تولید این تنظیمات را اعمال می‌کنیم
    if (!isServer && !dev) {
      // اضافه کردن یک پیکربندی جدید برای ساخت ویجت
      config.entry = {
        ...config.entry,
        widget: path.resolve(__dirname, "app/widget/page.js")
      };

      // تنظیم خروجی برای فایل ویجت
      config.output = {
        ...config.output,
        filename: (pathData) => {
          return pathData.chunk.name === "widget"
            ? "static/chunks/widget.js"
            : config.output.filename;
        },
        library: (pathData) => {
          return pathData.chunk.name === "widget" ? "ChatWidget" : undefined;
        },
        libraryTarget: "umd",
        globalObject: "this"
      };
    }

    return config;
  }
};

export default nextConfig;
