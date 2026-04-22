
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Award, MessageSquare, Shield, Brain, Trophy } from "lucide-react";

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="product" className="py-16 md:py-24 bg-[#020817] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              Platform Features
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Built For <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Trust At Scale</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-lg font-light leading-relaxed">
              The infrastructure you need to verify, manage, and scale creator relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto auto-rows-[minmax(180px,auto)]">

            {/* CredScore - Large Feature */}
            <div className="md:col-span-2 md:row-span-2 group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6">
                    <Award className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Dynamic CredScore</h3>
                  <p className="text-white/50 leading-relaxed max-w-md">
                    Our proprietary algorithm analyzes performance, delivery history, and professional reliability to generate a live trust score.
                  </p>
                </div>
                {/* Visual Mockup */}
                <div className="mt-8 relative h-32 bg-[#0F172A] rounded-xl border border-white/10 overflow-hidden flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white">92<span className="text-green-500 text-lg">/100</span></div>
                    <div className="text-xs text-white/40 uppercase tracking-widest mt-1">Excellent Reputation</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Matching */}
            <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Matching</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                AI-driven discovery by score, niche, and ROI potential.
              </p>
            </div>

            {/* Escrow Payments */}
            <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Escrow Payments</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Funds release only on mutual confirmation. Zero ghosting.
              </p>
            </div>

            {/* Verified Reviews - Wide */}
            <div className="md:col-span-2 group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Verified Reviews</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Two-sided accountability. Brands rate creators, Creators rate brands.
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-[#0F172A] p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-500">{"★".repeat(5)}</div>
                    <span className="text-white/40 text-xs">2 days ago</span>
                  </div>
                  <p className="text-white/80 text-sm italic">"Delivered assets 2 days early. High quality work."</p>
                </div>
              </div>
            </div>

            {/* Gamified Growth */}
            <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Gamified Growth</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Challenges that reward consistency.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
