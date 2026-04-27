
import { useState, useRef, useEffect } from "react";

const API = "https://anuragbb-abot.hf.space/chat";

const GREETING = {
  role: "assistant",
  content: "Hey! I'm Abot — Anurag's personal AI assistant. Ask me anything about his projects, skills, or experience!",
};

export default function Abot() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  async function send() {
    if (!input.trim() || loading) return;
    const question = input.trim();
    setInput("");
    setLoading(true);
    const newHistory = [...history, { role: "user", content: question }];
    setHistory(newHistory);

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history }),
      });
      const data = await res.json();
      setHistory([...newHistory, { role: "assistant", content: data.answer }]);
    } catch {
      setHistory([
        ...newHistory,
        { role: "assistant", content: "Something went wrong. Please try again!" },
      ]);
    }
    setLoading(false);
  }

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50 }}>
      {open ? (
        <div
          style={{
            width: "360px",
            height: "520px",
            background: "linear-gradient(180deg, #050505, #121212)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 32px 64px rgba(0,0,0,0.75)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(15,15,15,0.95)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #ff7800, #ff4500)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                AB
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#f0f0f0" }}>
                  Ask Me ABot Anything !
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#555",
                fontSize: "20px",
                cursor: "pointer",
                lineHeight: 1,
                padding: "4px",
                borderRadius: "4px",
                transition: "color 0.15s",
              }}
              onMouseEnter={e => (e.target.style.color = "#aaa")}
              onMouseLeave={e => (e.target.style.color = "#555")}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              scrollbarWidth: "thin",
              scrollbarColor: "#222 transparent",
            }}
          >
            {history.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  padding: "9px 12px",
                  borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background:
                    m.role === "user"
                      ? "linear-gradient(135deg, #ff7800, #ff4500)"
                      : "#1c1c1c",
                  color: m.role === "user" ? "#fff" : "#d4d4d4",
                  border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  display: "flex",
                  gap: "4px",
                  padding: "10px 14px",
                  background: "#1c1c1c",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px 12px 12px 2px",
                }}
              >
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#ff7800",
                      display: "inline-block",
                      animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              padding: "12px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              background: "linear-gradient(180deg, #050505, #121212)",
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Type your question here..."
              style={{
                flex: 1,
                fontSize: "13px",
                padding: "8px 12px",
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                color: "#e0e0e0",
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={e => (e.target.style.borderColor = "#ff7800")}
              onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                background: loading || !input.trim() ? "#2a2a2a" : "linear-gradient(135deg, #222222, #000000)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                padding: "8px 14px",
                color: loading || !input.trim() ? "#555" : "#fff",
                fontSize: "13px",
                fontWeight: 500,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                transition: "opacity 0.15s",
                flexShrink: 0,
              }}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          title="Chat with Abot"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ff7800, #ff4500)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(255,120,0,0.35)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = "0 6px 28px rgba(255,120,0,0.5)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,120,0,0.35)";
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.144 2 11.25c0 2.13.793 4.09 2.103 5.63L2.5 21.5l4.94-1.583A10.6 10.6 0 0 0 12 20.5c5.523 0 10-4.144 10-9.25S17.523 2 12 2Z" fill="white" fillOpacity="0.95"/>
          </svg>
        </button>
      )}

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
