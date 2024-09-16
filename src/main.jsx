import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#2b8dcb",
          borderRadius: 8,

          // Alias Token
          colorBgContainer: "#ffffff",
        },
      }}
    >
      <App />
    </ConfigProvider>{" "}
  </StrictMode>
);
