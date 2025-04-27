import React from "react";
import ChatWidget from "@/components/ChatWidget";

export default async function WidgetPage({searchParams}) {
  const {
    domain = "test.danavan.ai",
    chatBotId = "ac5fefda-5607-49bd-a8fd-071ac64f6eba"
  } = await searchParams;

  return (
    <div>
      <ChatWidget domain={domain} chatBotId={chatBotId} />
    </div>
  );
}
