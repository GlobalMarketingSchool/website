import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Users, Clock, TrendingUp, Globe, Target, Video, Network, PlayCircle, Star, MessageCircle, BookOpen, Award } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const timer = setInterval(() => {
        start += value / 100;
        if (start >= value) { setCount(value); clearInterval(timer); }
        else { setCount(Math.floor(start)); }
      }, 20);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {

  return (
    <div className="overflow-hidden">

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={`${import.meta.env.BASE_URL}images/hero-bg.png`} alt="GMS Community" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,18,0.92) 0%, rgba(0,80,158,0.4) 50%, rgba(10,10,18,0.88) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0a12 0%, transparent 60%)" }} />
        </div>

        {/* Floating member badge */}
        <motion.div
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute top-32 right-4 md:right-10 z-20 glass-card rounded-2xl p-4 flex items-center gap-4 animate-float"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-9 h-9 rounded-full border-2 overflow-hidden" style={{ borderColor: "#FFD700" }}>
                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Member" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold" style={{ borderColor: "#FFD700", background: "#00509E", color: "#FFD700" }}>+36k</div>
          </div>
          <div>
            <p className="text-white/70 text-xs font-medium">Entrepreneurs Trained</p>
            <p className="font-black text-lg leading-tight" style={{ color: "#FFD700" }}>36,000+</p>
          </div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full text-white font-medium text-sm glass">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#FFD700" }} />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#FFD700" }} />
                </span>
                Join 36,000+ Tamil Entrepreneurs · 5 Countries
              </motion.div>

              <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] mb-6 tracking-tight">
                Tamil Nadu's #1 <br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FFE55C 0%, #FFD700 50%, #FFA500 100%)" }}>
                  Marketing
                </span>{" "}
                Community
              </motion.h1>

              <motion.p variants={fadeIn} className="text-xl md:text-2xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
                The only school to learn Marketing & Sales in Tamil. Empowering MSMEs, startups, and aspiring entrepreneurs to become global leaders.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/subscription" className="btn-gold h-14 px-8 text-lg rounded-full w-full sm:w-auto flex items-center justify-center">
                  Join Community Free
                </Link>
                <a href="https://www.youtube.com/@GlobalMarketingSchool" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-medium w-full rounded-full text-white border-white/20 hover:bg-white/8 backdrop-blur-md" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <PlayCircle className="mr-2" /> Watch How It Works
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Gradient fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-10" style={{ background: "linear-gradient(to bottom, transparent, #0a0a12)" }} />
      </section>

      {/* Marquee Ticker */}
      <section className="py-4 overflow-hidden relative" style={{ background: "rgba(0,80,158,0.5)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,215,0,0.15)", borderBottom: "1px solid rgba(255,215,0,0.15)" }}>
        <div className="flex w-[200%] animate-marquee">
          {[...Array(2)].map((_, d) => (
            <div key={d} className="flex w-1/2 justify-around items-center">
              {["Marketing", "Branding", "Sales", "Advertising", "Leadership", "MSMEs", "Startups", "SEO", "Social Media", "Tamil"].map((word, i) => (
                <span key={i} className="font-black text-lg uppercase tracking-widest px-8 flex items-center gap-6" style={{ color: "#FFD700" }}>
                  {word} <span className="text-white/25 text-xl">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#FFD700" }}>Real Impact</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white">Numbers That Speak</h3>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { icon: Users, label: "Entrepreneurs Trained", value: 36000, suffix: "+" },
              { icon: Award, label: "Businesses Transformed", value: 350, suffix: "+" },
              { icon: Clock, label: "Hours of Training (12 months)", value: 1500, suffix: "+" },
              { icon: Globe, label: "Countries Represented", value: 5, suffix: "" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn} className="glass-card rounded-3xl p-6 md:p-8 text-center group hover:-translate-y-2 transition-all duration-300 specular">
                <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.2)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px rgba(255,215,0,0.1)" }}>
                  <stat.icon size={28} style={{ color: "#FFD700" }} />
                </div>
                <h4 className="text-3xl md:text-4xl font-black text-white mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </h4>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative border-y border-white/5">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,80,158,0.12) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#FFD700" }}>Simple Process</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6">How It Works</h3>
            <p className="text-xl text-white/60">Your journey to transforming your business starts here.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Join for Free", desc: "Fill a simple form and become a member instantly. Join our WhatsApp group immediately.", icon: Users },
              { step: 2, title: "Attend Weekly Sessions", desc: "Access live training every week from expert Anand Paraman and guest speakers.", icon: Video },
              { step: 3, title: "Grow Your Business", desc: "Apply what you learn and see real revenue growth. 350+ businesses transformed.", icon: TrendingUp },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 0.5 }} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mb-8 relative group-hover:-translate-y-2 transition-transform duration-300 specular" style={{ background: "rgba(0,80,158,0.3)", border: "1px solid rgba(255,215,0,0.25)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 0 30px rgba(0,80,158,0.2)" }}>
                  <item.icon className="w-10 h-10" style={{ color: "#FFD700" }} />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm border-2" style={{ background: "#FFD700", color: "#0a0a12", borderColor: "#0a0a12" }}>
                    {item.step}
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-white/60 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/subscription" className="btn-gold px-10 h-14 text-lg rounded-full flex items-center justify-center">Start Your Journey Now →</Link>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 md:flex justify-between items-end">
            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#FFD700" }}>Premium Value</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white">What You Get Inside</h3>
            </div>
            <Link href="/events">
              <Button variant="ghost" className="mt-6 md:mt-0 font-bold hover:bg-white/5 text-sm" style={{ color: "#FFD700" }}>
                View All Events →
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Video, title: "Weekly Live Sessions", desc: "Interactive marketing masterclasses every week tailored for Tamil entrepreneurs.", link: "/events", highlight: false },
              { icon: Users, title: "Expert Mentorship", desc: "Direct guidance from Anand Paraman — founder of GMS — and guest industry veterans.", link: "/subscription", highlight: true },
              { icon: Network, title: "Business Networking", desc: "Connect with 36,000+ founders, find partners, and generate quality B2B leads.", link: "/events", highlight: false },
              { icon: BookOpen, title: "Marketing Blog", desc: "15+ SEO-optimized marketing and sales articles by Anand Paraman.", link: "/blog", highlight: false },
              { icon: TrendingUp, title: "Sales Frameworks", desc: "Battle-tested sales scripts, funnels, and closing techniques that work.", link: "/subscription", highlight: false },
              { icon: Globe, title: "Global Community", desc: "Connect with members from 5+ countries and expand your global presence.", link: "/testimonials", highlight: false },
            ].map((card, i) => (
              <motion.div key={i} whileHover={{ y: -8 }} className={`rounded-3xl p-7 flex flex-col border transition-all group specular ${card.highlight ? "glass-blue" : "glass-card"}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.2)" }}>
                  <card.icon size={24} style={{ color: "#FFD700" }} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{card.title}</h4>
                <p className="text-white/60 mb-6 flex-grow text-sm leading-relaxed">{card.desc}</p>
                <Link href={card.link} className="text-sm font-bold flex items-center gap-1 transition-all group-hover:gap-2" style={{ color: "#FFD700" }}>
                  Learn More <span>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 100% at 80% 50%, rgba(0,80,158,0.3) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeIn} className="mb-12">
                <div className="flex items-center gap-3 mb-6"><Globe style={{ color: "#FFD700" }} size={28} /><h2 className="text-3xl font-black text-white">Our Vision</h2></div>
                <p className="text-xl text-white/70 leading-relaxed italic border-l-4 pl-6" style={{ borderColor: "#FFD700" }}>
                  "To transform Tamil entrepreneurs into global leaders in marketing by providing world-class education and a supportive community."
                </p>
              </motion.div>

              <motion.div variants={fadeIn}>
                <div className="flex items-center gap-3 mb-6"><Target style={{ color: "#FFD700" }} size={28} /><h2 className="text-3xl font-black text-white">Our Mission</h2></div>
                <p className="text-xl text-white/70 leading-relaxed italic border-l-4 pl-6" style={{ borderColor: "#FFD700" }}>
                  "To empower Tamil MSMEs, SMEs, startups, and aspiring entrepreneurs with cutting-edge knowledge in Branding, Marketing, Sales, Advertising, and Leadership."
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-12 p-8 rounded-3xl glass-card">
                <h3 className="text-xl font-bold text-white mb-3">Want daily marketing insights?</h3>
                <p className="text-white/60 mb-6 text-sm">Join our exclusive WhatsApp community for daily tips, session updates, and networking with 36,000+ entrepreneurs.</p>
                <a href="https://chat.whatsapp.com/GeqgHVDT2kW5vE0MLw0zUm?mode=gi_t" target="_blank" rel="noopener noreferrer">
                  <Button className="font-bold rounded-full px-8 h-12 text-base w-full" style={{ background: "#25D366", color: "#fff" }}>
                    <MessageCircle className="mr-2" size={20} /> Join WhatsApp Community →
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="glass-card rounded-3xl p-8 lg:p-12 specular">
              <h3 className="text-xl font-bold mb-8 text-white">Our Core Values</h3>
              <div className="flex flex-wrap gap-2.5 mb-10">
                {["Learning", "Innovation", "Spiritual", "Networking", "Empower", "Collaboration", "Accountability"].map((v, i) => (
                  <span key={i} className="px-4 py-2 rounded-full text-white/80 font-medium text-sm cursor-default transition-all hover:text-black" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFD700"; (e.currentTarget as HTMLElement).style.color = "#000"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}>
                    {v}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-6 text-white">Our Goals</h3>
              <ul className="space-y-3">
                {["Enhance Marketing Skills", "Build a Strong Community", "Drive Business Success", "Promote Global Competitiveness", "Facilitate Continuous Learning", "Inspire Leadership", "Expand Reach", "Measure Impact"].map((goal, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <CheckCircle2 size={16} style={{ color: "#FFD700" }} className="shrink-0" />
                    <span className="font-medium text-sm">{goal}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#FFD700" }}>Success Stories</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white">Loved by Founders</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Rajesh Kumar", role: "MSME Owner, Chennai", quote: "GMS transformed how I think about branding. My sales grew 40% in 3 months!", initials: "RK" },
              { name: "Priya Nair", role: "Startup Founder, Coimbatore", quote: "The weekly sessions are practical and actionable. Best free community I've ever joined.", initials: "PN" },
              { name: "Muthu Krishnan", role: "Digital Marketer, Madurai", quote: "Anand Sir's teaching style is world-class. I went from zero to running ads profitably.", initials: "MK" },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-7 rounded-3xl flex flex-col specular hover:-translate-y-1 transition-all">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#FFD700" style={{ color: "#FFD700" }} />)}
                </div>
                <p className="text-white/70 text-base leading-relaxed mb-7 flex-grow">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-white/8">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black" style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)", color: "#0a0a12" }}>{t.initials}</div>
                  <div>
                    <h5 className="font-bold text-white text-sm">{t.name}</h5>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/testimonials"><Button variant="ghost" className="font-bold text-base hover:bg-white/5" style={{ color: "#FFD700" }}>Read more success stories →</Button></Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(0,80,158,0.35) 0%, transparent 60%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(255,215,0,0.06)" }} />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">Ready to scale your business?</h2>
          <p className="text-xl text-white/60 mb-12 font-light leading-relaxed">Join 36,000+ entrepreneurs already transforming their marketing & sales in Tamil Nadu and beyond.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/subscription" className="btn-gold h-16 px-10 text-xl rounded-full w-full sm:w-auto flex items-center justify-center">
              Join Free Community
            </Link>
            <a href="https://chat.whatsapp.com/GeqgHVDT2kW5vE0MLw0zUm?mode=gi_t" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="h-16 px-10 text-xl font-bold rounded-full w-full hover:scale-105 transition-transform" style={{ background: "#25D366", color: "#fff" }}>
                <MessageCircle className="mr-2" /> Join WhatsApp Group
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
