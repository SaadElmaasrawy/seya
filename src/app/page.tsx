import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Steps } from "@/components/Steps";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-[#007BFF]/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/2 w-[800px] h-[800px] bg-[#8A2BE2]/20 blur-3xl rounded-full"></div>
      </div>

      <div className="layout-container flex grow flex-col">
        <Header />
        <div className="relative z-10 flex justify-center py-5">
          <div className="layout-content-container flex w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8">

            <main className="flex flex-col gap-24 md:gap-32">
              <Hero />
              <Features />
              <Steps />
              <Pricing />
              <Testimonials />
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
