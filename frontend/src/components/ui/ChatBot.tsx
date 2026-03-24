import { AI_SYSTEM_PROMPT } from "../../../../constants/data";
import { CHIPS } from "../../../../constants/data";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
    role: "user" | "assistant";
    content: string;
}

interface ChatMessage {
    id: string;
    role: "user" | "bot";
    content: string;
}

// ─── Groq API key — replace with your key or load from env ───────────────────
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY ?? "";

// ─── Groq API call ────────────────────────────────────────────────────────────
async function callGroq(messages: Message[]): Promise<string> {
    const apiKey = GROQ_API_KEY;
    if (!apiKey) {
        throw new Error(
            "No API key configured. Please set VITE_GROQ_API_KEY in your .env file."
        );
    }

    const models = [
        "llama-3.1-8b-instant",
        "llama3-8b-8192",
        "gemma2-9b-it",
        "mixtral-8x7b-32768",
    ];

    const payload = (model: string) =>
        JSON.stringify({
            model,
            max_tokens: 500,
            messages: [{ role: "system", content: AI_SYSTEM_PROMPT }, ...messages],
        });

    for (const model of models) {
        try {
            const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: payload(model),
            });
            const data = await res.json();
            const text: string | undefined = data.choices?.[0]?.message?.content;
            if (res.ok && text) return text;
            if (data.error?.message) throw new Error(data.error.message);
        } catch (e) {
            const err = e as Error;
            if (!err.message?.toLowerCase().includes("fetch") && !err.message?.toLowerCase().includes("failed")) {
                throw err;
            }
        }
    }
    throw new Error(
        "All Groq models are currently unavailable. Please try again shortly."
    );
}

// ─── Tiny markdown renderer (bold, code, newlines) ───────────────────────────
function renderMarkdown(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-white'>$1</strong>")
        .replace(/`(.*?)`/g, "<code class='bg-zinc-900 text-zinc-300 px-1 py-0.5 rounded text-xs border border-zinc-700'>$1</code>")
        .replace(/\n/g, "<br />");
}

// ─── Message bubble ───────────────────────────────────────────────────────────
function Bubble({ msg }: { msg: ChatMessage }) {
    const isBot = msg.role === "bot";
    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`flex items-end gap-2.5 ${isBot ? "justify-start" : "justify-end"}`}
        >
            {isBot && (
                <div className="w-6 h-6 rounded flex items-center justify-center bg-zinc-800 text-zinc-300 text-[10px] font-bold flex-shrink-0 mb-1 border border-zinc-700">
                    PR
                </div>
            )}
            <div
                className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed break-words ${isBot
                        ? "bg-zinc-800 text-zinc-200 rounded-2xl rounded-bl-sm border border-zinc-700/50"
                        : "bg-blue-600 text-white rounded-2xl rounded-br-sm shadow-sm"
                    }`}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
            />
        </motion.div>
    );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-end gap-2.5 justify-start"
        >
            <div className="w-6 h-6 rounded flex items-center justify-center bg-zinc-800 text-zinc-300 text-[10px] font-bold flex-shrink-0 border border-zinc-700">
                PR
            </div>
            <div className="px-4 py-3.5 bg-zinc-800 rounded-2xl rounded-bl-sm border border-zinc-700/50 flex gap-1.5 items-center">
                {[0, 0.2, 0.4].map((delay, i) => (
                    <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-zinc-500"
                        animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay, ease: "easeInOut" }}
                    />
                ))}
            </div>
        </motion.div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PlasticRendersChat() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [history, setHistory] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [showChips, setShowChips] = useState(true);
    const [notif, setNotif] = useState(true);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open && messages.length === 0) {
            const welcome: ChatMessage = {
                id: crypto.randomUUID(),
                role: "bot",
                content:
                    "Hi there. I'm the Plastic Renders AI assistant. I can help you explore our services, answer questions about pricing, or help you get started on a project.\n\nHow can I help you today?",
            };
            setMessages([welcome]);
            setHistory([{ role: "assistant", content: welcome.content }]);
        }
    }, [open, messages.length]);

    useEffect(() => {
        if (!open) return;
        const el = messagesContainerRef.current;
        if (!el) return;
        const allMessages = el.querySelectorAll(".chat-msg-container");
        const last = allMessages[allMessages.length - 1] as HTMLElement | undefined;
        if (last) {
            el.scrollTop = last.offsetTop - 12;
        }
    }, [messages, typing, open]);

    const autoResize = useCallback(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }, []);

    const handleOpen = () => {
        setOpen(true);
        setNotif(false);
        setTimeout(() => textareaRef.current?.focus(), 100);
    };

    const handleClose = () => setOpen(false);

    const clearChat = () => {
        setMessages([]);
        setHistory([]);
        setShowChips(true);
    };

    const send = useCallback(
        async (text?: string) => {
            const msg = (text ?? input).trim();
            if (!msg || typing) return;

            setInput("");
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
            setShowChips(false);

            const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: msg };
            const newHistory: Message[] = [...history, { role: "user", content: msg }];
            setMessages((prev) => [...prev, userMsg]);
            setHistory(newHistory);
            setTyping(true);

            try {
                const reply = await callGroq(newHistory);
                const botMsg: ChatMessage = { id: crypto.randomUUID(), role: "bot", content: reply };
                setMessages((prev) => [...prev, botMsg]);
                setHistory((prev) => [...prev, { role: "assistant", content: reply }]);
            } catch (err) {
                const e = err as Error;
                const errMsg = e.message?.includes("API key")
                    ? "API key missing. Please set **VITE_GROQ_API_KEY** in your `.env` file.\n\nAlternatively, contact the team at **plasticrenders@gmail.com**"
                    : "An error occurred. Please contact us at **plasticrenders@gmail.com**";
                setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "bot", content: errMsg }]);
            } finally {
                setTyping(false);
                setTimeout(() => textareaRef.current?.focus(), 50);
            }
        },
        [input, typing, history]
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    return (
        <>
            {/* ── Chat window ── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="chat-window"
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed bottom-24 left-5 z-[9999] flex flex-col bg-zinc-950 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] border border-zinc-800 overflow-hidden"
                        style={{ width: "clamp(320px, 90vw, 380px)", height: "550px" }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-950 flex-shrink-0">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-zinc-100 text-sm font-semibold leading-none mb-1.5">
                                        Plastic Renders Support
                                    </h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span className="text-zinc-500 text-xs font-medium">Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={clearChat}
                                    title="Clear conversation"
                                    className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                                >
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleClose}
                                    title="Close window"
                                    className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                                >
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div
                            ref={messagesContainerRef}
                            /* overscroll-contain specifically stops the page behind the chat from scrolling */
                            className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 flex flex-col gap-4 bg-zinc-950"
                            style={{ scrollbarWidth: "thin", scrollbarColor: "#3f3f46 transparent" }}
                            onWheel={(e) => e.stopPropagation()}
                        >
                            {messages.map((m) => (
                                <div key={m.id} className="chat-msg-container">
                                    <Bubble msg={m} />
                                </div>
                            ))}
                            <AnimatePresence>{typing && <TypingIndicator />}</AnimatePresence>
                        </div>

                        {/* Quick reply chips */}
                        <AnimatePresence>
                            {showChips && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex flex-wrap gap-2 px-5 py-3 bg-zinc-950 border-t border-zinc-800"
                                >
                                    {CHIPS.map((chip) => (
                                        <button
                                            key={chip}
                                            onClick={() => send(chip)}
                                            className="px-3.5 py-1.5 rounded-full text-xs font-medium border border-zinc-700 text-zinc-300 bg-zinc-900 hover:bg-zinc-800 hover:text-zinc-100 hover:border-zinc-600 transition-colors whitespace-nowrap"
                                        >
                                            {chip}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Input bar */}
                        <div className="px-4 py-4 bg-zinc-950 border-t border-zinc-800">
                            <div className="flex items-end gap-2 bg-zinc-900 border border-zinc-700 rounded-xl focus-within:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-800/50 transition-all p-1.5 shadow-sm">
                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={(e) => { setInput(e.target.value); autoResize(); }}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type your message..."
                                    rows={1}
                                    className="flex-1 max-h-[120px] min-h-[36px] bg-transparent text-sm text-zinc-100 placeholder-zinc-500 resize-none outline-none py-2 px-3 leading-relaxed"
                                />
                                <button
                                    onClick={() => send()}
                                    disabled={typing || !input.trim()}
                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-100 text-zinc-900 flex-shrink-0 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white mb-0.5 mr-0.5"
                                >
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                </button>
                            </div>
                            <div className="text-center mt-3">
                                <span className="text-[10px] text-zinc-500 font-medium">
                                    Powered by <a href="https://groq.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-zinc-300 transition-colors">Groq</a>
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Toggle button ── */}
            <motion.button
                onClick={open ? handleClose : handleOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 left-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white shadow-lg border border-blue-500 transition-colors"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {open ? (
                        <motion.svg
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </motion.svg>
                    ) : (
                        <motion.svg
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </motion.svg>
                    )}
                </AnimatePresence>

                {/* Notification dot */}
                <AnimatePresence>
                    {notif && !open && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-zinc-900"
                        />
                    )}
                </AnimatePresence>
            </motion.button>
        </>
    );
}