import { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 How can I help you?" },
  ]);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const messageToSend = input;
    setMessages((prev) => [...prev, { role: "user", text: messageToSend }]);
    setInput("");

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "No response" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Server error ❌" },
      ]);
    }
  };

  return (
    <div className="w-full sm:w-[380px] md:w-[420px] h-[320px] sm:h-[380px] md:h-[420px] rounded-xl flex flex-col bg-white/20 backdrop-blur-lg border border-white/30">

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2 flex flex-col chat-scroll">

        {messages.map((m, i) => (
          <div
            key={i}
            className="p-3 text-sm max-w-[80%] break-words"
            style={{
              alignSelf: m.role === "user" ? "flex-start" : "flex-end",
              backgroundColor:
                m.role === "user"
                  ? "var(--primary-color)"
                  : "var(--secondary-color)",
              color: "white",
              borderRadius:
                m.role === "user"
                  ? "16px 16px 16px 4px"
                  : "16px 16px 4px 16px",
            }}
          >
            {m.text}
          </div>
        ))}

        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-2 flex gap-2 border-t border-black/10">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded-md p-2 text-sm"
          placeholder="Ask ArgoVision AI..."
          style={{
            backgroundColor: "var(--bg)",
            color: "var(--text)",
            borderColor: "rgba(0,0,0,0.2)",
          }}
        />

        <button
          onClick={sendMessage}
          className="px-3 rounded text-white font-medium flex items-center justify-center"
          style={{ backgroundColor: "var(--secondary-color)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083z"/>
          </svg>
        </button>

      </div>
    </div>
  );
};

export default Chatbot;