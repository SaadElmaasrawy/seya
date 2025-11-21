export function Steps() {
  return (
    <section className="relative z-10">
      <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-5 pt-5 text-center md:text-4xl md:font-black">
        Simple Steps to Brilliant Content
      </h2>
      <div className="grid grid-cols-[40px_1fr] gap-x-4 px-4 max-w-md mx-auto mt-8">
        {/* Step 1 */}
        <div className="flex flex-col items-center gap-2 pt-3">
          <div className="flex items-center justify-center size-10 rounded-full border-2 border-[#007BFF] bg-[#007BFF]/20 text-[#007BFF]">
            <span className="material-symbols-outlined text-2xl">edit_note</span>
          </div>
          <div className="w-0.5 bg-[#2a2a32] grow"></div>
        </div>
        <div className="flex flex-1 flex-col py-3">
          <p className="text-sm font-medium leading-normal text-[#007BFF]">Step 1</p>
          <h3 className="text-white text-lg font-bold leading-normal">Describe Your Topic</h3>
          <p className="text-[#a0a0b0] text-base font-normal leading-relaxed mt-1">
            Provide a simple prompt, keywords, or a brief description of what you need.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-0.5 bg-[#2a2a32] h-2"></div>
          <div className="flex items-center justify-center size-10 rounded-full border-2 border-[#007BFF] bg-[#007BFF]/20 text-[#007BFF]">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>
          <div className="w-0.5 bg-[#2a2a32] grow"></div>
        </div>
        <div className="flex flex-1 flex-col py-3">
          <p className="text-sm font-medium leading-normal text-[#007BFF]">Step 2</p>
          <h3 className="text-white text-lg font-bold leading-normal">Generate Content</h3>
          <p className="text-[#a0a0b0] text-base font-normal leading-relaxed mt-1">
            SEYA's advanced AI analyzes your input and crafts unique content in seconds.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center gap-2 pb-3">
          <div className="w-0.5 bg-[#2a2a32] h-2"></div>
          <div className="flex items-center justify-center size-10 rounded-full border-2 border-[#007BFF] bg-[#007BFF]/20 text-[#007BFF]">
            <span className="material-symbols-outlined text-2xl">send</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col py-3">
          <p className="text-sm font-medium leading-normal text-[#007BFF]">Step 3</p>
          <h3 className="text-white text-lg font-bold leading-normal">Publish & Share</h3>
          <p className="text-[#a0a0b0] text-base font-normal leading-relaxed mt-1">
            Review, edit if needed, and share your masterpiece with the world.
          </p>
        </div>
      </div>
    </section>
  );
}
