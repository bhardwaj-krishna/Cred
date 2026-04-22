
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Users, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AudienceSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-[#020817] relative overflow-hidden">

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Who It's For
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Trust Benefits <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Everyone</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* Creator Card */}
            <div className="group relative p-10 rounded-[2.5rem] bg-[#0F172A] border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-purple-500/20 transition-colors" />

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Creators</h3>
                  <p className="text-white/40 font-medium tracking-wide">5K – 5M Followers</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {[
                  "Build credibility that compounds over time",
                  "Get paid instantly with escrow protection",
                  "Showcase verified metrics",
                  "Stand out with your CredScore"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{benefit}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/signup")}
                className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white font-semibold transition-all flex items-center justify-center gap-2 group-hover:bg-purple-500 group-hover:text-white group-hover:border-purple-500"
              >
                Join as a Creator
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Brand Card */}
            <div className="group relative p-10 rounded-[2.5rem] bg-[#0F172A] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-blue-500/20 transition-colors" />

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Brands</h3>
                  <p className="text-white/40 font-medium tracking-wide">Enterprise & SMB</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {[
                  "Hire with confidence using verified scores",
                  "Eliminate fraud & fake engagement",
                  "Maximize ROI with smart matching",
                  "Scale campaigns efficiently"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{benefit}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/signup")}
                className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white font-semibold transition-all flex items-center justify-center gap-2 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500"
              >
                Partner with Us
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
