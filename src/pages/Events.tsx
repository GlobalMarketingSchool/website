import { useListEvents } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Calendar, MapPin, Clock, Video, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Events() {
  const { data: events, isLoading, error } = useListEvents();

  return (
    <div className="pt-32 pb-24 min-h-screen" style={{ background: "#121212" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#FFD700" }}>What's On</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Upcoming <span style={{ color: "#FFD700" }}>Events</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl">Join our workshops, bootcamps, and training sessions to level up your marketing skills.</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin mb-4" style={{ color: "#FFD700" }} />
            <p className="text-slate-400 font-medium">Loading events...</p>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl text-center" style={{ background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.2)" }}>
            <p className="text-red-400">Failed to load events. Please try again later.</p>
          </div>
        ) : !events || events.length === 0 ? (
          <div className="p-16 rounded-3xl border border-white/10 text-center" style={{ background: "#0d1e35" }}>
            <Calendar className="w-16 h-16 mx-auto mb-6 text-slate-600" />
            <h3 className="text-2xl font-bold text-white mb-2">No events scheduled</h3>
            <p className="text-slate-500">Check back soon for new workshops and bootcamps.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="rounded-3xl overflow-hidden border border-white/10 hover:border-yellow-400/30 hover:-translate-y-1 transition-all flex flex-col" style={{ background: "#0d1e35" }}>
                <div className="h-48 p-6 flex flex-col justify-between relative overflow-hidden" style={{ background: "#00509E" }}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" style={{ background: "rgba(255,215,0,0.15)" }} />
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold w-max" style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}>
                    {event.isOnline ? <Video size={14} /> : <MapPin size={14} />}
                    {event.type}
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight z-10">{event.title}</h3>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-6 mb-4 text-slate-400 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} style={{ color: "#FFD700" }} />
                      {event.date ? (() => { try { return format(new Date(event.date), "MMM dd, yyyy"); } catch { return event.date; } })() : "TBD"}
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2">
                        <Clock size={16} style={{ color: "#FFD700" }} />
                        <span>{event.time}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-400 line-clamp-3 mb-6 flex-grow text-sm">
                    {event.description || "Join us for this transformative session tailored for Tamil entrepreneurs."}
                  </p>

                  <Button asChild className="w-full justify-between font-bold rounded-xl" style={{ background: "#FFD700", color: "#121212" }}>
                    <a href={event.registrationLink || "/subscription"} target={event.registrationLink ? "_blank" : "_self"}>
                      Register Now <ArrowRight size={18} />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
