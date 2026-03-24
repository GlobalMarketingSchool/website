import { Link } from "wouter";
import { MessageCircle, Mail, Instagram, Youtube, Facebook, Linkedin, Twitter } from "lucide-react";

const SOCIAL_LINKS = [
  { name: "Instagram", handle: "@globalmarketingschool", url: "https://instagram.com/globalmarketingschool", icon: Instagram },
  { name: "YouTube", handle: "@GlobalMarketingSchool", url: "https://www.youtube.com/@GlobalMarketingSchool", icon: Youtube },
  { name: "Facebook", handle: "@globalmarketingschool", url: "https://facebook.com/globalmarketingschool", icon: Facebook },
  { name: "LinkedIn", handle: "@globalmarketingschool", url: "https://linkedin.com/company/globalmarketingschool", icon: Linkedin },
  { name: "X / Twitter", handle: "@globalmarketingschool", url: "https://x.com/globalmarketingschool", icon: Twitter },
];

export function Footer() {

  return (
    <footer className="text-slate-300 py-16 border-t border-white/8" style={{ background: "rgba(10,10,18,0.95)", backdropFilter: "blur(32px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img src={`${import.meta.env.BASE_URL}images/gms-logo.png`} alt="GMS" className="h-12 w-12 rounded-xl object-cover" style={{ boxShadow: "0 0 16px rgba(255,215,0,0.2)" }} />
              <div>
                <span className="font-display font-bold text-xl text-white tracking-tight block">Global Marketing School</span>
                <span className="text-xs text-slate-500">@globalmarketingschool</span>
              </div>
            </div>
            <p className="text-slate-400 text-base leading-relaxed max-w-xs">
              Tamil Nadu's #1 Marketing Community. Only school to learn Marketing in Tamil — empowering entrepreneurs since 2019.
            </p>
            <div className="flex gap-2 flex-wrap">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.handle} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5" style={{ background: "rgba(255,215,0,0.08)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.15)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)" }}>
                  <s.icon size={15} />
                </a>
              ))}
            </div>
            <Link href="/subscription" className="btn-gold px-6 py-3 rounded-full text-sm font-bold">
              Join Free Community →
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm mb-5 uppercase tracking-widest" style={{ color: "#FFD700" }}>Explore</h4>
            <ul className="space-y-3">
              {[{ label: "Home", path: "/" }, { label: "Blog", path: "/blog" }, { label: "Events", path: "/events" }, { label: "Subscription", path: "/subscription" }, { label: "Ignition Summit", path: "/ignition-summit" }].map((l) => (
                <li key={l.path}><Link href={l.path} className="text-slate-400 hover:text-white transition-colors text-sm hover:pl-1 duration-200 block">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold text-sm mb-5 uppercase tracking-widest" style={{ color: "#FFD700" }}>Support</h4>
            <ul className="space-y-3">
              {[{ label: "AI Support", path: "/ai-support" }, { label: "Testimonials", path: "/testimonials" }, { label: "Our Policy", path: "/policy" }].map((l) => (
                <li key={l.path}><Link href={l.path} className="text-slate-400 hover:text-white transition-colors text-sm hover:pl-1 duration-200 block">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm mb-5 uppercase tracking-widest" style={{ color: "#FFD700" }}>Contact</h4>
            <ul className="space-y-4 mb-8">
              <li><a href="mailto:gmssupport@gmail.com" className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors text-sm"><Mail size={15} /><span>gmssupport@gmail.com</span></a></li>
              <li><a href="https://wa.me/918385836308" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors text-sm"><MessageCircle size={15} /><span>+91 83858 36308</span></a></li>
              <li><a href="https://www.globalmarketingschool.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors text-sm"><span>🌐</span><span>globalmarketingschool.in</span></a></li>
            </ul>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Follow Us</p>
              {SOCIAL_LINKS.slice(0, 3).map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs mb-2">
                  <s.icon size={12} /><span>{s.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Global Marketing School. All rights reserved.</p>
          <p>Follow us · <span style={{ color: "#FFD700" }} className="font-bold">@globalmarketingschool</span></p>
          <div className="flex gap-4">
            <Link href="/policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/policy" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
