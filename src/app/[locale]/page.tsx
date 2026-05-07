import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Steps } from "@/components/Steps";
import { Pricing } from "@/components/PricingSection";

export default function Home() {
  return (
    <PageShell contentClassName="max-w-6xl px-4 sm:px-6 lg:px-8" mainClassName="flex flex-col gap-24 md:gap-32">
      <Hero />
      <Features />
      <Steps />
      <Pricing />
    </PageShell>
  );
}
