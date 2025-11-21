import Link from "next/link";

export function Header() {
  return (
    <header className="w-[90%] flex items-center justify-between whitespace-nowrap px-4 sm:px-6 py-4 z-10 m-auto">
      <div className="flex items-center gap-4 text-white">
        <Link href="/">
          <img alt="SEYA" src="/seyaLogo.svg" className="h-8 md:h-10 w-auto" />
        </Link>
      </div>
      <div className="hidden md:flex flex-1 justify-end items-center gap-8">
        <nav className="flex items-center gap-9">
          <a className="text-white hover:text-[#007BFF] text-sm font-medium leading-normal transition-colors" href="#features">
            Features
          </a>
          <a className="text-white hover:text-[#007BFF] text-sm font-medium leading-normal transition-colors" href="#pricing">
            Pricing
          </a>
          <a className="text-white hover:text-[#007BFF] text-sm font-medium leading-normal transition-colors" href="/capabilities">
            Capabilities
          </a>
        </nav>
        <div className="flex gap-2">
          <Link href="/auth/register" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#007BFF] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors">
            <span className="truncate">Sign Up Free</span>
          </Link>
          <Link href="/auth/login" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1E1E24] hover:bg-[#2a2a32] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
            <span className="truncate">Log In</span>
          </Link>
        </div>
      </div>
      <div className="md:hidden">
        <button className="text-white">
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>
    </header>
  );
}
