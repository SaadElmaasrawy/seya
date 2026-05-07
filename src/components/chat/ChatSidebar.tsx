"use client";

import { Link } from "@/i18n/routing";
import { Icon } from "@/components/Icon";
import type { Chat } from "@/components/chat/types";
import type { MouseEvent } from "react";

type ChatSidebarProps = {
  chats: Chat[];
  currentChatId: string | null;
  renameId: string | null;
  renameTitle: string;
  sidebarOpen: boolean;
  onOpenSidebar: () => void;
  onCloseSidebar: () => void;
  onStartNewChat: () => void;
  onLoadChat: (id: string) => void;
  onRenameStart: (chat: Chat) => void;
  onRenameTitleChange: (value: string) => void;
  onRenameCommit: (chatId: string, title: string) => void;
  onRenameCancel: () => void;
  onDeleteRequest: (chatId: string, event: MouseEvent<HTMLButtonElement>) => void;
  onOpenSettings: () => void;
  styles: Record<string, string>;
  t: (key: string) => string;
};

export function ChatSidebar({
  chats,
  currentChatId,
  renameId,
  renameTitle,
  sidebarOpen,
  onOpenSidebar,
  onCloseSidebar,
  onStartNewChat,
  onLoadChat,
  onRenameStart,
  onRenameTitleChange,
  onRenameCommit,
  onRenameCancel,
  onDeleteRequest,
  onOpenSettings,
  styles,
  t,
}: ChatSidebarProps) {
  return (
    <>
      <div className={styles.mobileHeader}>
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenSidebar}
            className={styles.menuButton}
            aria-label={t("Open sidebar")}
          >
            <Icon name="menu" aria-hidden="true" />
          </button>
          <span className={styles.logo}>SEYA</span>
        </div>
        <button onClick={onStartNewChat} className={styles.newChatButtonMobile} aria-label={t("New Chat")}>
          <Icon name="add" aria-hidden="true" />
        </button>
      </div>

      {sidebarOpen && (
        <div className={styles.backdrop} onClick={onCloseSidebar} aria-hidden="true" role="presentation" />
      )}

      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <Link
            href="/"
            className={`${styles.newChatButton} !mb-2 !flex !items-center !justify-center !gap-2 !border !border-border-subtle !bg-transparent !text-text-secondary no-underline hover:!text-white`}
          >
            <Icon name="arrow_back" aria-hidden="true" />
            {t("Back to Website")}
          </Link>
          <button onClick={onStartNewChat} className={styles.newChatButton}>
            <Icon name="add" className={styles.newChatButtonIcon} aria-hidden="true" />
            {t("New Chat")}
          </button>
        </div>

        <nav className={styles.historyList} aria-label={t("History")}>
          <div className={styles.historyLabel}>{t("History")}</div>
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`${styles.historyItem} ${chat.id === currentChatId ? styles.active : ""} group`}
            >
              {renameId === chat.id ? (
                <input
                  type="text"
                  value={renameTitle}
                  onChange={(e) => onRenameTitleChange(e.target.value)}
                  onBlur={() => onRenameCommit(chat.id, renameTitle)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onRenameCommit(chat.id, renameTitle);
                    if (e.key === "Escape") onRenameCancel();
                  }}
                  autoFocus
                  className="w-full border-none bg-transparent text-white outline-none"
                  aria-label={t("Rename Chat")}
                />
              ) : (
                <>
                  <button
                    className={styles.historyItemTitle}
                    onClick={() => onLoadChat(chat.id)}
                    aria-current={chat.id === currentChatId ? "page" : undefined}
                  >
                    <span className="truncate">{chat.title}</span>
                  </button>
                  <div className="flex shrink-0 gap-1 bg-surface opacity-0 transition-opacity [box-shadow:-10px_0_10px_var(--color-surface)] group-hover:opacity-100">
                    <button
                      onClick={() => onRenameStart(chat)}
                      className="p-2 text-gray-400 hover:text-white"
                      aria-label={t("Rename Chat")}
                    >
                      <Icon name="edit" className="text-base" aria-hidden="true" />
                    </button>
                    <button
                      onClick={(e) => onDeleteRequest(chat.id, e)}
                      className="p-2 text-gray-400 hover:text-red-400"
                      aria-label={t("Delete Chat")}
                    >
                      <Icon name="delete" className="text-base" aria-hidden="true" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>

        <div className={styles.userSection}>
          <button onClick={onOpenSettings} className={styles.settingsButton}>
            <Icon name="settings" aria-hidden="true" />
            {t("Settings")}
          </button>
        </div>
      </aside>
    </>
  );
}
