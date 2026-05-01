import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hey, I'm the USHER Assistant. Ask me about our services, process, or how we can help with your project.",
};

const SUGGESTIONS = [
  "What services do you offer?",
  "How does your process work?",
  "Can you build an AI chatbot for me?",
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m !== WELCOME),
        }),
      });
      if (!res.ok) throw new Error("request_failed");
      const data = (await res.json()) as { reply?: string };
      setMessages((cur) => [
        ...cur,
        {
          role: "assistant",
          content: data.reply || "Hmm, I didn't catch that. Could you rephrase?",
        },
      ]);
    } catch {
      setMessages((cur) => [
        ...cur,
        {
          role: "assistant",
          content:
            "I'm having trouble reaching the server right now. Please try again in a moment, or use the Contact page to reach us directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[80] w-14 h-14 rounded-full bg-gradient-signature text-white shadow-xl shadow-primary/30 flex items-center justify-center"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="m"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-24 right-3 left-3 md:left-auto md:right-8 md:bottom-28 z-[80] w-auto md:w-[380px] max-h-[70vh] md:max-h-[560px] flex flex-col rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative px-4 py-3 border-b border-border/60 bg-gradient-to-r from-primary/15 via-transparent to-purple-500/15">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-signature flex items-center justify-center text-white font-bold text-sm shrink-0">
                  U
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground leading-tight truncate">
                    USHER Assistant
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Online — usually replies instantly
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-sm"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-signature text-white rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground px-3.5 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-xs">Thinking…</span>
                  </div>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-primary/5 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="p-3 border-t border-border/60 bg-background/80"
            >
              <div className="flex items-center gap-2 bg-muted/60 rounded-full pl-4 pr-1.5 py-1.5 focus-within:ring-2 focus-within:ring-primary/50 transition">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our services…"
                  disabled={loading}
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="w-9 h-9 rounded-full bg-gradient-signature text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 text-center">
                Powered by AI · Responses may need verification
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
