import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

/* =========================
   Typing / Streaming Helper
   ========================= */
const streamText = async (fullText, onUpdate) => {
  let currentText = "";

  for (let index = 0; index < fullText.length; index++) {
    currentText += fullText[index];
    onUpdate(currentText);

    // Typing speed (lower = faster)
    await new Promise((resolve) => setTimeout(resolve, 15));
  }
};

export default function Chat() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  /* =========================
     Utilities
     ========================= */
  const getTimeStamp = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  /* =========================
     Send Message
     ========================= */
  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // 1️⃣ Add user message instantly
    const userMessage = {
      role: "user",
      text: userInput,
      time: getTimeStamp(),
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setUserInput("");
    setIsLoading(true);

    try {
      // 2️⃣ Call backend
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();

      // 3️⃣ Add empty AI bubble
      const aiMessage = {
        role: "ai",
        text: "",
        time: getTimeStamp(),
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        aiMessage,
      ]);

      // 4️⃣ Stream AI response (typing effect)
      await streamText(data.response, (partialText) => {
        setMessages((previousMessages) => {
          const updatedMessages = [...previousMessages];
          updatedMessages[updatedMessages.length - 1] = {
            ...aiMessage,
            text: partialText,
          };
          return updatedMessages;
        });
      });
    } catch (error) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "ai",
          text: "⚠️ Error connecting to AI",
          time: getTimeStamp(),
        },
      ]);
    }

    setIsLoading(false);
  };

  /* =========================
     Enter Key Handling
     ========================= */
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  /* =========================
     Clear Chat
     ========================= */
  const clearChat = () => {
    setMessages([]);
  };

  /* =========================
     Auto Scroll
     ========================= */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* =========================
     UI
     ========================= */
  return (
    <div className="chat-container">
      {/* Header */}
      <div className="header">
        <h1>Offline AI Chatbot</h1>
        <button className="clear-btn" onClick={clearChat}>
          Clear
        </button>
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`chat-bubble ${message.role}`}>
            <ReactMarkdown>{message.text}</ReactMarkdown>
            <div className="timestamp">{message.time}</div>
          </div>
        ))}

        {isLoading && (
          <div className="chat-bubble ai typing">AI is typing…</div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-area">
        <textarea
          placeholder="Ask something… (Enter to send, Shift+Enter for new line)"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
}
