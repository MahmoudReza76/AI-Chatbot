const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJsUGpqMXF6SUN5WSUzZCIsIm5iZiI6MTc0NTY1NDM4NywiZXhwIjozMzI4MTY1NDM4NywiaWF0IjoxNzQ1NjU0Mzg3LCJpc3MiOiJodHRwOi8vaXNzdWVyLnBheWFtYWstcGFuZWwuY29tIiwiYXVkIjoiaHR0cDovL2F1ZGllbmNlLnBheWFtYWstcGFuZWwuY29tIn0.7LpEsCewgbQ-cnTNDhLH3UgmFv7fk8xCX0WIX9YbR78";

const baseUrl = "https://rest2.payamak-panel.com/api/ai/assistant";

//getchatbot
export const getChatbot = async (domain, chatBotId) => {
  try {
    const response = await fetch(
      `https://rest2.payamak-panel.com/api/chatbot/getchatbot`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          domain: domain,
          chatBotId: chatBotId
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch chatbot: ${error.message}`);
  }
};

export const createThread = async () => {
  const response = await fetch(`${baseUrl}/threads/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // استفاده از Bearer Token
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  return data.id;
};

export const sendMessage = async (threadId, message) => {
  const response = await fetch(`${baseUrl}/Threads/${threadId}/Messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      role: "user",
      content: message
    })
  });
  return await response.json();
};

export const createRun = async (threadId, assistantId) => {
  const response = await fetch(`${baseUrl}/Threads/${threadId}/Runs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      assistant_id: assistantId,
      stream: true
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`API error: ${JSON.stringify(errorData)}`);
  }

  if (response.headers.get("content-type").includes("application/json")) {
    // پاسخ جریانی نیست - به صورت یکجا برگردانده شده
    const data = await response.json();
    return data.id; // فرض می‌کنیم که ID در پاسخ وجود دارد
  } else {
    // پردازش پاسخ جریانی
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let runId = null;

    return new Promise((resolve, reject) => {
      async function readStream() {
        try {
          const {done, value} = await reader.read();

          if (done) {
            return resolve(runId);
          }

          // تبدیل آرایه بایت به رشته
          const chunk = decoder.decode(value, {stream: true});

          const lines = chunk.split("\n").filter((line) => line.trim());

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = JSON.parse(line.substring(6));

              if (data.id && !runId) {
                runId = data.id;
              }

              console.log("Stream chunk:", data);
            }
          }

          return readStream();
        } catch (error) {
          reject(error);
        }
      }

      readStream();
    });
  }
};

export const checkRunStatus = async (threadId, runId) => {
  const response = await fetch(`${baseUrl}/Threads/${threadId}/Runs/${runId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  return data.status;
};

export const submitToolOutputs = async (threadId, runId, toolOutputs) => {
  const response = await fetch(
    `${baseUrl}/Threads/${threadId}/Runs/${runId}/submit_tool_outputs`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tool_outputs: toolOutputs,
        stream: true
      })
    }
  );
  return await response.json();
};

//runWithStream
export const runWithStream = async (threadId, assistantId) => {
  try {
    const response = await fetch(`${baseUrl}/Threads/${threadId}/Runs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        assistant_id: assistantId,
        stream: true
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${JSON.stringify(errorData)}`);
    }
    return response.body;
  } catch (error) {
    throw error;
  }
};
