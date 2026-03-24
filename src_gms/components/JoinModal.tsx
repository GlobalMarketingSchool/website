import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2, MessageCircle, CheckCircle2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCreateMember } from "@workspace/api-client-react";
import { useJoinModal } from "@/contexts/JoinModalContext";

const FREE_WHATSAPP_LINK = "https://chat.whatsapp.com/GeqgHVDT2kW5vE0MLw0zUm?mode=gi_t";

const joinSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Enter a valid WhatsApp number"),
  city: z.string().min(2, "City is required"),
  businessName: z.string().optional(),
});

type JoinFormValues = z.infer<typeof joinSchema>;

export function JoinModal() {
  const { isOpen, closeModal } = useJoinModal();
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const createMember = useCreateMember();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JoinFormValues>({ resolver: zodResolver(joinSchema) });

  const onSubmit = async (data: JoinFormValues) => {
    try {
      await createMember.mutateAsync({
        data: {
          name: data.name,
          phone: data.phone,
          city: data.city,
          businessName: data.businessName || undefined,
          subscriptionPlan: "plan_free",
        },
      });
      setIsSuccess(true);
      reset();
    } catch {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again or contact us on WhatsApp.",
      });
    }
  };

  const handleClose = () => {
    closeModal();
    setIsSuccess(false);
    reset();
  };

  const goToWhatsApp = () => {
    window.open(FREE_WHATSAPP_LINK, "_blank", "noopener,noreferrer");
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: "#0d1e35", border: "1px solid rgba(255,215,0,0.15)" }}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
            >
              <X size={16} />
            </button>

            {!isSuccess ? (
              <>
                {/* Header */}
                <div className="p-8 pb-6" style={{ background: "#00509E" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,215,0,0.15)" }}>
                      <Users size={20} style={{ color: "#FFD700" }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">Join the Community</h3>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Free membership · 10,000+ members</p>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                    Fill in your details and we'll add you to our exclusive WhatsApp group instantly.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="jm-name" className="text-slate-300 text-sm font-medium">Full Name *</Label>
                    <Input
                      id="jm-name"
                      {...register("name")}
                      placeholder="Karthik Ramasamy"
                      className="h-12 border-white/10 text-white placeholder:text-slate-500 focus:border-yellow-400"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    />
                    {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jm-phone" className="text-slate-300 text-sm font-medium">WhatsApp Number *</Label>
                    <Input
                      id="jm-phone"
                      {...register("phone")}
                      placeholder="9876543210"
                      className="h-12 border-white/10 text-white placeholder:text-slate-500 focus:border-yellow-400"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    />
                    {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="jm-city" className="text-slate-300 text-sm font-medium">City *</Label>
                      <Input
                        id="jm-city"
                        {...register("city")}
                        placeholder="Chennai"
                        className="h-12 border-white/10 text-white placeholder:text-slate-500 focus:border-yellow-400"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                      {errors.city && <p className="text-xs text-red-400">{errors.city.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jm-biz" className="text-slate-300 text-sm font-medium">Business (Optional)</Label>
                      <Input
                        id="jm-biz"
                        {...register("businessName")}
                        placeholder="Your Business"
                        className="h-12 border-white/10 text-white placeholder:text-slate-500 focus:border-yellow-400"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-13 font-bold text-base rounded-2xl"
                    style={{ background: "#FFD700", color: "#121212", height: "52px" }}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="animate-spin mr-2" size={18} /> Joining...</>
                    ) : (
                      "Join Free Community →"
                    )}
                  </Button>

                  <p className="text-center text-xs text-slate-500">
                    By joining, you agree to our{" "}
                    <a href="/policy" className="underline" style={{ color: "#FFD700" }}>community guidelines</a>.
                    No spam, ever.
                  </p>
                </form>
              </>
            ) : (
              /* Success */
              <div className="p-10 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(255,215,0,0.1)" }}>
                  <CheckCircle2 size={40} style={{ color: "#FFD700" }} />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">You're In! 🎉</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Welcome to Global Marketing School! Click below to join our exclusive WhatsApp group and start learning immediately.
                </p>
                <Button
                  onClick={goToWhatsApp}
                  className="w-full h-14 text-base font-bold rounded-2xl"
                  style={{ background: "#25D366", color: "#fff" }}
                >
                  <MessageCircle className="mr-2" size={20} />
                  Join WhatsApp Group Now
                </Button>
                <button
                  onClick={handleClose}
                  className="mt-4 text-sm text-slate-500 hover:text-slate-300 transition-colors block mx-auto"
                >
                  I'll join later
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
