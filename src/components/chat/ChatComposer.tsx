"use client";

import { Icon } from "@/components/Icon";
import type { Identity } from "@/components/chat/types";
import type { KeyboardEvent, MutableRefObject, RefObject } from "react";

type ChatComposerProps = {
  text: string;
  sending: boolean;
  identities: Identity[];
  selectedIdentity: Identity | null;
  showIdentityDropdown: boolean;
  showIdentityHint: boolean;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  identityDropdownRef: RefObject<HTMLDivElement | null>;
  onTextChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSendMessage: () => void;
  onClearIdentity: () => void;
  onDismissIdentityHint: () => void;
  onOpenIdentityModal: () => void;
  onToggleIdentityDropdown: () => void;
  onSelectIdentity: (identity: Identity) => void;
  onDropdownKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  styles: Record<string, string>;
  t: (key: string) => string;
};

export function ChatComposer({
  text,
  sending,
  identities,
  selectedIdentity,
  showIdentityDropdown,
  showIdentityHint,
  textareaRef,
  identityDropdownRef,
  onTextChange,
  onKeyDown,
  onSendMessage,
  onClearIdentity,
  onDismissIdentityHint,
  onOpenIdentityModal,
  onToggleIdentityDropdown,
  onSelectIdentity,
  onDropdownKeyDown,
  styles,
  t,
}: ChatComposerProps) {
  return (
    <div className={styles.inputArea}>
      {selectedIdentity && (
        <div className="mx-auto mb-2 flex max-w-[800px] items-center justify-between rounded-lg border border-border-subtle bg-surface px-4 py-2">
          <div className="flex items-center gap-2">
            <Icon name="badge" className="text-primary" aria-hidden="true" />
            <span className="text-sm font-medium">{selectedIdentity.title}</span>
          </div>
          <button
            onClick={onClearIdentity}
            className="text-text-secondary transition-colors hover:text-white"
            aria-label={t("Remove identity")}
          >
            <Icon name="close" className="text-[18px]" aria-hidden="true" />
          </button>
        </div>
      )}

      <div className={styles.inputWrapper}>
        <div className="relative">
          {showIdentityHint && (
            <div className={styles.identityHint}>
              <div className={styles.identityHintContent}>
                <div className={styles.identityHintHeader}>
                  <Icon
                    name="badge"
                    aria-hidden="true"
                    style={{ fontSize: "16px", color: "var(--color-primary)" }}
                  />
                  <span className={styles.identityHintTitle}>{t("hint_identity_title")}</span>
                  <button
                    onClick={onDismissIdentityHint}
                    className={styles.identityHintClose}
                    aria-label={t("Close")}
                  >
                    <Icon name="close" style={{ fontSize: "14px" }} aria-hidden="true" />
                  </button>
                </div>
                <p className={styles.identityHintText}>{t("hint_identity_text")}</p>
                <button
                  onClick={() => {
                    onOpenIdentityModal();
                    onDismissIdentityHint();
                  }}
                  className={styles.identityHintCta}
                >
                  {t("hint_identity_cta")} {"->"}
                </button>
              </div>
            </div>
          )}

          <button
            onClick={onToggleIdentityDropdown}
            className={`${styles.actionButton} ml-2 mt-2 hover:bg-white/10`}
            aria-label={t("Add Identity")}
            aria-expanded={showIdentityDropdown}
            aria-haspopup="menu"
          >
            <Icon name="add" className="text-gray-400" aria-hidden="true" />
          </button>

          {showIdentityDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={onToggleIdentityDropdown} aria-hidden="true" />
              <div
                ref={identityDropdownRef}
                role="menu"
                aria-label={t("Add Identity")}
                onKeyDown={onDropdownKeyDown}
                className="absolute bottom-full left-0 z-20 mb-2 w-56 overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-xl"
              >
                {identities.map((identity) => (
                  <button
                    key={identity._id}
                    role="menuitemradio"
                    aria-checked={selectedIdentity?._id === identity._id}
                    onClick={() => onSelectIdentity(identity)}
                    className="group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-border-subtle"
                  >
                    <Icon
                      name="badge"
                      className="text-[18px] text-text-secondary transition-colors group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span className="truncate text-sm text-text-secondary transition-colors group-hover:text-white">
                      {identity.title}
                    </span>
                  </button>
                ))}
                <div className="border-t border-border-subtle p-2">
                  <button
                    role="menuitem"
                    onClick={onOpenIdentityModal}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-primary transition-colors hover:bg-border-subtle"
                  >
                    <Icon name="add" className="text-[18px]" aria-hidden="true" />
                    <span className="whitespace-nowrap text-sm font-medium">{t("Create New Identity")}</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t("chat_placeholder")}
          aria-label={t("Message input")}
          rows={1}
          disabled={sending}
          dir="auto"
        />

        <button
          onClick={onSendMessage}
          disabled={!text.trim() || sending}
          className={styles.actionButton}
          aria-label={t("Send message")}
        >
          <Icon name={sending ? "sync" : "arrow_upward"} className={sending ? "animate-spin" : ""} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
