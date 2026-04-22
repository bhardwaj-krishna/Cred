
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import AnimatedCounter from "./AnimatedCounter";
import { AlertTriangle, IndianRupee, HelpCircle, XCircle } from "lucide-react";

const problems = [
  {
    icon: XCircle,
    title: "Fake Engagement",
    description: "Brands lose millions to inflated metrics, bot farms, and manipulated engagement rates.",
    stat: "67%",
    statLabel: "of brands report fraud",
    gradient: "from-red-500/20 to-orange-500/5"
  },
  {
    icon: IndianRupee,
    title: "Payment Chaos",
    description: "Creators face ghosting, late payments, and zero leverage without verified credibility.",
    stat: "45%",
    statLabel: "experience delays",
    gradient: "from-orange-500/20 to-yellow-500/5"
  },
  {
    icon: HelpCircle,
    title: "Blind Guesswork",
    description: "A $40B+ industry making critical decisions based on vanity metrics and gut feelings.",
    stat: "89%",
    statLabel: "rely on vanity metrics",
    gradient: "from-yellow-500/20 to-red-500/5"
  },
];

const ProblemSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 bg-[#020817] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              The Broken System
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Influencer Marketing Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Broken</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              The creator economy is massive — but the trust infrastructure is completely missing.
              It's the Wild West out there.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-20">
            {problems.map((problem, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Hover Gradient */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${problem.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative">
                  <div className="w-14 h-14 mb-8 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <problem.icon className="w-6 h-6 text-white/80" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-8">
                    {problem.description}
                  </p>

                  <div className="pt-6 border-t border-white/5 flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white tracking-tight">{problem.stat}</span>
                    <span className="text-xs text-white/40 font-medium uppercase tracking-wider">{problem.statLabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main stat highlight */}
          <div
            className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="relative max-w-3xl mx-auto overflow-hidden rounded-3xl p-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent">
              <div className="relative bg-[#020817] rounded-3xl p-8 md:p-12 text-center">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                  <div className="text-center md:text-right">
                    <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tighter">
                      $<AnimatedCounter end={40} duration={3000} />B+
                    </div>
                    <div className="text-sm text-white/40 mt-2 font-medium uppercase tracking-widest">Market Size</div>
                  </div>

                  <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

                  <div className="text-center md:text-left">
                    <div className="text-2xl md:text-3xl font-semibold text-white/90 mb-2">Running on Guesswork</div>
                    <p className="text-white/50 text-sm max-w-xs">Without standardized data, 40% of marketing budget is wasted on inefficient partnerships.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
