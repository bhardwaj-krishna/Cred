import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setScore((prev) => {
          if (prev >= 847) {
            clearInterval(interval);
            return 847;
          }
          return prev + Math.ceil((847 - prev) / 10);
        });
      }, 50);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollTo = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-charcoal overflow-hidden">
      {/* Layered gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-charcoal via-charcoal to-charcoal-light" />
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-primary/15 rounded-full blur-[180px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] animate-pulse-glow animation-delay-300" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary/5 rounded-full blur-[200px] rotate-12" />
      </div>

      {/* Refined grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Floating particles */}
      <div className="absolute top-[15%] left-[8%] w-1.5 h-1.5 rounded-full bg-primary/60 animate-float" />
      <div className="absolute top-[25%] right-[12%] w-1 h-1 rounded-full bg-primary/40 animate-float-delayed" />
      <div className="absolute bottom-[30%] left-[15%] w-2 h-2 rounded-full bg-primary/30 animate-float animation-delay-200" />
      <div className="absolute top-[60%] right-[20%] w-1.5 h-1.5 rounded-full bg-white/15 animate-float-delayed" />

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70 text-sm font-medium mb-12 backdrop-blur-md transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Now building the trust layer
          </div>

          {/* Headline */}
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white mb-8 leading-[1.05] tracking-[-0.03em] transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            The Trust Layer of
            <br />
            <span className="relative inline-block mt-2">
              <span className="text-gradient">the Creator Economy</span>
              <svg className="absolute -bottom-3 left-0 w-full" height="10" viewBox="0 0 300 10" fill="none">
                <path d="M2 7C60 3 240 3 298 7" stroke="hsl(136, 77%, 28%)" strokeWidth="2.5" strokeLinecap="round" className="animate-fade-in animation-delay-500" />
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-lg md:text-xl text-white/50 mb-14 max-w-2xl mx-auto leading-relaxed font-normal transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Credora turns creator reputation, performance, and reliability into a live
            credibility score — helping brands hire confidently and creators grow with transparency.
          </p>

          {/* CTA */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 shadow-glow-sm hover:shadow-glow transition-all duration-300 text-base"
              onClick={() => navigate("/active-campaigns")}
            >
              View Active Campaigns
            </Button>
          </div>

          {/* Score Card - Redesigned */}
          <div
            className={`transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="relative inline-flex flex-col items-center max-w-md w-full mx-auto">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-primary/10 rounded-[2rem] blur-2xl scale-105" />

              <div className="relative w-full p-10 rounded-[2rem] bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] shadow-2xl">
                <p className="text-white/30 text-xs font-semibold tracking-[0.2em] uppercase mb-6">Sample CredScore</p>

                <div className="text-[6rem] md:text-[7rem] font-extrabold text-white leading-none mb-2 tabular-nums tracking-tight">
                  {score}
                </div>

                <div className="flex items-center justify-center gap-2.5 mb-8">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-glow-sm" />
                  <span className="text-primary font-semibold text-base tracking-wide">Excellent</span>
                </div>

                {/* Score bar */}
                <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-primary/50 via-primary to-primary/80 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(score / 900) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between w-full text-[10px] text-white/20 font-medium">
                  <span>0</span>
                  <span>300</span>
                  <span>600</span>
                  <span>900</span>
                </div>

                {/* Mini metrics */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/[0.06]">
                  {[
                    { icon: Shield, label: "Trust", value: "98%" },
                    { icon: TrendingUp, label: "Growth", value: "+12%" },
                    { icon: Zap, label: "Response", value: "2.1h" },
                  ].map((metric) => (
                    <div key={metric.label} className="text-center">
                      <metric.icon className="w-4 h-4 text-primary/60 mx-auto mb-1.5" />
                      <p className="text-white/80 text-sm font-semibold">{metric.value}</p>
                      <p className="text-white/25 text-[10px] font-medium uppercase tracking-wider">{metric.label}</p>
                    </div>
                  ))}
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
