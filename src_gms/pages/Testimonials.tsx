import { ExternalLink, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";

const TESTIMONIALS = [
  { name: "Rajesh Kumar", role: "MSME Owner", city: "Chennai", quote: "GMS transformed how I think about branding. My sales grew 40% in just 3 months after applying the frameworks taught here. The weekly sessions are pure gold.", initials: "RK" },
  { name: "Priya Nair", role: "Startup Founder", city: "Coimbatore", quote: "The best free community I've ever joined. The sessions are practical and actionable — not theoretical. Anand Sir's teaching style is world-class and very relatable.", initials: "PN" },
  { name: "Muthu Krishnan", role: "Digital Marketer", city: "Madurai", quote: "I went from zero digital marketing knowledge to running profitable ad campaigns. GMS gave me the confidence and the skills to compete at a national level.", initials: "MK" },
  { name: "Lakshmi Sundaram", role: "Boutique Owner", city: "Tirunelveli", quote: "Joining GMS was the best decision for my business. The community is supportive and the knowledge shared is on par with paid courses worth thousands of rupees.", initials: "LS" },
  { name: "Arjun Palaniswamy", role: "Restaurant Entrepreneur", city: "Salem", quote: "The Ignition Summit alone was worth it. I met partners, mentors, and clients in one day. GMS isn't just a school — it's a business ecosystem.", initials: "AP" },
  { name: "Deepa Rajan", role: "Freelancer & Coach", city: "Trichy", quote: "As a solopreneur, I struggled with positioning myself. GMS helped me define my brand, find my ideal clients, and charge what I'm truly worth.", initials: "DR" },
];

export default function Testimonials() {

  return (
    <div className="pt-32 pb-24 min-h-screen" style={{ background: "#121212" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(255,215,0,0.1)" }}>
            <Quote size={32} style={{ color: "#FFD700" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Success <span style={{ color: "#FFD700" }}>Stories</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Don't just take our word for it. Read how Global Marketing School has transformed thousands of Tamil entrepreneurs.
          </p>
        </div>

        {/* Featured Quote */}
        <div className="p-10 md:p-16 rounded-3xl mb-12 relative overflow-hidden border border-white/10" style={{ background: "#00509E" }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{ background: "rgba(255,215,0,0.1)" }} />
          <div className="absolute left-0 top-0 bottom-0 w-4 rounded-l-3xl" style={{ background: "#FFD700" }} />
          <div className="relative z-10 pl-8">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#FFD700" style={{ color: "#FFD700" }} />)}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-relaxed">
              "The strategies I learned here helped me double my revenue in just 6 months. GMS is the real deal — no fluff, just results."
            </h3>
            <p className="text-white/60 font-medium uppercase tracking-widest mb-8">— GMS Community Member, Chennai</p>
            <Button size="lg" className="h-14 px-8 text-base font-bold rounded-2xl" style={{ background: "#FFD700", color: "#121212" }} asChild>
              <a href="https://sites.google.com/view/anandsptestimonials/" target="_blank" rel="noopener noreferrer">
                View All Testimonials <ExternalLink className="ml-2" size={18} />
              </a>
            </Button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-6 border border-white/10 hover:-translate-y-1 transition-transform"
              style={{ background: "#0d1e35" }}
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#FFD700" style={{ color: "#FFD700" }} />)}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed italic text-sm">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full font-bold flex items-center justify-center text-sm shrink-0" style={{ background: "#FFD700", color: "#121212" }}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role} · {t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-slate-500 mb-6 text-lg">Ready to write your own success story?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/subscription">
              <Button size="lg" className="h-14 px-10 text-base font-bold rounded-2xl hover:scale-105 transition-transform" style={{ background: "#FFD700", color: "#121212" }}>
                Join Free Community
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-10 text-base font-bold rounded-2xl border-white/20 text-white hover:bg-white/10" asChild>
              <a href="https://sites.google.com/view/anandsptestimonials/" target="_blank" rel="noopener noreferrer">
                Read More Stories <ExternalLink size={16} className="ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
