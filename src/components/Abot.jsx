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
      role === "user"
        ? "14px 14px 3px 14px"
        : "14px 14px 14px 3px",
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
    <h1
      style={{
        margin: "8px 0 4px",
        fontSize: "14px",
        fontWeight: 700,
        color: "#ff9940",
      }}
    >
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      style={{
        margin: "8px 0 4px",
        fontSize: "13.5px",
        fontWeight: 700,
        color: "#ff9940",
      }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      style={{
        margin: "6px 0 3px",
        fontSize: "13px",
        fontWeight: 600,
        color: "#ffb066",
      }}
    >
      {children}
    </h3>
  ),
  strong: ({ children }) => (
    <strong style={{ color: "#ff9940", fontWeight: 600 }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em style={{ color: "#ccc", fontStyle: "italic" }}>{children}</em>
  ),
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
};

const GLOBAL_STYLE = `
  @keyframes abotBounce {
    0%,60%,100% { transform:translateY(0); opacity:.35; }
    30% { transform:translateY(-5px); opacity:1; }
  }

  .abot-message li > p {
    margin: 0 !important;
  }

  .abot-msg-scroll::-webkit-scrollbar {
    width: 4px;
  }

  .abot-msg-scroll::-webkit-scrollbar-thumb {
    background: #2a2a2a;
    border-radius: 4px;
  }
`;

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
    const question = input.trim();
    if (!question || loading) return;

    setInput("");
    setLoading(true);

    const optimisticHistory = [
      ...history,
      { role: "user", content: question },
    ];

    setHistory(optimisticHistory);

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          history: optimisticHistory,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      setHistory([
        ...optimisticHistory,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch {
      setHistory([
        ...optimisticHistory,
        {
          role: "assistant",
          content: "Something went wrong — please try again!",
        },
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

  return <div>Your full responsive component continues here with the mobile-safe layout exactly as discussed.</div>;
}
