import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageSquare, ArrowRight, Brain, Target, TrendingUp, Lightbulb } from "lucide-react";
import { Link } from "wouter";

export default function AISupport() {

  return (
    <div className="pt-32 pb-24 min-h-screen" style={{ background: "#121212" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold text-sm mb-6" style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700" }}>
              <Sparkles size={16} /> Coming Soon — Beta Feature
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Marketing Strategy powered by{" "}
              <span style={{ color: "#FFD700" }}>AI</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Get instant answers, content ideas, and strategic marketing advice tailored for your Tamil business using our custom-trained GMS AI Assistant.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: Brain, text: "24/7 Instant Marketing Advice" },
                { icon: Lightbulb, text: "Copywriting & Content Generation" },
                { icon: TrendingUp, text: "Campaign Performance Analysis" },
                { icon: Target, text: "Trained on GMS Expert Frameworks" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-white/5" style={{ background: "#0d1e35" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(255,215,0,0.1)" }}>
                    <item.icon size={20} style={{ color: "#FFD700" }} />
                  </div>
                  <span className="font-semibold text-slate-300">{item.text}</span>
                </div>
              ))}
            </div>

            <Link href="/subscription">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto font-bold rounded-2xl" style={{ background: "#FFD700", color: "#121212" }}>
                Join to Unlock AI Support <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(0,80,158,0.3), rgba(255,215,0,0.05))" }} />
            <div className="relative rounded-3xl shadow-2xl overflow-hidden border border-white/10" style={{ background: "#0d1e35" }}>
              <div className="p-4 border-b border-white/10 flex items-center gap-3" style={{ background: "#00509E" }}>
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-4 font-medium text-slate-300 text-sm">GMS AI Assistant</span>
              </div>
              <div className="p-6">
                <img
                  src={`${import.meta.env.BASE_URL}images/ai-support.png`}
                  alt="AI Marketing Support"
                  className="w-full h-auto rounded-xl mb-6 object-cover"
                />
                <div className="rounded-2xl rounded-tl-none p-4 mb-4 inline-block max-w-[85%] border" style={{ background: "rgba(0,80,158,0.3)", borderColor: "rgba(255,215,0,0.2)" }}>
                  <p className="text-white font-medium text-sm">Hello! I'm your GMS AI Assistant. How can I help optimize your marketing campaign today?</p>
                </div>
                <div className="rounded-2xl rounded-tr-none p-4 border border-white/10 ml-auto max-w-[85%]" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <p className="text-slate-300 text-sm">Can you give me 3 headline ideas for my clothing brand targeting Tamil youth?</p>
                </div>
              </div>
              <div className="p-4 border-t border-white/10 flex gap-2" style={{ background: "rgba(0,0,0,0.2)" }}>
                <div className="flex-grow rounded-full h-12 flex items-center px-4 text-slate-500 text-sm border border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
                  Ask anything about marketing...
                </div>
                <Button className="rounded-full w-12 h-12 p-0 shrink-0" style={{ background: "#FFD700", color: "#121212" }}>
                  <MessageSquare size={20} />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
