"use client";

import { Icon } from "@/components/Icon";
import type { RefObject } from "react";

type ChatDialogsProps = {
  settingsOpen: boolean;
  deleteConfirmId: string | null;
  showIdentityModal: boolean;
  settingsModalRef: RefObject<HTMLDivElement | null>;
  deleteModalRef: RefObject<HTMLDivElement | null>;
  identityModalRef: RefObject<HTMLDivElement | null>;
  activeTab: "profile" | "subscription";
  profileData: { name: string; email: string; password: string };
  subscriptionData: { plan: string; status: string };
  loadingSettings: boolean;
  identityForm: { title: string; description: string };
  creatingIdentity: boolean;
  onCloseSettings: () => void;
  onSetActiveTab: (tab: "profile" | "subscription") => void;
  onProfileChange: (field: "name" | "password", value: string) => void;
  onSaveProfile: () => void;
  onLogout: () => void;
  onUpgrade: () => void;
  onCloseDelete: () => void;
  onConfirmDelete: () => void;
  onCloseIdentityModal: () => void;
  onIdentityFormChange: (field: "title" | "description", value: string) => void;
  onCreateIdentity: () => void;
  styles: Record<string, string>;
  t: (key: string) => string;
};

export function ChatDialogs({
  settingsOpen,
  deleteConfirmId,
  showIdentityModal,
  settingsModalRef,
  deleteModalRef,
  identityModalRef,
  activeTab,
  profileData,
  subscriptionData,
  loadingSettings,
  identityForm,
  creatingIdentity,
  onCloseSettings,
  onSetActiveTab,
  onProfileChange,
  onSaveProfile,
  onLogout,
  onUpgrade,
  onCloseDelete,
  onConfirmDelete,
  onCloseIdentityModal,
  onIdentityFormChange,
  onCreateIdentity,
  styles,
  t,
}: ChatDialogsProps) {
  return (
    <>
      {settingsOpen && (
        <div className={styles.modalOverlay} onClick={onCloseSettings}>
          <div
            ref={settingsModalRef}
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 id="settings-modal-title">{t("Settings")}</h2>
              <button onClick={onCloseSettings} aria-label={t("Close")}>
                <Icon name="close" aria-hidden="true" />
              </button>
            </div>
            <div className={styles.modalTabs}>
              <button
                className={activeTab === "profile" ? styles.activeTab : ""}
                onClick={() => onSetActiveTab("profile")}
              >
                {t("Profile")}
              </button>
              <button
                className={activeTab === "subscription" ? styles.activeTab : ""}
                onClick={() => onSetActiveTab("subscription")}
              >
                {t("Subscription")}
              </button>
            </div>
            <div className={styles.modalContent}>
              {loadingSettings ? (
                <div className="flex justify-center p-8" aria-label={t("auth_loading")} role="status">
                  <div className={styles.loadingDots}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                  </div>
                </div>
              ) : activeTab === "profile" ? (
                <div className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="settings-name">{t("Name")}</label>
                    <input
                      id="settings-name"
                      value={profileData.name}
                      onChange={(e) => onProfileChange("name", e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="settings-email">{t("Email")}</label>
                    <input id="settings-email" value={profileData.email} disabled className="cursor-not-allowed opacity-50" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="settings-password">{t("Password")}</label>
                    <input
                      id="settings-password"
                      type="password"
                      placeholder={t("New Password (leave blank to keep)")}
                      value={profileData.password}
                      onChange={(e) => onProfileChange("password", e.target.value)}
                    />
                  </div>
                  <button onClick={onSaveProfile} className={styles.saveButton}>
                    {t("Save Changes")}
                  </button>
                  <div className="mt-8 border-t border-border-subtle pt-6">
                    <button
                      onClick={onLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-lg p-3 text-red-500 transition-colors hover:bg-red-500/10"
                    >
                      <Icon name="logout" aria-hidden="true" />
                      {t("Log Out")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.subscription}>
                  <div className="rounded-xl border border-border-subtle bg-surface p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">{t("Current Plan")}</h3>
                        <p className="mt-1 text-2xl font-bold text-white">{subscriptionData.plan}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          subscriptionData.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {subscriptionData.status}
                      </span>
                    </div>
                    {subscriptionData.plan === "Free" && (
                      <button
                        onClick={onUpgrade}
                        className="w-full rounded-lg bg-white py-2 font-semibold text-black transition-colors hover:bg-gray-200"
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

      {deleteConfirmId && (
        <div className={styles.modalOverlay} onClick={onCloseDelete}>
          <div
            ref={deleteModalRef}
            className={styles.modal}
            style={{ maxWidth: 380 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 id="delete-modal-title">{t("Delete Chat")}</h2>
              <button onClick={onCloseDelete} aria-label={t("Close")}>
                <Icon name="close" aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-col gap-6 p-6">
              <p className="text-sm text-gray-400">{t("Are you sure you want to delete this chat?")}</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={onCloseDelete}
                  className="rounded-lg border border-border-subtle px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-border-subtle hover:text-white"
                >
                  {t("Cancel")}
                </button>
                <button
                  onClick={onConfirmDelete}
                  className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
                >
                  {t("Delete")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showIdentityModal && (
        <div className={styles.modalOverlay} onClick={onCloseIdentityModal}>
          <div
            ref={identityModalRef}
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="identity-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 id="identity-modal-title">{t("Add Identity")}</h2>
              <button onClick={onCloseIdentityModal} aria-label={t("Close")}>
                <Icon name="close" aria-hidden="true" />
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="identity-title">{t("Title")}</label>
                  <input
                    id="identity-title"
                    placeholder="e.g. Professional Copywriter"
                    value={identityForm.title}
                    onChange={(e) => onIdentityFormChange("title", e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="identity-description">{t("Description")}</label>
                  <textarea
                    id="identity-description"
                    placeholder={t("identity_description_placeholder")}
                    value={identityForm.description}
                    onChange={(e) => onIdentityFormChange("description", e.target.value)}
                    className="min-h-[100px] resize-y rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] p-3 text-[0.95rem] text-[var(--text-primary)] focus:border-[var(--border-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--border-strong)]/30"
                  />
                </div>
                <button onClick={onCreateIdentity} className={styles.saveButton} disabled={creatingIdentity}>
                  {creatingIdentity ? t("auth_creating") : t("Create Identity")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
