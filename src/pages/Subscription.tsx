import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, CreditCard, ShieldCheck, MessageCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCreatePaymentOrder, useVerifyPayment } from "@workspace/api-client-react";
import { useJoinModal } from "@/contexts/JoinModalContext";

const FREE_WA_LINK = "https://chat.whatsapp.com/GeqgHVDT2kW5vE0MLw0zUm?mode=gi_t";

const PLANS = [
  {
    id: "plan_free", name: "Community Member", price: { monthly: 0, yearly: 0 },
    interval: "forever", description: "Perfect for getting started and networking.",
    features: ["Weekly Training sessions", "Network with likeminded", "Basic resources access", "Community forum access"],
  },
  {
    id: "plan_premium", name: "Premium Member", price: { monthly: 999, yearly: 7890 },
    interval: "month", description: "Accelerate your learning with exclusive content.", popular: true,
    features: ["All Free features", "Exclusive deep-dive workshops", "Session recordings vault", "Expert Q&A priority", "Premium templates & frameworks"],
  },
  {
    id: "plan_business", name: "Business Accelerator", price: { monthly: 2999, yearly: 14567 },
    interval: "month", description: "For serious business owners wanting 1:1 guidance.",
    features: ["All Premium features", "Monthly 1:1 Mentoring (30m)", "Business Brainstorm sessions", "Priority networking access", "Direct WhatsApp support"],
  },
];

const memberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  city: z.string().min(2, "City is required"),
  businessName: z.string().optional(),
});
type MemberFormValues = z.infer<typeof memberSchema>;

declare global { interface Window { Razorpay: any; } }

export default function Subscription() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<(typeof PLANS)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { openModal: openJoinModal } = useJoinModal();

  const createOrder = useCreatePaymentOrder();
  const verifyPayment = useVerifyPayment();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MemberFormValues>({ resolver: zodResolver(memberSchema) });

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
    return () => { if (document.body.contains(s)) document.body.removeChild(s); };
  }, []);

  const getPrice = (plan: typeof PLANS[0]) => plan.price[billing];

  const getSavings = (plan: typeof PLANS[0]) => {
    if (plan.price.monthly === 0) return null;
    const monthlyTotal = plan.price.monthly * 12;
    const saved = monthlyTotal - plan.price.yearly;
    const pct = Math.round((saved / monthlyTotal) * 100);
    return { saved, pct };
  };

  const handlePlanSelect = (plan: typeof PLANS[0]) => {
    if (plan.price.monthly === 0) { openJoinModal(); return; }
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const onSubmit = async (data: MemberFormValues) => {
    if (!selectedPlan) return;
    const amount = getPrice(selectedPlan);
    try {
      const orderRes = await createOrder.mutateAsync({ data: { amount, planId: selectedPlan.id, planName: `${selectedPlan.name} (${billing})` } });
      if (!window.Razorpay) throw new Error("Payment gateway not loaded. Please refresh.");

      const rzp = new window.Razorpay({
        key: orderRes.keyId,
        amount: orderRes.amount * 100,
        currency: orderRes.currency,
        name: "Global Marketing School",
        description: `${selectedPlan.name} — ${billing === "yearly" ? "Annual" : "Monthly"} Plan`,
        image: `${import.meta.env.BASE_URL}images/gms-logo.png`,
        order_id: orderRes.orderId,
        handler: async (response: any) => {
          try {
            await verifyPayment.mutateAsync({ data: { razorpayOrderId: response.razorpay_order_id, razorpayPaymentId: response.razorpay_payment_id, razorpaySignature: response.razorpay_signature, memberName: data.name, memberEmail: data.email, memberPhone: data.phone, planId: selectedPlan.id } });
            setIsSuccess(true); setIsModalOpen(false);
            toast({ title: "Payment Successful!", description: "Welcome to GMS Premium Community!" });
          } catch (err: any) {
            toast({ variant: "destructive", title: "Verification Failed", description: err.message || "Contact support." });
          }
        },
        prefill: { name: data.name, email: data.email, contact: data.phone },
        theme: { color: "#FFD700" },
        modal: { ondismiss: () => toast({ title: "Payment cancelled", description: "You can retry anytime." }) },
      });
      rzp.on("payment.failed", (r: any) => toast({ variant: "destructive", title: "Payment Failed", description: r.error?.description }));
      rzp.open();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message || "Something went wrong." });
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-semibold text-sm mb-6" style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.2)" }}>
            <Check size={14} /> No hidden fees · Cancel anytime
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Invest in Your <span style={{ color: "#FFD700" }}>Growth</span>
          </h1>
          <p className="text-xl text-white/60">Join 36,000+ Tamil entrepreneurs. Choose the plan that fits your business.</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-1 p-1 rounded-full glass-card" style={{ border: "1px solid rgba(255,215,0,0.2)" }}>
            <button onClick={() => setBilling("monthly")} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billing === "monthly" ? "btn-gold" : "text-white/60 hover:text-white"}`}>
              Monthly
            </button>
            <button onClick={() => setBilling("yearly")} className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${billing === "yearly" ? "btn-gold" : "text-white/60 hover:text-white"}`}>
              Yearly <span className="px-2 py-0.5 rounded-full text-xs font-black" style={billing === "yearly" ? { background: "#0a0a12", color: "#FFD700" } : { background: "rgba(0,255,100,0.15)", color: "#00ff88" }}>Save up to 59%</span>
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PLANS.map((plan) => {
            const price = getPrice(plan);
            const savings = getSavings(plan);
            return (
              <motion.div key={plan.id} whileHover={{ y: -8 }} className={`rounded-3xl p-8 flex flex-col relative specular ${plan.popular ? "glass-blue" : "glass-card"}`} style={{ border: plan.popular ? "1px solid rgba(255,215,0,0.4)" : "1px solid rgba(255,255,255,0.08)" }}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1.5 rounded-full text-xs font-black uppercase" style={{ background: "linear-gradient(135deg, #FFE55C, #FFD700, #FFA500)", color: "#0a0a12", boxShadow: "0 4px 16px rgba(255,215,0,0.4)" }}>
                    ⭐ Most Popular
                  </div>
                )}

                {billing === "yearly" && savings && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(0,255,100,0.15)", color: "#00ff88", border: "1px solid rgba(0,255,100,0.25)" }}>
                    Save {savings.pct}%
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/50 mb-6 text-sm min-h-[40px]">{plan.description}</p>

                <div className="mb-6">
                  {price === 0 ? (
                    <span className="text-5xl font-black text-white">Free</span>
                  ) : (
                    <>
                      <span className="text-5xl font-black text-white">₹{price.toLocaleString("en-IN")}</span>
                      <span className="text-white/40 text-sm ml-1">/{billing === "yearly" ? "year" : "month"}</span>
                      {billing === "yearly" && savings && (
                        <div className="mt-1 text-xs text-white/40">₹{Math.round(price / 12).toLocaleString("en-IN")}/mo · Save ₹{savings.saved.toLocaleString("en-IN")}</div>
                      )}
                    </>
                  )}
                </div>

                <button onClick={() => handlePlanSelect(plan)} className={`w-full mb-7 h-11 text-sm font-bold rounded-xl transition-all ${price === 0 ? "hover:opacity-90" : plan.popular ? "btn-gold" : ""}`} style={price === 0 ? { background: "#25D366", color: "#fff" } : !plan.popular ? { background: "rgba(255,215,0,0.1)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)" } : {}}>
                  {price === 0 ? <><MessageCircle size={16} className="inline mr-2" />Join Free</> : <><CreditCard size={16} className="inline mr-2" />Subscribe Now</>}
                </button>

                <ul className="space-y-2.5 flex-grow">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check size={15} className="shrink-0 mt-0.5" style={{ color: "#FFD700" }} />
                      <span className="text-white/60">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-14 flex flex-wrap justify-center gap-6 text-sm text-white/40">
          {["🔒 Secure Razorpay Payment", "✅ Instant Access", "📞 WhatsApp Support", "🔄 Cancel Anytime", "🌍 1,000+ Members · 5 Countries"].map((item, i) => (
            <span key={i} className="font-medium">{item}</span>
          ))}
        </div>

        {/* YouTube CTA */}
        <div className="mt-14 glass-card rounded-3xl p-8 max-w-2xl mx-auto text-center specular">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(255,0,0,0.15)" }}>
            <Zap size={24} className="text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Watch Before You Decide</h3>
          <p className="text-white/50 text-sm mb-5">See exactly what you get with GMS Premium. Watch our YouTube channel for free previews of our sessions.</p>
          <a href="https://www.youtube.com/@GlobalMarketingSchool" target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full px-8 h-11 font-bold text-sm" style={{ background: "#FF0000", color: "#fff" }}>
              Watch on YouTube →
            </Button>
          </a>
        </div>
      </div>

      {/* Paid Plan Modal */}
      <AnimatePresence>
        {isModalOpen && selectedPlan && !isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative rounded-3xl shadow-2xl w-full max-w-md overflow-hidden glass-card specular">
              <div className="p-6 border-b flex justify-between items-center" style={{ background: "rgba(0,80,158,0.5)", borderColor: "rgba(255,215,0,0.15)" }}>
                <div>
                  <h3 className="font-bold text-xl text-white">{selectedPlan.name}</h3>
                  <p className="text-white/50 text-sm">{billing === "yearly" ? "Annual" : "Monthly"} plan</p>
                </div>
                <div className="text-right">
                  <div className="font-black text-3xl" style={{ color: "#FFD700" }}>₹{getPrice(selectedPlan).toLocaleString("en-IN")}</div>
                  <div className="text-xs text-white/40">/{billing === "yearly" ? "year" : "month"}</div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                {[
                  { label: "Full Name *", key: "name", placeholder: "Karthik R", type: "text" },
                  { label: "Email Address *", key: "email", placeholder: "karthik@example.com", type: "email" },
                ].map((f) => (
                  <div key={f.key} className="space-y-1.5">
                    <Label className="text-slate-400 text-xs font-semibold uppercase tracking-wide">{f.label}</Label>
                    <Input {...register(f.key as any)} type={f.type} placeholder={f.placeholder} className="h-11 text-sm border-white/10 text-white placeholder:text-slate-600" style={{ background: "rgba(255,255,255,0.05)" }} />
                    {(errors as any)[f.key] && <p className="text-xs text-red-400">{(errors as any)[f.key]?.message}</p>}
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "WhatsApp *", key: "phone", placeholder: "9876543210" },
                    { label: "City *", key: "city", placeholder: "Chennai" },
                  ].map((f) => (
                    <div key={f.key} className="space-y-1.5">
                      <Label className="text-slate-400 text-xs font-semibold uppercase tracking-wide">{f.label}</Label>
                      <Input {...register(f.key as any)} placeholder={f.placeholder} className="h-11 text-sm border-white/10 text-white placeholder:text-slate-600" style={{ background: "rgba(255,255,255,0.05)" }} />
                      {(errors as any)[f.key] && <p className="text-xs text-red-400">{(errors as any)[f.key]?.message}</p>}
                    </div>
                  ))}
                </div>
                <div className="pt-1 flex gap-3">
                  <Button type="button" variant="outline" className="w-full h-11 border-white/15 text-white/70 hover:bg-white/5 text-sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <button type="submit" disabled={isSubmitting} className="btn-gold w-full h-11 rounded-xl text-sm font-bold disabled:opacity-60 flex items-center justify-center gap-2">
                    {isSubmitting ? <><Loader2 className="animate-spin" size={16} /> Processing...</> : <>Pay ₹{getPrice(selectedPlan).toLocaleString("en-IN")}</>}
                  </button>
                </div>
                <p className="text-xs text-center text-slate-600">🔒 Secured by Razorpay. PCI-DSS compliant.</p>
              </form>
            </motion.div>
          </div>
        )}

        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center glass-card specular">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.2)" }}>
                <ShieldCheck size={40} style={{ color: "#FFD700" }} />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Welcome Aboard! 🎉</h3>
              <p className="text-white/50 text-sm mb-8">Your subscription is active. You'll receive a confirmation email shortly.</p>
              <Button asChild className="w-full h-12 mb-3 font-bold rounded-xl" style={{ background: "#25D366", color: "#fff" }}>
                <a href={FREE_WA_LINK} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2" size={18} /> Join WhatsApp Group</a>
              </Button>
              <Button variant="outline" onClick={() => setIsSuccess(false)} className="w-full h-12 border-white/15 text-white/60 hover:bg-white/5 rounded-xl">Back to Plans</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
