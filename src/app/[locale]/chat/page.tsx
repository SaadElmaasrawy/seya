"use client";

import { useRouter } from "@/i18n/routing";
import { ChatComposer } from "@/components/chat/ChatComposer";
import { ChatConversation } from "@/components/chat/ChatConversation";
import { ChatDialogs } from "@/components/chat/ChatDialogs";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import type { Chat, Identity, Message, PromptStarter } from "@/components/chat/types";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./chat.module.css";

export default function ChatPage() {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const settingsModalRef = useRef<HTMLDivElement>(null);
  const deleteModalRef = useRef<HTMLDivElement>(null);
  const identityModalRef = useRef<HTMLDivElement>(null);
  const identityDropdownRef = useRef<HTMLDivElement>(null);

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
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [selectedIdentity, setSelectedIdentity] = useState<Identity | null>(null);
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const [showIdentityDropdown, setShowIdentityDropdown] = useState(false);
  const [identityForm, setIdentityForm] = useState({ title: "", description: "" });
  const [creatingIdentity, setCreatingIdentity] = useState(false);
  const [identityHintDismissed, setIdentityHintDismissed] = useState(true);

  const clientWebhook = process.env.NEXT_PUBLIC_WEBHOOK_URL;
  const t = useTranslations();

  const promptStarters: PromptStarter[] = [
    { icon: "article", label: t("prompt_article_label"), hint: t("prompt_article_hint"), prompt: t("prompt_article_text") },
    { icon: "tag", label: t("prompt_tweet_label"), hint: t("prompt_tweet_hint"), prompt: t("prompt_tweet_text") },
    { icon: "work", label: t("prompt_linkedin_label"), hint: t("prompt_linkedin_hint"), prompt: t("prompt_linkedin_text") },
    { icon: "photo_camera", label: t("prompt_instagram_label"), hint: t("prompt_instagram_hint"), prompt: t("prompt_instagram_text") },
    { icon: "play_circle", label: t("prompt_youtube_label"), hint: t("prompt_youtube_hint"), prompt: t("prompt_youtube_text") },
    { icon: "shuffle", label: t("prompt_repurpose_label"), hint: t("prompt_repurpose_hint"), prompt: t("prompt_repurpose_text") },
  ];

  const isArabic = (value: string) => /[\u0600-\u06FF]/.test(value);

  function adjustHeight() {
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = "auto";
    const nextHeight = Math.min(element.scrollHeight, Math.floor(window.innerHeight * 0.2));
    element.style.height = `${nextHeight}px`;
  }

  useEffect(() => {
    adjustHeight();
  }, [text]);

  useEffect(() => {
    if (localStorage.getItem("seya-identity-hint") !== "1") {
      setIdentityHintDismissed(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        const [historyRes, identityRes] = await Promise.all([
          fetch("/api/chat/history", { cache: "no-store" }),
          fetch("/api/identity"),
        ]);

        const historyData = await historyRes.json().catch(() => null);
        if (historyRes.ok && Array.isArray(historyData?.items)) {
          setChats(historyData.items);
        }

        const identityData = await identityRes.json().catch(() => null);
        if (identityRes.ok && Array.isArray(identityData)) {
          setIdentities(identityData);
        }
      } catch (error) {
        console.error("Failed to initialize chat", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!settingsOpen) return;

    const modal = settingsModalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSettingsOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    modal.addEventListener("keydown", trap);
    return () => modal.removeEventListener("keydown", trap);
  }, [settingsOpen]);

  useEffect(() => {
    if (!deleteConfirmId) return;

    const modal = deleteModalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDeleteConfirmId(null);
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    modal.addEventListener("keydown", trap);
    return () => modal.removeEventListener("keydown", trap);
  }, [deleteConfirmId]);

  useEffect(() => {
    if (!showIdentityModal) return;

    const modal = identityModalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowIdentityModal(false);
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    modal.addEventListener("keydown", trap);
    return () => modal.removeEventListener("keydown", trap);
  }, [showIdentityModal]);

  function dismissIdentityHint() {
    setIdentityHintDismissed(true);
    localStorage.setItem("seya-identity-hint", "1");
  }

  async function refreshChats() {
    const res = await fetch("/api/chat/history", { cache: "no-store" });
    const data = await res.json().catch(() => null);
    if (res.ok && Array.isArray(data?.items)) {
      setChats(data.items);
    }
  }

  async function loadChat(id: string) {
    if (id === currentChatId) return;

    setLoadingHistory(true);
    setCurrentChatId(id);
    setSidebarOpen(false);

    try {
      const res = await fetch(`/api/chat/history/${id}`, { cache: "no-store" });
      const data = await res.json().catch(() => null);
      setMessages(Array.isArray(data?.messages) ? data.messages : []);
    } catch (error) {
      console.error("Failed to load chat", error);
    } finally {
      setLoadingHistory(false);
    }
  }

  function startNewChat() {
    setCurrentChatId(null);
    setMessages([]);
    setSidebarOpen(false);
  }

  async function sendMessage() {
    if (!text.trim() || sending) return;

    const userMessage = text.trim();
    setText("");
    setSending(true);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const res = await fetch("/api/chat/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          chatId: currentChatId,
          webhookUrl: clientWebhook,
          identity: selectedIdentity,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const data = await res.json();

      if (data.chatId && data.chatId !== currentChatId) {
        setCurrentChatId(data.chatId);
        await refreshChats();
      }

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Could not reach the assistant." },
      ]);
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
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
        setSubscriptionData({ plan: "Free", status: "active" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSettings(false);
    }
  }

  async function saveProfile() {
    setLoadingSettings(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Profile updated!");
    } catch {
      alert("Failed to update profile");
    } finally {
      setLoadingSettings(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  function requestDeleteChat(chatId: string, e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setDeleteConfirmId(chatId);
  }

  async function confirmDeleteChat() {
    if (!deleteConfirmId) return;

    const chatId = deleteConfirmId;
    setDeleteConfirmId(null);

    try {
      const res = await fetch(`/api/chat/history/${chatId}`, { method: "DELETE" });
      if (res.ok) {
        setChats((prev) => prev.filter((chat) => chat.id !== chatId));
        if (currentChatId === chatId) {
          startNewChat();
        }
      }
    } catch (error) {
      console.error("Failed to delete chat", error);
    }
  }

  async function renameChat(chatId: string, newTitle: string) {
    const title = newTitle.trim();
    if (!title) {
      setRenameId(null);
      setRenameTitle("");
      return;
    }

    try {
      const res = await fetch(`/api/chat/history/${chatId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (res.ok) {
        setChats((prev) => prev.map((chat) => (chat.id === chatId ? { ...chat, title } : chat)));
      }
    } catch (error) {
      console.error("Failed to rename chat", error);
    } finally {
      setRenameId(null);
      setRenameTitle("");
    }
  }

  async function createIdentity() {
    if (!identityForm.title.trim() || !identityForm.description.trim()) return;

    setCreatingIdentity(true);
    try {
      const res = await fetch("/api/identity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(identityForm),
      });
      if (res.ok) {
        const newIdentity = await res.json();
        setIdentities((prev) => [newIdentity, ...prev]);
        setSelectedIdentity(newIdentity);
        setShowIdentityModal(false);
        setIdentityForm({ title: "", description: "" });
      }
    } catch (error) {
      console.error("Failed to create identity", error);
    } finally {
      setCreatingIdentity(false);
    }
  }

  function handleIdentityDropdown() {
    if (identities.length > 0) {
      setShowIdentityDropdown((prev) => !prev);
    } else {
      setShowIdentityModal(true);
    }
  }

  function handleDropdownKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      setShowIdentityDropdown(false);
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

    e.preventDefault();
    const container = identityDropdownRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll<HTMLElement>("button"));
    const index = items.indexOf(document.activeElement as HTMLElement);
    const nextIndex =
      e.key === "ArrowDown"
        ? Math.min(index + 1, items.length - 1)
        : Math.max(index - 1, 0);

    items[nextIndex]?.focus();
  }

  return (
    <div className={styles.container}>
      <ChatSidebar
        chats={chats}
        currentChatId={currentChatId}
        renameId={renameId}
        renameTitle={renameTitle}
        sidebarOpen={sidebarOpen}
        onOpenSidebar={() => setSidebarOpen(true)}
        onCloseSidebar={() => setSidebarOpen(false)}
        onStartNewChat={startNewChat}
        onLoadChat={(id) => void loadChat(id)}
        onRenameStart={(chat) => {
          setRenameId(chat.id);
          setRenameTitle(chat.title);
        }}
        onRenameTitleChange={setRenameTitle}
        onRenameCommit={(chatId, title) => void renameChat(chatId, title)}
        onRenameCancel={() => setRenameId(null)}
        onDeleteRequest={requestDeleteChat}
        onOpenSettings={() => void openSettings()}
        styles={styles}
        t={t}
      />

      <main id="main-content" className={styles.main}>
        <ChatConversation
          messages={messages}
          loadingHistory={loadingHistory}
          sending={sending}
          promptStarters={promptStarters}
          onPromptSelect={(prompt) => {
            setText(prompt);
            setTimeout(() => textareaRef.current?.focus(), 0);
          }}
          isArabic={isArabic}
          styles={styles}
          t={t}
        />

        <ChatComposer
          text={text}
          sending={sending}
          identities={identities}
          selectedIdentity={selectedIdentity}
          showIdentityDropdown={showIdentityDropdown}
          showIdentityHint={!identityHintDismissed && identities.length === 0 && messages.length === 0}
          textareaRef={textareaRef}
          identityDropdownRef={identityDropdownRef}
          onTextChange={setText}
          onKeyDown={handleKeyDown}
          onSendMessage={() => void sendMessage()}
          onClearIdentity={() => setSelectedIdentity(null)}
          onDismissIdentityHint={dismissIdentityHint}
          onOpenIdentityModal={() => {
            setShowIdentityModal(true);
            setShowIdentityDropdown(false);
          }}
          onToggleIdentityDropdown={handleIdentityDropdown}
          onSelectIdentity={(identity) => {
            setSelectedIdentity(identity);
            setShowIdentityDropdown(false);
          }}
          onDropdownKeyDown={handleDropdownKeyDown}
          styles={styles}
          t={t}
        />
      </main>

      <ChatDialogs
        settingsOpen={settingsOpen}
        deleteConfirmId={deleteConfirmId}
        showIdentityModal={showIdentityModal}
        settingsModalRef={settingsModalRef}
        deleteModalRef={deleteModalRef}
        identityModalRef={identityModalRef}
        activeTab={activeTab}
        profileData={profileData}
        subscriptionData={subscriptionData}
        loadingSettings={loadingSettings}
        identityForm={identityForm}
        creatingIdentity={creatingIdentity}
        onCloseSettings={() => setSettingsOpen(false)}
        onSetActiveTab={setActiveTab}
        onProfileChange={(field, value) => setProfileData((prev) => ({ ...prev, [field]: value }))}
        onSaveProfile={() => void saveProfile()}
        onLogout={() => void handleLogout()}
        onUpgrade={() => router.push("/pricing")}
        onCloseDelete={() => setDeleteConfirmId(null)}
        onConfirmDelete={() => void confirmDeleteChat()}
        onCloseIdentityModal={() => setShowIdentityModal(false)}
        onIdentityFormChange={(field, value) =>
          setIdentityForm((prev) => ({ ...prev, [field]: value }))
        }
        onCreateIdentity={() => void createIdentity()}
        styles={styles}
        t={t}
      />
    </div>
  );
}
