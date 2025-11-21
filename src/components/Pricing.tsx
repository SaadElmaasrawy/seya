"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Pricing() {
  const { ref, isVisible } = useScrollAnimation();

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started.",
      price: 0,
      period: "/month",
      features: ["5,000 words/month", "1 user seat", "Basic content templates"],
      buttonText: "Get Started",
      buttonVariant: "secondary",
      popular: false,
    },
    {
      name: "Pro",
      description: "For content creators and freelancers.",
      price: 29,
      period: "/month",
      features: ["50,000 words/month", "1 user seat", "All content templates", "Priority support"],
      buttonText: "Choose Pro",
      buttonVariant: "primary",
      popular: true,
    },
    {
      name: "Business",
      description: "For teams and agencies.",
      price: 99,
      period: "/month",
      features: ["Unlimited words", "5 user seats", "Team collaboration tools", "Dedicated support"],
      buttonText: "Contact Sales",
      buttonVariant: "secondary",
      popular: false,
    },
  ];

  const delayClasses = ["", "animate-delay-100", "animate-delay-200"];

  return (
    <section id="pricing" className="flex flex-col gap-10 px-4 py-10 relative z-10">
      <div ref={ref} className="flex flex-col gap-4 text-center">
        <h2 className={`text-white tracking-light text-3xl font-bold leading-tight md:text-4xl md:font-black md:leading-tight md:tracking-[-0.033em] scroll-animate ${isVisible ? 'visible' : ''}`}>
          Choose Your Plan
        </h2>
        <p className={`text-[#a0a0b0] text-base font-normal leading-relaxed max-w-2xl mx-auto scroll-animate animate-delay-100 ${isVisible ? 'visible' : ''}`}>
          Start for free, or unlock powerful features with our Pro and Business plans.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative flex flex-col rounded-xl border bg-[#1E1E24]/50 backdrop-blur-sm p-6 scroll-animate ${delayClasses[index]} ${isVisible ? 'visible' : ''} ${plan.popular
                ? "border-2 border-[#007BFF] shadow-2xl shadow-blue-500/20"
                : "border border-[#2a2a32]"
              }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#007BFF] text-white text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}
            <h3 className="text-lg font-bold text-white">{plan.name}</h3>
            <p className="text-[#a0a0b0] mt-2">{plan.description}</p>
            <p className="text-4xl font-black text-white mt-4">
              ${plan.price}
              <span className="text-base font-medium text-[#a0a0b0]">{plan.period}</span>
            </p>
            <ul className="space-y-4 mt-6 text-[#a0a0b0] grow">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#007BFF]">check_circle</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full mt-8 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 text-white text-base font-bold transition-colors ${plan.popular
                  ? "bg-[#007BFF] hover:bg-blue-600"
                  : "bg-[#2a2a32] hover:bg-[#2a2a32]/80"
                }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

