import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Zap, Star, Check } from "lucide-react";
import { Link } from "wouter";

export default function IgnitionSummit() {

  return (
    <div className="min-h-screen text-white" style={{ background: "#121212" }}>
      {/* Hero */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={`${import.meta.env.BASE_URL}images/summit-banner.png`} alt="Ignition Summit" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(18,18,18,0.8), rgba(18,18,18,0.95) 80%, #121212 100%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold tracking-widest uppercase mb-8 border" style={{ borderColor: "rgba(255,215,0,0.4)", background: "rgba(255,215,0,0.08)", color: "#FFD700" }}>
              <Zap size={18} /> Signature Annual Event
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
              IGNITION SUMMIT <span style={{ color: "#FFD700" }}>2024</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10">
              The ultimate congregation of Tamil business leaders, marketers, and visionaries. Ignite your business potential.
            </p>
            <Link href="/subscription">
              <Button size="lg" className="h-16 px-10 text-xl rounded-full hover:scale-105 transition-transform font-bold" style={{ background: "#FFD700", color: "#121212" }}>
                Get Your Pass Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Highlights */}
      <div className="py-20" style={{ background: "#0d1e35" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 -mt-32 relative z-20 mb-24">
            {[
              { icon: Calendar, title: "2 Days of Impact", desc: "Action-packed sessions from morning till evening." },
              { icon: Users, title: "500+ Attendees", desc: "Network with top-tier entrepreneurs and founders." },
              { icon: Star, title: "Expert Speakers", desc: "Learn directly from industry veterans and proven leaders." },
            ].map((item, i) => (
              <div key={i} className="rounded-3xl p-8 flex flex-col items-center text-center border border-white/10" style={{ background: "#121212" }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(255,215,0,0.1)" }}>
                  <item.icon size={32} style={{ color: "#FFD700" }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold text-sm mb-4" style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700" }}>
                <Zap size={14} /> Why Attend
              </div>
              <h2 className="text-4xl font-black mb-6 text-white">Why Attend Ignition Summit?</h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                This isn't just another motivational seminar. Ignition Summit is designed to provide actionable, result-oriented marketing strategies tailored specifically for the modern Tamil entrepreneur.
              </p>
              <ul className="space-y-4">
                {[
                  "Discover the latest digital marketing trends",
                  "Learn branding strategies that actually convert",
                  "Participate in live brainstorming panels",
                  "Build partnerships that last a lifetime",
                  "Get featured in the GMS Alumni network",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(255,215,0,0.15)" }}>
                      <Check size={14} strokeWidth={3} style={{ color: "#FFD700" }} />
                    </div>
                    <span className="text-slate-300 font-medium">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex gap-4 flex-wrap">
                <Link href="/subscription">
                  <Button size="lg" className="h-14 px-8 font-bold rounded-2xl" style={{ background: "#FFD700", color: "#121212" }}>
                    Register Now
                  </Button>
                </Link>
                <a href="https://wa.me/918385836308" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-white/20 text-white hover:bg-white/10">
                    <MapPin size={18} className="mr-2" /> Get Details
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-full blur-3xl" style={{ background: "rgba(255,215,0,0.04)" }} />
              <img
                src={`${import.meta.env.BASE_URL}images/summit-banner.png`}
                alt="Ignition Summit Conference"
                className="relative z-10 rounded-3xl w-full border border-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA strip */}
      <div className="py-20 text-center border-t border-white/5" style={{ background: "#00509E" }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Be Part of the Next Summit</h2>
          <p className="text-white/70 mb-8 text-lg">Don't miss Tamil Nadu's biggest annual marketing event. Seats are limited.</p>
          <Link href="/subscription">
            <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-full hover:scale-105 transition-transform" style={{ background: "#FFD700", color: "#121212" }}>
              Secure Your Spot Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
