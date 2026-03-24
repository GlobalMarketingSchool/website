import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "Events", path: "/events" },
  { name: "AI Support", path: "/ai-support" },
  { name: "Ignition Summit", path: "/ignition-summit" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Policy", path: "/policy" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  return (
    <header className={cn("fixed top-0 w-full z-50 transition-all duration-300", isScrolled ? "glass-nav py-3" : "bg-transparent py-5")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img src={`${import.meta.env.BASE_URL}images/gms-logo.png`} alt="GMS" className="h-10 w-10 rounded-xl object-cover shadow-lg group-hover:scale-105 transition-transform" style={{ boxShadow: "0 0 16px rgba(255,215,0,0.25), 0 4px 12px rgba(0,0,0,0.4)" }} />
            <span className="font-display font-bold text-lg tracking-tight text-white drop-shadow-md hidden sm:block">
              Global Marketing School
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = location === link.path;
              return (
                <Link key={link.path} href={link.path} className={cn("px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200", isActive ? "font-bold" : "text-white/70 hover:text-white hover:bg-white/8")} style={isActive ? { color: "#FFD700", background: "rgba(255,215,0,0.1)", boxShadow: "inset 0 1px 0 rgba(255,215,0,0.15)" } : {}}>
                  {link.name}
                </Link>
              );
            })}
            <div className="ml-3 pl-3 border-l border-white/15">
              <Link href="/subscription" className="btn-gold px-5 py-2 rounded-full text-sm font-bold transition-all">
                Join Community
              </Link>
            </div>
          </nav>

          <button className="lg:hidden p-2 text-white rounded-xl transition-all" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={cn("lg:hidden absolute top-full left-0 w-full transition-all duration-300 origin-top overflow-hidden border-t border-white/8", mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0")} style={{ background: "rgba(10,10,18,0.95)", backdropFilter: "blur(32px)" }}>
        <div className="flex flex-col p-4 gap-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.path} href={link.path} className={cn("p-3.5 rounded-xl text-base font-medium transition-colors", location === link.path ? "font-bold" : "text-slate-300 hover:text-white hover:bg-white/5")} style={location === link.path ? { color: "#FFD700", background: "rgba(255,215,0,0.08)" } : {}}>
              {link.name}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-white/10">
            <Link href="/subscription" className="btn-gold w-full h-12 text-base rounded-2xl flex items-center justify-center">
              Join Community Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
