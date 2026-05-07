import type { IconName } from "@/components/Icon";

export type Message = { role: "user" | "assistant"; content: string };

export type Chat = { id: string; title: string };

export type Identity = { _id: string; title: string; description: string };

export type PromptStarter = {
  icon: IconName;
  label: string;
  hint: string;
  prompt: string;
};
