export function Hero() {
  return (
    <section className="mt-16 md:mt-24">
      <div className="relative z-10 flex flex-col gap-8 items-center justify-center text-center p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl md:text-6xl max-w-4xl">
            Your AI Assistant for Effortless Writting
            <span className="relative inline-block h-[1.2em] overflow-hidden align-bottom ml-3">
              <span className="absolute left-0 bottom-0 w-full h-full bg-linear-to-r from-[#007BFF] to-[#8A2BE2] text-transparent bg-clip-text">
                <span className="block animate-text-slide">Articles.</span>
                <span className="block">Tweets.</span>
                <span className="block">Scripts.</span>
                <span className="block">Posts.</span>
                <span className="block animate-text-slide">Articles.</span>
              </span>
            </span>
          </h1>
          <p className="text-[#a0a0b0] text-base font-normal leading-relaxed sm:text-lg max-w-2xl mx-auto">
            SEYA is your personal AI agent for high-quality content generation. Stop staring at a blank page and start creating in seconds.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button className="flex min-w-[84px] w-full sm:w-auto max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#007BFF] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-transform duration-200 hover:scale-105 shadow-lg shadow-blue-500/20">
            <span className="truncate">Get Started for Free</span>
          </button>
          <button className="flex min-w-[84px] w-full sm:w-auto max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#1E1E24]/50 backdrop-blur-sm border border-[#2a2a32] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#1E1E24]/80 transition-colors">
            <span className="truncate">See a Demo</span>
          </button>
        </div>
      </div>
    </section>
  );
}
