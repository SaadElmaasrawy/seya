"use client";

import type { LucideProps } from "lucide-react";
import {
  ArrowLeft,
  ArrowUp,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  Camera,
  Clapperboard,
  FilePenLine,
  FileText,
  LoaderCircle,
  Menu,
  Pencil,
  Plus,
  Send,
  Settings,
  Shuffle,
  Sparkles,
  Tag,
  Trash2,
  UserRound,
  Users,
  X,
  LogOut,
} from "lucide-react";

const iconMap = {
  add: Plus,
  article: FileText,
  arrow_back: ArrowLeft,
  arrow_upward: ArrowUp,
  auto_awesome: Sparkles,
  badge: BadgeCheck,
  close: X,
  delete: Trash2,
  edit: Pencil,
  edit_note: FilePenLine,
  group: Users,
  groups: Users,
  logout: LogOut,
  menu: Menu,
  movie: Clapperboard,
  person: UserRound,
  photo_camera: Camera,
  play_circle: Clapperboard,
  send: Send,
  settings: Settings,
  shuffle: Shuffle,
  smart_toy: Bot,
  sync: LoaderCircle,
  tag: Tag,
  work: BriefcaseBusiness,
} as const;

export type IconName = keyof typeof iconMap;

type IconProps = Omit<LucideProps, "ref"> & {
  name: IconName;
};

export function Icon({ name, className, strokeWidth = 2, ...props }: IconProps) {
  const Component = iconMap[name];

  return (
    <Component
      size="1em"
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
}
