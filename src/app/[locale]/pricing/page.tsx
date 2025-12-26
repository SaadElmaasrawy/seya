import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Pricing } from "@/components/PricingSection";

export default function PricingPage() {
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
            <main className="py-16 sm:py-24">
              <Pricing />
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}