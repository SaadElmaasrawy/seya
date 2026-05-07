"use client";

import { Icon } from "@/components/Icon";
import { PageShell } from "@/components/PageShell";
import { motion } from "framer-motion";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const t = useTranslations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", interest: "", budget: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <PageShell
      backgroundVariant="single"
      className="selection:bg-white/30 selection:text-white"
      contentClassName="max-w-6xl px-4 sm:px-6 lg:px-8"
      mainClassName="relative pt-24 pb-20 sm:pt-28 sm:pb-24"
    >
      <div className="relative w-full">
        <div className="absolute bottom-0 left-8 top-0 hidden w-px bg-white/10 lg:block" aria-hidden="true" />

        <div className="lg:pl-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 space-y-2"
          >
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tighter text-white md:text-6xl">
              {t("contact_title_love")}
            </h1>
            <p className="flex flex-wrap items-center gap-3 text-4xl font-semibold leading-[1.1] tracking-tighter text-white md:text-6xl">
              <span>{t("contact_title_get_in_touch")}</span>
              <span className="animate-wave inline-block origin-[70%_70%]" aria-hidden="true">
                👋
              </span>
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="max-w-4xl space-y-12"
          >
            <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
              <div className="space-y-3">
                <label htmlFor="name" className="block text-sm font-medium text-white">
                  {t("Name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[4px] border border-transparent bg-white/5 px-4 py-3.5 font-light text-white transition-all placeholder:text-neutral-500 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Edward Snowden"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  {t("Email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-[4px] border border-transparent bg-white/5 px-4 py-3.5 font-light text-white transition-all placeholder:text-neutral-500 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="interest" className="block text-sm font-medium text-white">
                  {t("contact_field_interest")}
                </label>
                <div className="relative">
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-[4px] border border-transparent bg-white/5 px-4 py-3.5 font-light text-white transition-all focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <option value="" disabled className="text-neutral-500">
                      {t("contact_placeholder_interest")}
                    </option>
                    <option value="design" className="bg-background-dark">
                      {t("contact_interest_design")}
                    </option>
                    <option value="dev" className="bg-background-dark">
                      {t("contact_interest_dev")}
                    </option>
                    <option value="marketing" className="bg-background-dark">
                      {t("contact_interest_marketing")}
                    </option>
                    <option value="other" className="bg-background-dark">
                      {t("contact_interest_other")}
                    </option>
                  </select>
                  <Icon
                    name="arrow_back"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-neutral-500"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="budget" className="block text-sm font-medium text-white">
                  {t("contact_field_budget")}
                </label>
                <div className="relative">
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-[4px] border border-transparent bg-white/5 px-4 py-3.5 font-light text-white transition-all focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <option value="" disabled className="text-neutral-500">
                      {t("contact_placeholder_budget")}
                    </option>
                    <option value="<1k" className="bg-background-dark">
                      {t("contact_budget_under_1k")}
                    </option>
                    <option value="1k-5k" className="bg-background-dark">
                      {t("contact_budget_1k_5k")}
                    </option>
                    <option value="5k-10k" className="bg-background-dark">
                      {t("contact_budget_5k_10k")}
                    </option>
                    <option value="10k+" className="bg-background-dark">
                      {t("contact_budget_10k_plus")}
                    </option>
                  </select>
                  <Icon
                    name="arrow_back"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-neutral-500"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="message" className="block text-sm font-medium text-white">
                {t("Message")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full resize-none rounded-[4px] border border-transparent bg-white/5 px-4 py-3.5 font-light text-white transition-all placeholder:text-neutral-500 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder={t("contact_message_placeholder")}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-11 w-full min-w-[200px] items-center justify-center gap-3 rounded-[4px] bg-white px-8 py-4 text-base font-medium text-black transition-all hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                    <span>{t("sending")}</span>
                  </>
                ) : (
                  <>
                    {t("contact_btn_just_send")}
                    <ArrowUpRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="rounded-[4px] border border-green-500/20 bg-green-500/10 p-4 text-sm font-medium text-green-400"
              >
                {t("contact_success_message")}
              </motion.div>
            )}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="rounded-[4px] border border-red-500/20 bg-red-500/10 p-4 text-sm font-medium text-red-400"
              >
                {t("contact_error_message")}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave {
          animation: wave 2s infinite;
        }
      `}</style>
    </PageShell>
  );
}
