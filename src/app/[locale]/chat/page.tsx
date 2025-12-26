"use client";
// Force rebuild
import { Link, useRouter } from "@/i18n/routing";
import { useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";
import { useTranslations } from "next-intl";

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
  type Identity = { _id: string; title: string; description: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "subscription">("profile");
  const [profileData, setProfileData] = useState({ name: "", email: "", password: "" });
  const [subscriptionData, setSubscriptionData] = useState({ plan: "Free", status: "active" });
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameTitle, setRenameTitle] = useState("");

  // Identity State
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [selectedIdentity, setSelectedIdentity] = useState<Identity | null>(null);
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const [showIdentityDropdown, setShowIdentityDropdown] = useState(false);
  const [identityForm, setIdentityForm] = useState({ title: "", description: "" });
  const [creatingIdentity, setCreatingIdentity] = useState(false);

  const clientWebhook = process.env.NEXT_PUBLIC_WEBHOOK_URL;
  const t = useTranslations();

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
      } catch (e) {
        console.error("Failed to load history", e);
      }
    })();

    // Load Identities
    (async () => {
      try {
        const res = await fetch("/api/identity");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setIdentities(data);
          }
        }
      } catch (e) {
        console.error("Failed to load identities", e);
      }
    })();
  }, []);

  async function loadChat(id: string) {
    if (id === currentChatId) return;
    setLoadingHistory(true);
    setCurrentChatId(id);
    setSidebarOpen(false); // Close sidebar on mobile when chat selected
    try {
      const res = await fetch(`/api/chat/history/${id}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.messages)) {
          setMessages(data.messages);
        } else {
          setMessages([]);
        }
      }
    } catch (e) {
      console.error("Failed to load chat", e);
    }
    setLoadingHistory(false);
  }

  function startNewChat() {
    setCurrentChatId(null);
    setMessages([]);
    setSidebarOpen(false);
  }

  async function sendMessage() {
    if (!text.trim() || sending) return;
    const userMsg = text.trim();
    setText("");
    setSending(true);

    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);

    try {
      const res = await fetch("/api/chat/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          chatId: currentChatId,
          webhookUrl: clientWebhook,
          identity: selectedIdentity
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const data = await res.json();

      if (data.chatId && data.chatId !== currentChatId) {
        setCurrentChatId(data.chatId);
        // Refresh chat list
        const historyRes = await fetch("/api/chat/history", { cache: "no-store" });
        const historyData = await historyRes.json().catch(() => null);
        if (historyRes.ok && Array.isArray(historyData?.items)) {
          setChats(historyData.items);
        }
      }

      if (data.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: "assistant", content: "Error: Could not reach the assistant." }]);
    }
    setSending(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  async function openSettings() {
    setSettingsOpen(true);
    setLoadingSettings(true);
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setProfileData({ name: data.user.name || "", email: data.user.email || "", password: "" });
        // Mock subscription data for now
        setSubscriptionData({ plan: "Free", status: "active" });
      }
    } catch (e) {
      console.error(e);
    }
    setLoadingSettings(false);
  }

  async function saveProfile() {
    setLoadingSettings(true);
    try {
      // Implement profile update API call here
      await new Promise(r => setTimeout(r, 1000));
      alert("Profile updated!");
    } catch (e) {
      alert("Failed to update profile");
    }
    setLoadingSettings(false);
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error("Logout failed", e);
    }
  }

  async function deleteChat(chatId: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm(t("Are you sure you want to delete this chat?"))) return;

    try {
      const res = await fetch(`/api/chat/history/${chatId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setChats(prev => prev.filter(c => c.id !== chatId));
        if (currentChatId === chatId) {
          startNewChat();
        }
      }
    } catch (e) {
      console.error("Failed to delete chat", e);
    }
  }

  async function renameChat(chatId: string, newTitle: string) {
    try {
      const res = await fetch(`/api/chat/history/${chatId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
      });

      if (res.ok) {
        setChats(prev => prev.map(c => c.id === chatId ? { ...c, title: newTitle } : c));
        setRenameId(null);
        setRenameTitle("");
      }
    } catch (e) {
      console.error("Failed to rename chat", e);
    }
  }

  async function createIdentity() {
    if (!identityForm.title.trim() || !identityForm.description.trim()) return;
    setCreatingIdentity(true);
    try {
      const res = await fetch("/api/identity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(identityForm)
      });
      if (res.ok) {
        const newId = await res.json();
        setIdentities(prev => [newId, ...prev]);
        setSelectedIdentity(newId);
        setShowIdentityModal(false);
        setIdentityForm({ title: "", description: "" });
      }
    } catch (e) {
      console.error("Failed to create identity", e);
    }
    setCreatingIdentity(false);
  }

  function handleIdentityClick() {
    if (identities.length > 0) {
      setShowIdentityDropdown(!showIdentityDropdown);
    } else {
      setShowIdentityModal(true);
    }
  }

  return (
    <div className={styles.container}>
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <button onClick={() => setSidebarOpen(true)} className={styles.menuButton}>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className={styles.logo}>SEYA</span>
        <button onClick={startNewChat} className={styles.newChatButtonMobile}>
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>

      {/* Sidebar Backdrop */}
      {sidebarOpen && (
        <div className={styles.backdrop} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={`${styles.newChatButton} !bg-transparent !border-[#2c2c2e] !border !text-gray-400 hover:!text-white mb-2 no-underline flex items-center justify-center gap-2`}>
            <span className="material-symbols-outlined">arrow_back</span>
            {t("Back to Website")}
          </Link>
          <button onClick={startNewChat} className={styles.newChatButton}>
            <span className="material-symbols-outlined">add</span>
            {t("New Chat")}
          </button>
        </div>

        <div className={styles.historyList}>
          <div className={styles.historyLabel}>{t("History")}</div>
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`${styles.historyItem} ${chat.id === currentChatId ? styles.active : ''}`}
              onClick={() => loadChat(chat.id)}
            >
              {renameId === chat.id ? (
                <input
                  type="text"
                  value={renameTitle}
                  onChange={(e) => setRenameTitle(e.target.value)}
                  onBlur={() => renameChat(chat.id, renameTitle)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') renameChat(chat.id, renameTitle);
                    if (e.key === 'Escape') setRenameId(null);
                  }}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                  className="bg-transparent border-none text-white w-full outline-none"
                />
              ) : (
                <>
                  <span className="truncate">{chat.title}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 bg-[#1c1c1e] shadow-[-10px_0_10px_#1c1c1e]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setRenameId(chat.id);
                        setRenameTitle(chat.title);
                      }}
                      className="p-1 hover:text-white text-gray-400"
                      title={t("Rename")}
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                    <button
                      onClick={(e) => deleteChat(chat.id, e)}
                      className="p-1 hover:text-red-400 text-gray-400"
                      title={t("Delete")}
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className={styles.userSection}>
          <button onClick={openSettings} className={styles.settingsButton}>
            <span className="material-symbols-outlined">settings</span>
            {t("Settings")}
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className={styles.main}>
        {messages.length === 0 ? (
          <div className={styles.welcome}>
            <h1>{t("Welcome to Seya")}</h1>
            <div className={styles.typewriter}>
              <Typewriter
                words={[
                  t("Article writing"),
                  t("Tweet and X Thread writing"),
                  t("LinkedIn Post writing"),
                  t("Instagram Caption writing"),
                  t("Facebook Post writing"),
                  t("Content Repurposing")
                ]}
                typeSpeed={50}
                deleteSpeed={30}
                delayBeforeType={1000}
              />
            </div>
          </div>
        ) : (
          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.message} ${m.role === 'user' ? styles.user : styles.assistant}`}>
                <div className={styles.avatar}>
                  {m.role === 'user' ? (
                    <span className="material-symbols-outlined text-[1.2rem]">person</span>
                  ) : (
                    <span className="material-symbols-outlined text-[1.2rem]">smart_toy</span>
                  )}
                </div>
                <div className={`${styles.bubble} ${isArabic(m.content) ? styles.rtl : ''}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loadingHistory && <div className="text-center text-gray-500 mt-4">Loading...</div>}
            {sending && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.avatar}>
                  <span className="material-symbols-outlined text-[1.2rem]">smart_toy</span>
                </div>
                <div className={styles.bubble}>
                  <div className={styles.loadingDots}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className={styles.inputArea}>
          {selectedIdentity && (
            <div className="max-w-[800px] mx-auto mb-2 flex items-center justify-between bg-[#1c1c1e] px-4 py-2 rounded-lg border border-[#2c2c2e]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#007BFF]">badge</span>
                <span className="text-sm font-medium">{selectedIdentity.title}</span>
              </div>
              <button
                onClick={() => setSelectedIdentity(null)}
                className="text-gray-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          )}
          <div className={styles.inputWrapper}>
            <div className="relative">
              <button
                onClick={handleIdentityClick}
                className={`${styles.actionButton} ml-2 mt-2 hover:bg-white/10 transition-colors`}
                title={t("Add Identity")}
              >
                <span className="material-symbols-outlined text-gray-400 hover:text-white">add</span>
              </button>

              {showIdentityDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowIdentityDropdown(false)} />
                  <div className="absolute bottom-full left-0 mb-2 w-56 bg-[#1c1c1e] border border-[#2c2c2e] rounded-xl shadow-xl z-20 overflow-hidden">
                    {identities.map(id => (
                      <button
                        key={id._id}
                        onClick={() => {
                          setSelectedIdentity(id);
                          setShowIdentityDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-[#2c2c2e] transition-colors flex items-center gap-2 group"
                      >
                        <span className="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-white transition-colors">badge</span>
                        <span className="truncate text-sm text-gray-300 group-hover:text-white transition-colors">{id.title}</span>
                      </button>
                    ))}
                    <div className="border-t border-[#2c2c2e] p-2 ">
                      <button
                        onClick={() => {
                          setShowIdentityModal(true);
                          setShowIdentityDropdown(false);
                        }}
                        className="w-full text-left px-2 py-2 hover:bg-[#2c2c2e] rounded-lg transition-colors flex items-center gap-2 text-[#007BFF]"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        <span className="text-sm font-medium whitespace-nowrap">{t("Create New Identity")}</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <textarea
              ref={textareaRef}
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("chat_placeholder")}
              rows={1}
              disabled={sending}
              dir="auto"
            />
            <button onClick={sendMessage} disabled={!text.trim() || sending} className={styles.actionButton}>
              {sending ? (
                <span className="material-symbols-outlined animate-spin">sync</span>
              ) : (
                <span className="material-symbols-outlined">arrow_upward</span>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      {settingsOpen && (
        <div className={styles.modalOverlay} onClick={() => setSettingsOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{t("Settings")}</h2>
              <button onClick={() => setSettingsOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className={styles.modalTabs}>
              <button
                className={activeTab === "profile" ? styles.activeTab : ""}
                onClick={() => setActiveTab("profile")}
              >
                {t("Profile")}
              </button>
              <button
                className={activeTab === "subscription" ? styles.activeTab : ""}
                onClick={() => setActiveTab("subscription")}
              >
                {t("Subscription")}
              </button>
            </div>
            <div className={styles.modalContent}>
              {loadingSettings ? (
                <div className="p-8 text-center text-gray-400">Loading...</div>
              ) : activeTab === "profile" ? (
                <div className={styles.form}>
                  <div className={styles.formGroup}>
                    <label>{t("Name")}</label>
                    <input
                      value={profileData.name}
                      onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>{t("Email")}</label>
                    <input
                      value={profileData.email}
                      disabled
                      className="opacity-50 cursor-not-allowed"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>{t("Password")}</label>
                    <input
                      type="password"
                      placeholder="New Password (leave blank to keep)"
                      value={profileData.password}
                      onChange={e => setProfileData({ ...profileData, password: e.target.value })}
                    />
                  </div>
                  <button onClick={saveProfile} className={styles.saveButton}>
                    {t("Save Changes")}
                  </button>
                  <div className="mt-8 pt-6 border-t border-[#2c2c2e]">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 p-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined">logout</span>
                      {t("Log Out")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.subscription}>
                  <div className="bg-[#1c1c1e] p-4 rounded-xl border border-[#2c2c2e]">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-gray-400 text-sm font-medium">{t("Current Plan")}</h3>
                        <p className="text-2xl font-bold text-white mt-1">{subscriptionData.plan}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${subscriptionData.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                        {subscriptionData.status}
                      </span>
                    </div>
                    {subscriptionData.plan === "Free" && (
                      <button
                        onClick={() => router.push('/pricing')}
                        className="w-full py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        {t("Upgrade to Pro")}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Identity Modal */}
      {showIdentityModal && (
        <div className={styles.modalOverlay} onClick={() => setShowIdentityModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{t("Add Identity")}</h2>
              <button onClick={() => setShowIdentityModal(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.form}>
                <div className={styles.formGroup}>
                  <label>{t("Title")}</label>
                  <input
                    placeholder="e.g. Professional Copywriter"
                    value={identityForm.title}
                    onChange={e => setIdentityForm({ ...identityForm, title: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>{t("Description")}</label>
                  <textarea
                    placeholder={t("identity_description_placeholder")}
                    value={identityForm.description}
                    onChange={e => setIdentityForm({ ...identityForm, description: e.target.value })}
                    className="bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] p-3 text-[var(--text-primary)] text-[0.95rem] min-h-[100px] resize-y focus:outline-none focus:border-[var(--text-secondary)] focus:bg-[#1a1a1a]"
                  />
                </div>
                <button
                  onClick={createIdentity}
                  className={styles.saveButton}
                  disabled={creatingIdentity}
                >
                  {creatingIdentity ? t("auth_creating") : t("Create Identity")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
