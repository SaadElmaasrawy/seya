"use client";
// Force rebuild
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";

function Typewriter({
  prefix = "",
  words = [],
  typeSpeed = 50,
  deleteSpeed = 30,
  delayBeforeDelete = 2000,
  delayBeforeType = 500
}: {
  prefix?: string;
  words?: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBeforeDelete?: number;
  delayBeforeType?: number;
}) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length] || "";
    const fullText = prefix + currentWord;

    const handleTyping = () => {
      if (isDeleting) {
        setText(prev => prev.slice(0, -1));
        if (text.length <= prefix.length) {
          setIsDeleting(false);
          setWordIndex(prev => prev + 1);
        }
      } else {
        setText(fullText.slice(0, text.length + 1));
        if (text === fullText) {
          setTimeout(() => setIsDeleting(true), delayBeforeDelete);
          return;
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, prefix, typeSpeed, deleteSpeed, delayBeforeDelete]);

  return (
    <span>
      {text}
      <span className={styles.cursor}></span>
    </span>
  );
}

export default function ChatPage() {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  type Message = { role: "user" | "assistant"; content: string };
  type Chat = { id: string; title: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const clientWebhook = process.env.NEXT_PUBLIC_WEBHOOK_URL;

  const isArabic = (s: string) => /[\u0600-\u06FF]/.test(s);

  function adjustHeight() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const maxPx = Math.floor(window.innerHeight * 0.2);
    const next = Math.min(el.scrollHeight, maxPx);
    el.style.height = `${next}px`;
  }

  useEffect(() => {
    adjustHeight();
  }, [text]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/chat/history", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (res.ok && Array.isArray(data?.items)) {
          setChats(data.items);
        }
      } catch { }
    })();
  }, []);


  function handleNewChat() {
    const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    setCurrentChatId(id);
    setMessages([]);
    setText("");
    setSidebarOpen(false); // Close sidebar on mobile when starting new chat
    const el = textareaRef.current;
    if (el) el.focus();
    adjustHeight();
  }

  async function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    try {
      await fetch("/api/auth/me", { method: "DELETE" });
    } finally {
      router.push("/");
    }
  }

  async function doSend() {
    if (!text.trim() || sending) return;
    setSending(true);
    const userText = text.trim();
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setText("");

    let chatId = currentChatId;
    if (!chatId) {
      chatId = Math.random().toString(36).slice(2) + Date.now().toString(36);
      setCurrentChatId(chatId);
      const title = userText.slice(0, 40);
      setChats((prev) => [{ id: chatId!, title }, ...prev]);
    } else if (!chats.some((c) => c.id === chatId)) {
      const title = userText.slice(0, 40);
      setChats((prev) => [{ id: chatId!, title }, ...prev]);
    }

    // Save user message
    fetch("/api/chat/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, message: userText, role: "user", content: userText }),
    }).catch((e) => console.error("Failed to save session:", e));

    try {
      let output = "";
      let usedClient = false;

      if (clientWebhook) {
        try {
          const meRes = await fetch("/api/auth/me");
          const me = await meRes.json().catch(() => null);
          const uid = me?.user?.uid || me?.uid || me?.user?.id;

          const r = await fetch(clientWebhook, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ userId: uid, message: userText, chatId }),
            cache: "no-store",
          });

          const ct = r.headers.get("content-type") || "";
          if (!r.ok) {
            let errText = "";
            if (ct.includes("application/json")) {
              const ej = await r.json().catch(() => null);
              errText = typeof ej?.error === "string" ? ej.error : JSON.stringify(ej || {});
            } else {
              errText = await r.text();
            }
            throw new Error(errText || "Webhook error");
          }

          if (ct.includes("application/json")) {
            const j = await r.json().catch(() => null);
            output = typeof j?.output === "string" ? j.output : JSON.stringify(j || {});
          } else {
            output = await r.text();
          }
          usedClient = true;
        } catch (e: any) {
          console.error("Client webhook failed", e);
        }
      }

      if (!usedClient) {
        const res = await fetch("/api/webhook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText, chatId }),
        });

        const data = await res.json().catch(() => null);

        if (res.ok) {
          if (data && typeof data.output === "string") {
            output = data.output;
          } else if (data && typeof data.body === "string") {
            try {
              const parsed = JSON.parse(data.body);
              output = typeof parsed?.output === "string" ? parsed.output : data.body;
            } catch {
              output = data.body;
            }
          } else {
            output = JSON.stringify(data || {});
          }
        } else if (res.status === 401) {
          setMessages((prev) => [...prev, { role: "assistant", content: "Unauthorized: يرجى تسجيل الدخول" }]);
          router.push("/auth/login?next=/chat");
          return;
        } else {
          const err = data?.error || "Failed to get response";
          throw new Error(err);
        }
      }

      // Save assistant message
      await fetch("/api/chat/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, role: "assistant", content: output }),
      });

      setMessages((prev) => [...prev, { role: "assistant", content: output }]);

    } catch (e: any) {
      const msg = typeof e?.message === "string" ? e.message : "Error sending message";
      setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${msg}` }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#09090b] border-b border-[#1c1c1e] flex items-center justify-between px-4 z-50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white p-2 -ml-2"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <img alt="SEYA" src="/seyaLogo.svg" className="h-6 w-auto" />
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>

        {/* Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-[9998] md:hidden animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* gated by middleware */}
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
          <div className={styles.sidebarHeader}>
            <div
              className={styles.logo}
              style={{
                backgroundImage:
                  "url(https://lh3.googleusercontent.com/aida-public/AB6AXuDT09l8QvIHHuWCSLtqlduyTPm2IbDtrRaeyzp_ixeIhc_ErVGG0DpIiELJELnqtU9-l2E7_q0ii0aok0_BuYIrFI0wYbwwzLKPqBGKcUPrOzd_3Hp9GqYenClq0UACg6_DJKBuFtJ3DgDKIwzHlF8z2wN7d8YsFirl3aGDy0FnS2RIKltAfYzK-aiXkMpXMxu59v9Q3CY4Rev8dNsnObpyrAwOggo_nZBPebUoF3MdZDojfDBeGTXWoxXFhfDIcfEsEHRTfe6uKAk)",
              }}
            />
            <div className={styles.brandInfo}>
              <h1 className={styles.brandName}>SEYA AI</h1>
              <p className={styles.brandSubtitle}>AI Writer Agent</p>
            </div>

            {/* Close button for mobile */}
            <button
              className="md:hidden ml-auto text-white p-2"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <button onClick={handleNewChat} className={styles.newChatBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>add</span>
            <span>New Chat</span>
          </button>

          <div className={styles.historySection}>
            <p className={styles.sectionTitle}>History</p>
            {chats.length === 0 && (
              <div style={{ padding: "0.5rem 0.75rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>No chats yet</div>
            )}
            {chats.map((c) => (
              <button
                key={c.id}
                onClick={async () => {
                  setLoadingHistory(true);
                  setMessages([]);
                  setSidebarOpen(false); // Close sidebar on mobile
                  try {
                    const res = await fetch(`/api/chat/history/${encodeURIComponent(c.id)}`, { cache: "no-store" });
                    const data = await res.json().catch(() => null);
                    if (res.ok && Array.isArray(data?.messages)) {
                      setMessages(data.messages);
                      setCurrentChatId(c.id);
                    } else {
                      const err = (data && (data.error || JSON.stringify(data))) || "Failed to load chat";
                      setMessages([{ role: "assistant", content: String(err) }]);
                    }
                  } catch (e: any) {
                    setMessages([{ role: "assistant", content: String(e?.message || "Failed to load chat") }]);
                  } finally {
                    setLoadingHistory(false);
                  }
                }}
                className={`${styles.historyItem} ${currentChatId === c.id ? styles.historyItemActive : ""}`}
              >
                <span className={`material-symbols-outlined ${styles.historyIcon}`}>chat_bubble</span>
                <span className={styles.historyText} title={c.title}>{c.title}</span>
              </button>
            ))}
          </div>

          <div className={styles.bottomNav}>
            <a className={styles.navItem} href="#">
              <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>settings</span>
              <span>Settings</span>
            </a>
            <a className={styles.navItem} href="#" onClick={handleLogout}>
              <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>logout</span>
              <span>Logout</span>
            </a>
          </div>
        </aside>

        <main className={styles.main}>
          <div className={styles.messagesContainer}>
            <div className={styles.messagesWrapper}>
              {messages.length === 0 && !loadingHistory ? (
                <div className={styles.welcomeContainer}>
                  <div
                    className={styles.welcomeIcon}
                    style={{
                      backgroundImage:
                        "url(https://lh3.googleusercontent.com/aida-public/AB6AXuDT09l8QvIHHuWCSLtqlduyTPm2IbDtrRaeyzp_ixeIhc_ErVGG0DpIiELJELnqtU9-l2E7_q0ii0aok0_BuYIrFI0wYbwwzLKPqBGKcUPrOzd_3Hp9GqYenClq0UACg6_DJKBuFtJ3DgDKIwzHlF8z2wN7d8YsFirl3aGDy0FnS2RIKltAfYzK-aiXkMpXMxu59v9Q3CY4Rev8dNsnObpyrAwOggo_nZBPebUoF3MdZDojfDBeGTXWoxXFhfDIcfEsEHRTfe6uKAk)",
                    }}
                  />
                  <h2 className={styles.welcomeTitle}>Welcome to Seya</h2>
                  <p className={styles.welcomeSubtitle}>
                    <Typewriter
                      prefix="We can help you with "
                      words={[
                        "Article writing",
                        "Tweet and X Thread writing",
                        "LinkedIn Post writing",
                        "Instagram Caption writing",
                        "Facebook Post writing",
                        "Content Repurposing"
                      ]}
                    />
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((m, idx) => (
                    <div key={idx} className={`${styles.messageRow} ${m.role === "user" ? styles.messageRowUser : styles.messageRowAssistant}`}>
                      {m.role === "assistant" && (
                        <div
                          className={styles.avatar}
                          style={{
                            backgroundImage:
                              "url(https://lh3.googleusercontent.com/aida-public/AB6AXuAmRFrc0l4YX7Ep6mXXDLc5uZg8tGxvb9m7jHw5tZKBP2eUYK9SaH6tufwjFqCyfBkxRb4U87lqiniWlwf_5Yvq6ei_0dTk0wbYthIN2Go4pFBXhq08bJCeWtz_tt_bQWQ0nCs9FQdhMARH3MDPrfRL_ALGbUkQc-2xwORzpLs3QtODlZyVwD0dBURXAwpptDywsvcgRayOAXX7sIjIV3MKdK3TNE5kttINsDSPiLXjk8o4o6sOA2l-nYiYiS7UQ7libSW3OiDll-Y)",
                          }}
                        />
                      )}

                      <div className={styles.messageContent}>
                        {m.role === "user" && (
                          <div
                            className={styles.avatar}
                            style={{
                              backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDBAKYrl1MfIYC3qWUwoJmXKJVBrWOkeSlOx0wANi1NIfELbEDBvQS0T0iGrHUyqRV4Czj-IPjFUrTzYFcyeq7zLWVa28Xvql6XFr_KQtjR985p3GZ-xJQyHu8JmcR-8SsCy0tMDabHkObXT5pye1_MYDGnWBqv7SOPWQDCOq603GsVlUPs1Vn-wEVqk_3uqYMdVLagGW4T46443BXr9140ZI3939SkV2O4jevgk8LCiNDiQ91lOh9QI9EPKSBVf_tj0YzqPWrjM_c")',
                              marginLeft: "auto",
                              marginBottom: "0.5rem"
                            }}
                          />
                        )}
                        <div className={`${styles.bubble} ${m.role === "user" ? styles.bubbleUser : styles.bubbleAssistant}`}>
                          <div style={{ whiteSpace: "pre-wrap", width: "100%" }} dir={isArabic(m.content) ? "rtl" : "ltr"}>{m.content}</div>
                          {m.role === "assistant" && (
                            <button className={styles.copyButton} onClick={() => navigator.clipboard.writeText(m.content)}>
                              <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>content_copy</span> Copy
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {(sending || loadingHistory) && (
                    <div className={`${styles.messageRow} ${styles.messageRowAssistant}`}>
                      <div
                        className={styles.avatar}
                        style={{
                          backgroundImage:
                            "url(https://lh3.googleusercontent.com/aida-public/AB6AXuAWVHcXhmaXJ4SpudRT7VGhJNDClKhXMXp-Ypb4zlJvOhthZi_8dBQRVL2dknlSInSWrlFI9ha7KoQIfsm7IireDSgjE12N8ubCmHO71Dw5pA02boJkTxcQnFrHQ-e3Ta-ysgg20LwmiNTj0wkOZRDkUkMEI96Z4-uzcD7AIsm2EPqKKevgo9ps-Lka_Zhdu7CQxOpS_cUhILXawaIc7mmf6i2SvEI8c3aUFKO_UR9qM9krIvHE2WFWfS-GtGtt4xWeTUVNht5QFO4)",
                        }}
                      />
                      <div className={styles.messageContent}>
                        <div className={`${styles.bubble} ${styles.bubbleAssistant}`}>
                          <div className={styles.loadingDots}>
                            <div className={styles.dot}></div>
                            <div className={styles.dot}></div>
                            <div className={styles.dot}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className={styles.inputArea}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputContainer}>
                <textarea
                  ref={textareaRef}
                  onInput={adjustHeight}
                  style={{ maxHeight: "20vh" }}
                  suppressHydrationWarning={true}
                  className={styles.textarea}
                  placeholder="Type your prompt here..."
                  rows={1}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      doSend();
                    }
                  }}
                ></textarea>
                <button
                  onClick={doSend}
                  disabled={sending || !text.trim()}
                  className={styles.sendButton}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>arrow_upward</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}