import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      period: "/month",
      border: "border-2 border-[#007BFF]",
      titleColor: "text-[#007BFF]",
      buttonText: "Get Started",
      features: [
        "Limited articles/tweets",
        "Standard AI model access",
        "Community support",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      border: "border-2 border-[#8A2BE2]",
      titleColor: "text-[#8A2BE2]",
      buttonText: "Choose Plan",
      features: [
        "Higher generation limits",
        "YouTube script generation",
        "Priority support",
        "Collaboration tools",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      period: "",
      border: "border-2 border-[#8A2BE2]",
      titleColor: "text-[#8A2BE2]",
      buttonText: "Contact Sales",
      features: [
        "Unlimited generation",
        "Custom AI model training",
        "Dedicated account manager",
        "API access",
      ],
      popular: false,
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-[#007BFF]/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/2 w-[800px] h-[800px] bg-[#8A2BE2]/20 blur-3xl rounded-full"></div>
      </div>
      <Header />
      <div className="layout-container flex grow flex-col">
        <div className="relative z-10 px-4 sm:px-10 md:px-20 lg:px-40 flex justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] w-full">
            <main>
              <div className="flex flex-wrap justify-center text-center gap-3 p-4 py-16 sm:py-24">
                <div className="flex w-full flex-col items-center gap-4">
                  <p className="text-off-white text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em] max-w-2xl">
                    Find the Perfect Plan for You
                  </p>
                  <p className="text-text-muted-dark text-base font-normal leading-normal max-w-lg">
                    Choose the best plan to supercharge your content creation process with AI.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 py-3">
                {plans.map((plan, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-1 flex-col gap-6 rounded-xl ${plan.border} bg-card-dark p-6 transition-transform duration-300 hover:-translate-y-1`}
                  >
                    <div className="flex flex-col gap-2">
                      {plan.popular ? (
                        <div className="flex items-center justify-between">
                          <h1 className={`text-lg font-bold leading-tight ${plan.titleColor}`}>{plan.name}</h1>
                          <p className="text-off-white text-xs font-bold leading-normal tracking-[0.015em] rounded-full bg-[#8A2BE2] px-3 py-1 text-center">
                            Most Popular
                          </p>
                        </div>
                      ) : (
                        <h1 className={`text-lg font-bold leading-tight ${plan.titleColor}`}>{plan.name}</h1>
                      )}
                      <p className="flex items-baseline gap-1 text-off-white">
                        <span className="text-4xl font-black leading-tight tracking-[-0.033em]">{plan.price}</span>
                        {plan.period && (
                          <span className="text-base font-medium leading-tight text-text-muted-dark">{plan.period}</span>
                        )}
                      </p>
                    </div>
                    <button className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#007BFF] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-600">
                      <span className="truncate">{plan.buttonText}</span>
                    </button>
                    <div className="flex flex-col gap-3">
                      {plan.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-normal leading-normal text-off-white">
                          <span className="material-symbols-outlined text-primary">check</span>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}