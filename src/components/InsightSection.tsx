
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CreditCard, Star, ShoppingCart, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";

const InsightSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += 1;
        // Ease out quadratic function for smoother animation
        const progress = current / steps;
        const easedProgress = 1 - (1 - progress) * (1 - progress);
        const value = Math.round(easedProgress * 98);

        setScore(value);
        if (current >= steps) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <section id="about" className="py-16 md:py-24 bg-[#020817] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                The Solution
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                Standardized Trust <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">For The Creator Economy</span>
              </h2>
              <p className="text-white/60 text-lg font-light leading-relaxed mb-8">
                Just as FICO standardized credit and Uber standardized ride safety, Credora provides the universal trust layer for influencer marketing.
              </p>

              <div className="space-y-4">
                {[
                  { icon: CreditCard, label: "Finance has FICO" },
                  { icon: Star, label: "Rideshare has Ratings" },
                  { icon: ShoppingCart, label: "E-commerce has Reviews" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-white/90 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual - Trust Score */}
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Glowing Ring Background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-green-500/20 rounded-full blur-3xl animate-pulse-slow" />

                {/* Main Gauge Container */}
                <div className="absolute inset-0 m-4 bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl flex items-center justify-center">
                  <div className="text-center relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <ShieldCheck className="w-6 h-6 text-green-400" />
                      <span className="text-sm font-semibold text-green-400 uppercase tracking-widest">Credora Score</span>
                    </div>
                    <div className="text-8xl md:text-9xl font-bold text-white tracking-tighter tabular-nums transition-all">
                      {score}
                    </div>
                    <div className="text-white/40 font-medium mt-2">Excellent Trust Rating</div>
                  </div>

                  {/* SVG Progress Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90 p-8">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="20"
                      className="text-white/5"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="20"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * score) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#22C55E" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightSection;
