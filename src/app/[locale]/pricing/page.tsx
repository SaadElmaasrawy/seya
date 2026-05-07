import { PageShell } from "@/components/PageShell";
import { Pricing } from "@/components/PricingSection";

export default function PricingPage() {
  return (
    <PageShell contentClassName="max-w-[960px] px-4 sm:px-10 md:px-20 lg:px-40" mainClassName="py-16 sm:py-24">
      <Pricing />
    </PageShell>
  );
}
