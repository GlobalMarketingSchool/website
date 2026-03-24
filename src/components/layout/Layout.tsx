import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MessageCircle } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col selection:bg-yellow-400/20 selection:text-yellow-400 relative">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918385836308"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 text-white rounded-full transition-all duration-300 group hover:scale-110"
        style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: "0 4px 24px rgba(37,211,102,0.4), inset 0 1px 0 rgba(255,255,255,0.2)" }}
        title="Chat with us on WhatsApp"
      >
        <div className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ background: "#25D366" }} />
        <MessageCircle size={28} className="relative z-10" fill="currentColor" />
        <span className="absolute right-full mr-3 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none glass-card" style={{ border: "1px solid rgba(255,215,0,0.15)" }}>
          Chat with us
        </span>
      </a>
    </div>
  );
}
