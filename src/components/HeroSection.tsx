
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Zap, CheckCircle2, Play, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 pb-12 bg-[#020817] text-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-slow mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -z-10 mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Content */}
          <div className={`flex-1 text-center lg:text-left transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 hover:bg-white/10 transition-colors cursor-default shadow-lg shadow-black/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-white/90">Platform Live & Hiring</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-white">
              <span className="text-white drop-shadow-sm">
                Trust-Based
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 animate-gradient bg-300%">
                Influencer Marketing
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Stop guessing. Start growing. Credora verifies creator authenticity so brands can partner with confidence and creators get paid what they're worth.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="h-14 px-8 text-base bg-white text-black hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl w-full sm:w-auto font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
                onClick={() => navigate("/signup")}
              >
                Join as a Creator
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all rounded-xl w-full sm:w-auto text-white hover:text-white hover:border-white/20"
                onClick={() => navigate("/signup")}
              >
                Partner with Us
              </Button>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-white/40">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">Verified Creators</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">Secure Payments</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className={`flex-1 w-full max-w-[600px] lg:max-w-none transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative perspective-1000">
              {/* Decorative Circle */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/30 rounded-full blur-[80px] animate-pulse-slow"></div>

              {/* Main Card */}
              <div className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl shadow-black/50 overflow-hidden group hover:border-white/20 transition-all duration-500 hover:rotate-y-[-2deg] hover:rotate-x-[2deg] transform-gpu">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Header Mockup */}
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 shadow-lg shadow-emerald-500/20" />
                    <div>
                      <div className="h-2.5 w-24 bg-white/20 rounded-full mb-2" />
                      <div className="h-2 w-16 bg-white/10 rounded-full" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400/20" />
                    <span className="w-2 h-2 rounded-full bg-yellow-400/20" />
                    <span className="w-2 h-2 rounded-full bg-green-400/20" />
                  </div>
                </div>

                {/* Content Mockup */}
                <div className="space-y-4">
                  {/* Card 1 */}
                  <div className="relative h-28 rounded-2xl bg-black/40 border border-white/5 overflow-hidden group/item hover:bg-black/50 transition-colors cursor-pointer p-4 flex flex-col justify-end">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-[9px] font-bold tracking-wider uppercase border border-green-500/20">Paid Partnership</div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-white">Tech Review 2026</span>
                        <span className="text-green-400 font-bold text-sm">₹35,000</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-white/50">
                        <span>45k Views</span>
                        <span className="w-1 h-1 rounded-full bg-white/20"></span>
                        <span>8.2% Engagement</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="relative h-28 rounded-2xl bg-black/40 border border-white/5 overflow-hidden group/item hover:bg-black/50 transition-colors cursor-pointer p-4 flex flex-col justify-end">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[9px] font-bold tracking-wider uppercase border border-blue-500/20">Collaboration</div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-white">Lifestyle Shoot</span>
                        <span className="text-blue-400 font-bold text-sm">Product + ₹1.2k</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-white/50">
                        <span>12k Likes</span>
                        <span className="w-1 h-1 rounded-full bg-white/20"></span>
                        <span>Verified Brand</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 - New Denser Element */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-purple-500/20">AI</div>
                    <div className="flex-1">
                      <div className="h-1.5 w-24 bg-white/10 rounded-full mb-1.5 overflow-hidden">
                        <div className="h-full w-[85%] bg-purple-500 rounded-full animate-pulse-glow"></div>
                      </div>
                      <div className="text-[10px] text-white/40 font-medium flex justify-between">
                        <span>Analysis Complete</span>
                        <span className="text-purple-400">98% Match</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Mockup */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/5">
                  {[
                    { label: "Reach", value: "2.4M", icon: Globe, color: "text-blue-400" },
                    { label: "Trust", value: "98%", icon: Shield, color: "text-green-400" },
                    { label: "Active", value: "145", icon: Zap, color: "text-yellow-400" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                      <stat.icon className={`w-4 h-4 mx-auto mb-2 ${stat.color}`} />
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                      <div className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl animate-bounce-slow hidden md:block ring-1 ring-white/5">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2.5 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">ROI Optimized</div>
                    <div className="text-xs text-green-400/80 font-medium">+127% vs Average</div>
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

export default HeroSection;
