"use client";

import { useEffect, useRef, useState } from "react";
import { X, RotateCcw, ArrowUp, ImagePlus, ThumbsUp, ThumbsDown, MessageSquare, Check } from "./icons";
import { useI18n } from "../i18n/I18nProvider";

const WHATSAPP_NUMBER = "971582621717";
const INTRO_ID = 1;

/** Photos are sent to the model as a JPEG no wider than 1280px. */
async function shrinkImage(file) {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return { mime: "image/jpeg", data: canvas.toDataURL("image/jpeg", 0.82).split(",")[1] };
  } catch {
    return undefined;
  }
}

export function AskAIWidget() {
  const { lang, dict } = useI18n();
  const t = dict.askAi;
  const isRtl = lang === "ar";

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => [{ id: INTRO_ID, role: "assistant", content: t.intro }]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [slow, setSlow] = useState(false);
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const endRef = useRef(null);
  const nextId = useRef(2);

  // Reset to the intro message in the new language if the visitor switches
  // language while the widget has never been used.
  useEffect(() => {
    setMessages((current) => (current.length === 1 && current[0].id === INTRO_ID ? [{ id: INTRO_ID, role: "assistant", content: t.intro }] : current));
  }, [t.intro]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const MAX = 160;
    el.style.height = "auto";
    const next = input ? Math.min(el.scrollHeight, MAX) : 40;
    el.style.height = `${next}px`;
    el.style.overflowY = input && el.scrollHeight > MAX ? "auto" : "hidden";
  }, [input, open]);

  useEffect(() => {
    if (!open || (messages.length === 1 && !pending)) return;
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, pending, open]);

  // Any page can open the widget without holding a reference to it — dispatch
  // "askai:open" on window (e.g. from a "Ask AI" link elsewhere on a page).
  useEffect(() => {
    const openFromPage = () => setOpen(true);
    window.addEventListener("askai:open", openFromPage);
    return () => window.removeEventListener("askai:open", openFromPage);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    if (!pending) return;
    const timer = window.setTimeout(() => setSlow(true), 6000);
    return () => window.clearTimeout(timer);
  }, [pending]);

  const reset = () => {
    setMessages([{ id: INTRO_ID, role: "assistant", content: t.intro }]);
    setInput("");
  };

  const requestReply = async (nextMessages, image) => {
    setSlow(false);
    setPending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.map(({ role, content }) => ({ role, content })), image }),
      });
      const data = await response.json();
      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: "assistant",
          content: response.ok && data.reply ? data.reply : data.error || t.unavailable,
          error: !response.ok,
          quoteSent: !!data.quoteSent,
        },
      ]);
    } catch {
      setMessages((current) => [...current, { id: nextId.current++, role: "assistant", content: t.unavailable, error: true }]);
    } finally {
      setPending(false);
    }
  };

  const send = async (suggestion) => {
    const content = (suggestion ?? input).trim();
    if (!content || pending) return;
    const userMessage = { id: nextId.current++, role: "user", content: content.slice(0, 600) };
    const nextMessages = [...messages.filter((m) => !m.error), userMessage];
    setMessages(nextMessages);
    setInput("");
    await requestReply(nextMessages);
  };

  const sendPhoto = async (file) => {
    if (pending) return;
    const preview = URL.createObjectURL(file);
    const userMessage = { id: nextId.current++, role: "user", content: file.name, image: preview };
    const nextMessages = [...messages.filter((m) => !m.error), userMessage];
    setMessages(nextMessages);
    const image = await shrinkImage(file);
    await requestReply(nextMessages, image);
  };

  const vote = (id, choice) => {
    setMessages((current) => current.map((m) => (m.id === id ? { ...m, vote: choice } : m)));
  };

  const waMessage = encodeURIComponent(lang === "ar" ? "مرحباً! أرغب بالتواصل بخصوص مشروعي." : "Hello! I'd like to get in touch about my project.");
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div className={`ask-ai-root ${isRtl ? "ask-ai-root--rtl" : ""}`}>
      {open && (
        <>
          <button type="button" aria-label={t.close} onClick={() => setOpen(false)} className="ask-ai-scrim" />
          <section role="dialog" aria-modal="true" aria-labelledby="ask-ai-title" className="ask-ai-panel">
            <span aria-hidden className="ask-ai-grabber" />

            <header className="ask-ai-header">
              <div className="ask-ai-header-copy">
                <h2 id="ask-ai-title">{t.title}</h2>
                <p>{t.subtitle}</p>
              </div>
              <div className="ask-ai-header-actions">
                <button type="button" onClick={reset} aria-label={t.startOver} className="ask-ai-icon-btn">
                  <RotateCcw size={19} />
                </button>
                <button type="button" onClick={() => setOpen(false)} aria-label={t.close} className="ask-ai-icon-btn">
                  <X size={20} />
                </button>
              </div>
            </header>

            <div className="ask-ai-log" role="log" aria-live="polite" aria-busy={pending}>
              <ol>
                {messages.map((message) =>
                  message.role === "user" ? (
                    <li key={message.id} className="ask-ai-msg ask-ai-msg--user">
                      {message.image ? (
                        // eslint-disable-next-line @next/next/no-img-element -- local object URL from the visitor's own file
                        <img src={message.image} alt="" className="ask-ai-msg-image" />
                      ) : (
                        <p className="ask-ai-bubble">{message.content}</p>
                      )}
                    </li>
                  ) : (
                    <li key={message.id} className="ask-ai-msg ask-ai-msg--assistant">
                      <p className={message.error ? "ask-ai-text ask-ai-text--error" : "ask-ai-text"}>{message.content}</p>
                      {message.quoteSent && (
                        <span className="ask-ai-quote-badge"><Check size={14} /> Quote request sent</span>
                      )}
                      {message.id !== INTRO_ID && !message.error ? (
                        <div className="ask-ai-vote">
                          {["up", "down"].map((choice) =>
                            message.vote && message.vote !== choice ? null : (
                              <button
                                key={choice}
                                type="button"
                                disabled={!!message.vote}
                                onClick={() => vote(message.id, choice)}
                                aria-label={choice === "up" ? t.helpful : t.notHelpful}
                                aria-pressed={message.vote === choice}
                                className={`ask-ai-icon-btn ask-ai-icon-btn--small ${message.vote === choice ? "is-active" : ""}`}
                              >
                                {choice === "up" ? <ThumbsUp size={15} /> : <ThumbsDown size={15} />}
                              </button>
                            )
                          )}
                        </div>
                      ) : null}
                    </li>
                  )
                )}

                {messages.length === 1 && (
                  <li className="ask-ai-starters">
                    {t.starters.map((starter) => (
                      <button key={starter} type="button" onClick={() => send(starter)} className="ask-ai-starter">
                        {starter}
                      </button>
                    ))}
                  </li>
                )}

                {pending && (
                  <li>
                    <span aria-hidden className="ask-ai-typing">
                      <span className="ask-ai-dot" />
                      <span className="ask-ai-dot" />
                      <span className="ask-ai-dot" />
                    </span>
                    <p className="sr-only">{t.typing}</p>
                    {slow && <p className="ask-ai-slow">{t.slow}</p>}
                  </li>
                )}
              </ol>
              <div ref={endRef} />
            </div>

            <div className="ask-ai-composer-wrap">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  send();
                }}
                className="ask-ai-composer"
              >
                <button type="button" onClick={() => fileRef.current?.click()} aria-label={t.addPhoto} className="ask-ai-icon-btn">
                  <ImagePlus size={19} />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) sendPhoto(file);
                    event.target.value = "";
                  }}
                />
                <label htmlFor="ask-ai-message" className="sr-only">{t.inputLabel}</label>
                <textarea
                  ref={inputRef}
                  id="ask-ai-message"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      send();
                    }
                  }}
                  rows={1}
                  maxLength={600}
                  placeholder={t.placeholder}
                  className="ask-ai-textarea"
                />
                <button type="submit" disabled={!input.trim() || pending} aria-label={t.send} className="ask-ai-send-btn">
                  <ArrowUp size={19} style={isRtl ? { transform: "scaleX(-1)" } : undefined} />
                </button>
              </form>
              <p className="ask-ai-disclaimer">
                {t.disclaimerPrefix}{" "}
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  {t.disclaimerLink}
                </a>
                .
              </p>
            </div>
          </section>
        </>
      )}

      {!open && (
        <button type="button" onClick={() => setOpen(true)} aria-expanded="false" className="ask-ai-launcher">
          <MessageSquare size={17} aria-hidden="true" />
          {t.buttonLabel}
        </button>
      )}
    </div>
  );
}
