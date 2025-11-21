export function Footer() {
  return (
    <footer className="mt-12 md:mt-20 border-t border-[#2a2a32] py-6 px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <img alt="SEYA" src="/seyaLogo.svg" className="h-8 md:h-10 w-auto" />
          </div>
          <p className="text-[#a0a0b0] text-sm max-w-sm">The AI-powered content creation platform for modern teams.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Product</h4>
          <ul className="space-y-3">
            <li>
              <a className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="#features">
                Features
              </a>
            </li>
            <li>
              <a className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="#pricing">
                Pricing
              </a>
            </li>
            <li>
              <a className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="#blog">
                Blog
              </a>
            </li>
            <li>
              <a className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="#signin">
                Sign In
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Company</h4>
          <ul className="space-y-3">
            <li>
              <a className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="#about">
                About Us
              </a>
            </li>
            <li>
              <a className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="#contact">
                Contact
              </a>
            </li>
            <li>
              <a className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="#terms">
                Terms of Service
              </a>
            </li>
            <li>
              <a className="text-[#a0a0b0] hover:text-white transition-colors text-sm" href="#privacy">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-[#2a2a32] text-center text-sm text-[#a0a0b0]">
        © 2024 SEYA. All rights reserved.
      </div>
    </footer>
  );
}
