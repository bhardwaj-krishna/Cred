
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import AnimatedCounter from "./AnimatedCounter";
import { Globe, TrendingUp, Users } from "lucide-react";

const stats = [
  { value: 40, suffix: "B+", label: "Creator Economy Size", icon: Globe, prefix: "$" },
  { value: 50, suffix: "M+", label: "Active Creators", icon: Users },
  { value: 30, suffix: "%", label: "Annual Growth", icon: TrendingUp },
];

const VisionSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-32 bg-[#020817] text-white relative overflow-hidden flex items-center justify-center min-h-[60vh]">
      {/* Cinematic Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[700px] bg-white/5 blur-[100px] rounded-br-full rounded-bl-full pointer-events-none opacity-50" />
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#020817] to-transparent z-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="text-center max-w-4xl mx-auto mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-semibold uppercase tracking-wider mb-8 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Our Vision
            </div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              Trust That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20">Compounds.</span>
            </h2>

            <p className="text-white/50 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
              We're building the default trust infrastructure for the creator economy — where a CredScore matters as much as a credit score.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-[#020817] p-12 text-center transition-colors hover:bg-white/[0.02]"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-white/5 flex items-center justify-center text-white/80 group-hover:scale-110 transition-transform duration-500">
                  <stat.icon className="w-7 h-7" />
                </div>

                <div className="text-5xl md:text-6xl font-black text-white mb-2 tabular-nums tracking-tighter">
                  {isVisible ? (
                    <>
                      {stat.prefix}
                      <AnimatedCounter end={stat.value} duration={2500} />
                      <span className="text-white/30 text-4xl">{stat.suffix}</span>
                    </>
                  ) : (
                    <span>{stat.prefix}0{stat.suffix}</span>
                  )}
                </div>

                <p className="text-white/40 font-medium uppercase tracking-widest text-xs mt-4">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
