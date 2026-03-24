import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Clock, User, Tag, ArrowRight, Search, X } from "lucide-react";
import { useLocation } from "wouter";

const AUTHOR = {
  name: "Anand Paraman",
  role: "Founder, Global Marketing School",
  bio: "Anand Paraman is a leading marketing educator in Tamil Nadu with 10+ years of experience helping entrepreneurs scale their businesses.",
};

const BLOGS = [
  {
    id: 1, slug: "personal-branding-tamil-entrepreneurs",
    title: "The Art of Personal Branding for Tamil Entrepreneurs",
    excerpt: "Discover why personal branding is the #1 competitive advantage for Tamil business owners in 2024 and how to build a brand that attracts clients automatically.",
    category: "Branding", readTime: "8 min", date: "March 20, 2026",
    tags: ["personal branding", "Tamil entrepreneurs", "brand building", "business growth"],
    keywords: "personal branding Tamil entrepreneurs, brand building Tamil Nadu, business identity",
    featured: true,
    content: `Personal branding isn't just for celebrities — it's your most powerful business tool. In Tamil Nadu's competitive market, your personal brand is what differentiates you from 1,000 other businesses selling the same product or service. When customers choose YOU over a competitor, it's because they trust your brand story, your expertise, and your values.\n\nThe foundation of a strong personal brand starts with clarity: Who are you? What do you stand for? What transformation do you deliver to your clients? At GMS, we've helped 36,000+ entrepreneurs answer these three questions and build brands that generate inbound leads automatically.`
  },
  {
    id: 2, slug: "digital-marketing-strategies-tamil-nadu",
    title: "5 Digital Marketing Strategies That Work in Tamil Nadu",
    excerpt: "Not all digital marketing tactics work the same way everywhere. Here are the 5 proven strategies specifically optimized for Tamil-speaking markets.",
    category: "Marketing", readTime: "10 min", date: "March 15, 2026",
    tags: ["digital marketing", "Tamil Nadu", "marketing strategy", "SME marketing"],
    keywords: "digital marketing Tamil Nadu, online marketing Tamil, social media marketing Tamil",
  },
  {
    id: 3, slug: "facebook-ads-profitable-business",
    title: "How to Run Profitable Facebook Ads for Your Business",
    excerpt: "Step-by-step guide to creating Facebook ad campaigns that deliver positive ROI from day one — even if you've never run an ad before.",
    category: "Advertising", readTime: "12 min", date: "March 10, 2026",
    tags: ["Facebook ads", "paid advertising", "ROI", "social media ads", "digital advertising"],
    keywords: "Facebook ads for business Tamil, profitable Facebook ads, ad campaign ROI Tamil Nadu",
  },
  {
    id: 4, slug: "sales-mastery-gms-framework",
    title: "Sales Mastery: The GMS Framework for Closing More Deals",
    excerpt: "The proven 5-step sales framework that GMS members have used to close high-ticket clients and grow their revenue by 2–5x within 6 months.",
    category: "Sales", readTime: "11 min", date: "March 5, 2026",
    tags: ["sales mastery", "closing deals", "sales framework", "revenue growth"],
    keywords: "sales mastery Tamil entrepreneurs, close deals Tamil Nadu, sales framework business growth",
  },
  {
    id: 5, slug: "leadership-lessons-marketing-minds",
    title: "Leadership Lessons from India's Top Marketing Minds",
    excerpt: "What separates great leaders from average ones in business? Key leadership principles from India's most successful entrepreneurs that you can apply today.",
    category: "Leadership", readTime: "9 min", date: "Feb 28, 2026",
    tags: ["leadership", "entrepreneurship", "business leadership", "Tamil Nadu leaders"],
    keywords: "leadership Tamil entrepreneurs, business leadership India, entrepreneur mindset Tamil",
  },
  {
    id: 6, slug: "seo-small-business-rank-google",
    title: "SEO for Small Businesses: Rank #1 on Google Without Paid Ads",
    excerpt: "A practical, no-fluff guide to search engine optimization that helps Tamil small businesses get found on Google and generate organic leads for free.",
    category: "SEO", readTime: "14 min", date: "Feb 22, 2026",
    tags: ["SEO", "Google ranking", "organic traffic", "small business SEO", "local SEO"],
    keywords: "SEO small business Tamil Nadu, rank Google Tamil, organic traffic Tamil entrepreneurs, local SEO Chennai",
  },
  {
    id: 7, slug: "build-brand-zero-to-one-crore",
    title: "Building a Brand from Zero to ₹1 Crore: A Real Case Study",
    excerpt: "The complete journey of a GMS member who started with ₹0 marketing budget and scaled to ₹1 crore in annual revenue using brand storytelling.",
    category: "Branding", readTime: "13 min", date: "Feb 18, 2026",
    tags: ["brand building", "startup story", "₹1 crore revenue", "brand case study"],
    keywords: "build brand zero budget Tamil, business growth 1 crore Tamil Nadu, brand case study India",
  },
  {
    id: 8, slug: "whatsapp-marketing-msme",
    title: "WhatsApp Marketing: The Secret Weapon for Tamil MSMEs",
    excerpt: "How to use WhatsApp Business professionally to generate 100+ leads per month, nurture clients, and close sales without spending ₹1 on ads.",
    category: "Marketing", readTime: "8 min", date: "Feb 12, 2026",
    tags: ["WhatsApp marketing", "MSME", "lead generation", "WhatsApp Business"],
    keywords: "WhatsApp marketing Tamil Nadu, MSME WhatsApp strategy, WhatsApp business leads Tamil",
  },
  {
    id: 9, slug: "viral-content-social-media-business",
    title: "How to Create Viral Content for Social Media in 2024",
    excerpt: "The anatomy of viral content — what makes posts get shared thousands of times and exactly how to replicate those results for your business page.",
    category: "Marketing", readTime: "10 min", date: "Feb 6, 2026",
    tags: ["viral content", "social media", "content marketing", "engagement", "reels"],
    keywords: "viral content Tamil entrepreneurs, social media viral tips, content marketing Tamil Nadu 2024",
  },
  {
    id: 10, slug: "consumer-psychology-better-sales",
    title: "Understanding Consumer Psychology for Better Sales",
    excerpt: "The hidden psychological triggers that drive Tamil consumers to buy. Use these principles ethically to double your conversion rates.",
    category: "Sales", readTime: "11 min", date: "Jan 30, 2026",
    tags: ["consumer psychology", "buyer behavior", "sales psychology", "conversion rate"],
    keywords: "consumer psychology sales Tamil, buyer behavior Tamil Nadu, sales conversion tricks Tamil",
  },
  {
    id: 11, slug: "email-marketing-converts",
    title: "Email Marketing That Actually Converts: A Tamil Business Guide",
    excerpt: "Most email marketing fails because it's boring. Learn the story-driven email framework that gets 40–60% open rates and turns subscribers into buyers.",
    category: "Marketing", readTime: "9 min", date: "Jan 25, 2026",
    tags: ["email marketing", "email campaigns", "newsletter", "email open rate"],
    keywords: "email marketing Tamil business, email campaigns that convert, newsletter Tamil entrepreneurs",
  },
  {
    id: 12, slug: "google-ads-complete-guide-entrepreneurs",
    title: "The Complete Guide to Google Ads for Tamil Entrepreneurs",
    excerpt: "Everything you need to know about Google Ads — from keyword research to campaign structure to bid optimization — written specifically for Indian entrepreneurs.",
    category: "Advertising", readTime: "16 min", date: "Jan 20, 2026",
    tags: ["Google Ads", "PPC", "paid ads", "keyword research", "SEM"],
    keywords: "Google Ads Tamil entrepreneurs, PPC Tamil Nadu, Google advertising small business India",
  },
  {
    id: 13, slug: "instagram-reels-business-growth",
    title: "Instagram Reels Strategy for Business Growth in 2024",
    excerpt: "How Tamil entrepreneurs are using Instagram Reels to grow from 0 to 50,000 followers organically and convert that audience into paying customers.",
    category: "Marketing", readTime: "10 min", date: "Jan 14, 2026",
    tags: ["Instagram Reels", "Instagram marketing", "social media growth", "organic growth"],
    keywords: "Instagram Reels business Tamil, Instagram marketing Tamil Nadu, Reels strategy 2024 India",
  },
  {
    id: 14, slug: "sales-funnel-converts",
    title: "How to Build a Sales Funnel That Converts in 2024",
    excerpt: "A sales funnel is not complicated. Here's the simple 4-stage funnel used by GMS's top members to generate consistent ₹5L–₹10L monthly revenue.",
    category: "Sales", readTime: "12 min", date: "Jan 8, 2026",
    tags: ["sales funnel", "conversion", "revenue generation", "marketing funnel"],
    keywords: "sales funnel Tamil business, marketing funnel Tamil Nadu, sales conversion business India",
  },
  {
    id: 15, slug: "community-marketing-gms-36000-members",
    title: "Community Marketing: How GMS Built 36,000+ Members Without Paid Ads",
    excerpt: "The complete community-building strategy behind Global Marketing School's explosive growth — and how any business can replicate it to build loyal fans.",
    category: "Branding", readTime: "15 min", date: "Jan 1, 2026",
    tags: ["community marketing", "community building", "brand community", "word of mouth", "GMS"],
    keywords: "community marketing Tamil Nadu, build brand community India, word of mouth marketing Tamil",
    featured: true,
  },
];

const CATEGORIES = ["All", "Branding", "Marketing", "Sales", "Advertising", "Leadership", "SEO"];

const CATEGORY_COLORS: Record<string, string> = {
  Branding: "#8B5CF6",
  Marketing: "#00509E",
  Sales: "#059669",
  Advertising: "#DC2626",
  Leadership: "#D97706",
  SEO: "#0891B2",
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();

  const filtered = BLOGS.filter((b) => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch = !searchQuery || b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = BLOGS.filter((b) => b.featured);
  const showFeatured = activeCategory === "All" && !searchQuery;

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-semibold text-sm mb-5" style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.2)" }}>
            ✍️ Written by Anand Paraman · Founder GMS
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Marketing <span style={{ color: "#FFD700" }}>Insights</span> Blog
          </h1>
          <p className="text-lg text-white/50 mb-8">
            15+ SEO-optimized articles on Marketing, Branding, Sales, Advertising & Leadership — in Tamil & English — by Anand Paraman.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full h-12 pl-12 pr-10 rounded-full text-sm text-white outline-none glass-card"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all" style={activeCategory === cat ? { background: "#FFD700", color: "#0a0a12", boxShadow: "0 4px 16px rgba(255,215,0,0.3)" } : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Articles */}
        {showFeatured && (
          <div className="mb-12">
            <h2 className="text-sm font-bold tracking-widest uppercase mb-6" style={{ color: "#FFD700" }}>Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((blog) => (
                <motion.div key={blog.id} whileHover={{ y: -4 }} className="glass-blue rounded-3xl p-8 specular border" style={{ border: "1px solid rgba(255,215,0,0.2)" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,215,0,0.15)", color: "#FFD700" }}>
                      {blog.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "rgba(255,215,0,0.2)", color: "#FFD700" }}>⭐ Featured</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 leading-tight">{blog.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">{blog.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1"><User size={12} /> {AUTHOR.name}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
                    </div>
                    <Link href="/subscription" className="flex items-center gap-1 text-sm font-bold transition-all hover:gap-2" style={{ color: "#FFD700" }}>
                      Read More <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Articles Grid */}
        <h2 className="text-sm font-bold tracking-widest uppercase mb-6" style={{ color: "#FFD700" }}>
          {searchQuery ? `Results for "${searchQuery}"` : activeCategory === "All" ? "All Articles" : `${activeCategory} Articles`}
          <span className="ml-3 text-white/30 font-normal normal-case text-xs">{filtered.length} articles</span>
        </h2>

        {filtered.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
            <p className="text-white/40 text-sm">Try a different search term or category</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((blog, i) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col group"
              >
                {/* Color bar */}
                <div className="h-1.5 w-full" style={{ background: `linear-gradient(to right, ${CATEGORY_COLORS[blog.category] || "#FFD700"}, transparent)` }} />

                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${CATEGORY_COLORS[blog.category]}20`, color: CATEGORY_COLORS[blog.category] || "#FFD700", border: `1px solid ${CATEGORY_COLORS[blog.category]}30` }}>
                      {blog.category}
                    </span>
                    <span className="text-xs text-white/30">{blog.date}</span>
                  </div>

                  <h3 className="text-lg font-black text-white mb-3 leading-tight group-hover:text-yellow-300 transition-colors">{blog.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5 flex-grow line-clamp-3">{blog.excerpt}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-white/30" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <Tag size={9} />{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/6">
                    <div className="flex items-center gap-2 text-xs text-white/30">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black" style={{ background: "#FFD700", color: "#0a0a12" }}>AP</div>
                      <div>
                        <span className="block font-medium text-white/50 text-[11px]">{AUTHOR.name}</span>
                        <span className="flex items-center gap-1"><Clock size={9} /> {blog.readTime}</span>
                      </div>
                    </div>
                    <Link href="/subscription" className="flex items-center gap-1 text-xs font-bold transition-all hover:gap-2" style={{ color: "#FFD700" }}>
                      Read <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Author Card */}
        <div className="mt-16 glass-blue rounded-3xl p-8 md:p-12 specular flex flex-col md:flex-row items-center gap-8" style={{ border: "1px solid rgba(255,215,0,0.15)" }}>
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shrink-0 font-black text-3xl md:text-4xl" style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)", color: "#0a0a12", boxShadow: "0 0 30px rgba(255,215,0,0.3)" }}>
            AP
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black text-white mb-1">{AUTHOR.name}</h3>
            <p className="text-sm font-bold mb-3" style={{ color: "#FFD700" }}>{AUTHOR.role}</p>
            <p className="text-white/60 text-sm leading-relaxed max-w-2xl">{AUTHOR.bio}</p>
          </div>
          <div className="shrink-0 flex flex-col gap-3">
            <Link href="/subscription" className="btn-gold px-6 py-3 rounded-full text-sm font-bold">
              Join GMS Community →
            </Link>
            <a href="https://www.youtube.com/@GlobalMarketingSchool" target="_blank" rel="noopener noreferrer">
              <button className="w-full px-6 py-3 rounded-full text-sm font-bold transition-all" style={{ background: "#FF0000", color: "#fff" }}>
                Watch on YouTube
              </button>
            </a>
          </div>
        </div>

        {/* SEO structured data note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-white/20">All content © {new Date().getFullYear()} Anand Paraman · Global Marketing School · All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
