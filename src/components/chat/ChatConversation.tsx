"use client";

import { Icon } from "@/components/Icon";
import type { Message, PromptStarter } from "@/components/chat/types";

type ChatConversationProps = {
  messages: Message[];
  loadingHistory: boolean;
  sending: boolean;
  promptStarters: PromptStarter[];
  onPromptSelect: (prompt: string) => void;
  isArabic: (value: string) => boolean;
  styles: Record<string, string>;
  t: (key: string) => string;
};

export function ChatConversation({
  messages,
  loadingHistory,
  sending,
  promptStarters,
  onPromptSelect,
  isArabic,
  styles,
  t,
}: ChatConversationProps) {
  if (messages.length === 0) {
    return (
      <div className={styles.welcome}>
        <div className={styles.welcomeInner}>
          <h1 className={styles.welcomeHeading}>{t("welcome_heading")}</h1>
          <p className={styles.welcomeSub}>{t("welcome_sub")}</p>
        </div>
        <div className={styles.promptGrid}>
          {promptStarters.map((starter) => (
            <button
              key={starter.label}
              className={styles.promptCard}
              onClick={() => onPromptSelect(starter.prompt)}
            >
              <Icon name={starter.icon} className={styles.promptIcon} aria-hidden="true" />
              <div>
                <div className={styles.promptLabel}>{starter.label}</div>
                <div className={styles.promptHint}>{starter.hint}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.messages}>
      {messages.map((message, index) => (
        <div
          key={`${message.role}-${index}`}
          className={`${styles.message} ${message.role === "user" ? styles.user : styles.assistant}`}
        >
          <div className={styles.avatar}>
            <Icon name={message.role === "user" ? "person" : "smart_toy"} className="text-[1.2rem]" aria-hidden="true" />
          </div>
          <div className={`${styles.bubble} ${isArabic(message.content) ? styles.rtl : ""}`}>
            {message.content}
          </div>
        </div>
      ))}
      {loadingHistory && (
        <div className="mt-4 flex justify-center" aria-live="polite">
          <Icon name="sync" className="animate-spin text-gray-500" aria-hidden="true" />
        </div>
      )}
      {sending && (
        <div className={`${styles.message} ${styles.assistant}`}>
          <div className={styles.avatar}>
            <Icon name="smart_toy" className="text-[1.2rem]" aria-hidden="true" />
          </div>
          <div className={styles.bubble}>
            <div className={styles.loadingDots} aria-label={t("auth_loading")} role="status">
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
