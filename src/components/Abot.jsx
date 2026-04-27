import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const API = "https://anuragbb-abot.hf.space/chat";

const GREETING = {
  role: "assistant",
  content:
    "Hey! I'm **Abot** — Anurag's personal AI assistant.\nAsk me anything about his **projects**, **skills**, or **experience**!",
};

function bubbleStyle(role) {
  return {
    alignSelf: role === "user" ? "flex-end" : "flex-start",
    maxWidth: "88%",
    minWidth: 0,
    fontSize: "13px",
    lineHeight: "1.6",
    padding: "10px 13px",
    borderRadius:
      role === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
    background:
      role === "user"
        ? "linear-gradient(135deg, #ff7800, #ff4500)"
        : "#1c1c1c",
    color: role === "user" ? "#fff" : "#d4d4d4",
    border: role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
    wordBreak: "break-word",
    overflowWrap: "break-word",
  };
}

const md = {
  p: ({ children }) => (
    <p style={{ margin: "0 0 6px", lineHeight: "1.6" }}>{children}</p>
  ),
  ul: ({ children }) => (
    <ul style={{ margin: "4px 0 6px", paddingLeft: "18px" }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol style={{ margin: "4px 0 6px", paddingLeft: "18px" }}>{children}</ol>
  ),
  li: ({ children }) => (
    <li style={{ marginBottom: "4px", lineHeight: "1.5" }}>{children}</li>
  ),
  h1: ({ children }) => (
    <h1 style={{ margin: "8px 0 4px", fontSize: "14px", fontWeight: 700, color: "#ff9940" }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 style={{ margin: "8px 0 4px", fontSize: "13.5px", fontWeight: 700, color: "#ff9940" }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ margin: "6px 0 3px", fontSize: "13px", fontWeight: 600, color: "#ffb066" }}>
      {children}
    </h3>
  ),
  strong: ({ children }) => (
    <strong style={{ color: "#ff9940", fontWeight: 600 }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em style={{ color: "#ccc", fontStyle: "italic" }}>{children}</em>
  ),
  // inline code — unchanged from original
  code: ({ children }) => (
    <code
      style={{
        background: "#111",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "4px",
        padding: "1px 5px",
        fontSize: "12px",
        color: "#ff9940",
        fontFamily: "monospace",
        wordBreak: "break-all",
      }}
    >
      {children}
    </code>
  ),
  // pre wraps block code fences — needs overflowX:auto so it scrolls
  // instead of expanding the bubble horizontally
  pre: ({ children }) => (
    <pre
      style={{
        margin: "6px 0",
        padding: "8px 10px",
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "6px",
        overflowX: "auto",
        fontSize: "11px",
        fontFamily: "monospace",
        whiteSpace: "pre",
        color: "#ff9940",
      }}
    >
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#ff9940",
        textDecoration: "underline",
        wordBreak: "break-all",
      }}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <div
      style={{
        borderLeft: "3px solid #ff7800",
        paddingLeft: "10px",
        margin: "4px 0",
        color: "#aaa",
        fontStyle: "italic",
      }}
    >
      {children}
    </div>
  ),
  table: ({ children }) => (
    <div style={{ overflowX: "auto", fontSize: "12px", margin: "4px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th
      style={{
        padding: "4px 8px",
        background: "#2a2a2a",
        color: "#ff9940",
        textAlign: "left",
        border: "1px solid rgba(255,255,255,0.1)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td
      style={{
        padding: "4px 8px",
        border: "1px solid rgba(255,255,255,0.07)",
        verticalAlign: "top",
      }}
    >
      {children}
    </td>
  ),
  hr: () => (
    <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.07)", margin: "8px 0" }} />
  ),
};

const GLOBAL_STYLE = `
  @keyframes abotBounce {
    0%,60%,100% { transform:translateY(0); opacity:.35; }
    30%          { transform:translateY(-5px); opacity:1; }
  }
  .abot-message li > p { margin: 0 !important; }
  .abot-msg-scroll::-webkit-scrollbar { width: 4px; }
  .abot-msg-scroll::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 4px; }
`;

export default function Abot() {
  const [open, setOpen] = useState(false);
  // displayHistory includes the greeting for rendering
  // apiHistory is only real turns — never send the greeting to the backend
  const [displayHistory, setDisplayHistory] = useState([GREETING]);
  const [apiHistory, setApiHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayHistory, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  async function send() {
    const question = input.trim();
    if (!question || loading) return;
    setInput("");
    setLoading(true);

    const userMsg = { role: "user", content: question };
    const newDisplay = [...displayHistory, userMsg];
    const newApi = [...apiHistory, userMsg];
    setDisplayHistory(newDisplay);

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history: newApi }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const assistantMsg = { role: "assistant", content: data.answer };
      setDisplayHistory([...newDisplay, assistantMsg]);
      setApiHistory([...newApi, assistantMsg]);
    } catch {
      setDisplayHistory([
        ...newDisplay,
        { role: "assistant", content: "Something went wrong — please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const sendDisabled = loading || !input.trim();

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
        zIndex: 50,
      }}
    >
      <style>{GLOBAL_STYLE}</style>

      {open && (
        <div
          style={{
            width: "calc(100vw - 32px)",
            maxWidth: "360px",
            height: "min(520px, 80vh)",
            background: "linear-gradient(180deg, #050505, #121212)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 32px 64px rgba(0,0,0,0.8)",
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
              background: "rgba(12,12,12,0.98)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #ff7800, #ff4500)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="7" width="16" height="10" rx="3" fill="white" />
                  <circle cx="9" cy="12" r="1.5" fill="#ff7800" />
                  <circle cx="15" cy="12" r="1.5" fill="#ff7800" />
                  <rect x="9" y="3" width="6" height="3" rx="1.5" fill="white" />
                </svg>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#f0f0f0",
                }}
              >
                Ask Me ABot Anything!
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#555",
                fontSize: "20px",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            className="abot-msg-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {displayHistory.map((m, i) => (
              <div key={i} className="abot-message" style={bubbleStyle(m.role)}>
                {m.role === "assistant" ? (
                  <ReactMarkdown components={md}>{m.content}</ReactMarkdown>
                ) : (
                  m.content
                )}
              </div>
            ))}

            {loading && (
              <div style={bubbleStyle("assistant")}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#ff7800",
                      margin: "0 2px",
                      animation: `abotBounce 1s ${i * 0.2}s infinite`,
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
              background: "rgba(5,5,5,0.98)",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about projects, skills…"
              disabled={loading}
              style={{
                flex: 1,
                fontSize: "14px",
                padding: "10px 14px",
                background: "#111",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                color: "#e0e0e0",
                outline: "none",
              }}
            />
            <button
              onClick={send}
              disabled={sendDisabled}
              style={{
                background: sendDisabled
                  ? "#2a2a2a"
                  : "linear-gradient(135deg, #ff7800, #ff4500)",
                border: "none",
                borderRadius: "8px",
                padding: "10px 14px",
                color: sendDisabled ? "#555" : "#fff",
                fontSize: "14px",
                fontWeight: 500,
                cursor: sendDisabled ? "not-allowed" : "pointer",
                flexShrink: 0,
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      {!open && (
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
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.477 2 2 6.144 2 11.25c0 2.13.793 4.09 2.103 5.63L2.5 21.5l4.94-1.583A10.6 10.6 0 0 0 12 20.5c5.523 0 10-4.144 10-9.25S17.523 2 12 2Z"
              fill="white"
              fillOpacity="0.95"
            />
          </svg>
        </button>
      )}
    </div>
  );
}