
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link2, BarChart3, Award, Handshake } from "lucide-react";
import { useState, useEffect } from "react";

const steps = [
  {
    icon: Link2,
    title: "Connect",
    description: "Creators securely connect their social accounts in seconds.",
    color: "text-blue-400",
    bg: "bg-blue-500/10"
  },
  {
    icon: BarChart3,
    title: "Analyze",
    description: "Credora analyzes growth, engagement quality, and consistency.",
    color: "text-purple-400",
    bg: "bg-purple-500/10"
  },
  {
    icon: Award,
    title: "Score",
    description: "A live CredScore is generated based on real performance data.",
    color: "text-green-400",
    bg: "bg-green-500/10"
  },
  {
    icon: Handshake,
    title: "Hire",
    description: "Brands hire based on verified trust — not vanity metrics.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10"
  },
];

const SolutionSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[#020817] relative overflow-hidden">

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Verified Trust In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">4 Steps</span>
            </h2>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-[3rem] left-[10%] right-[10%] h-px bg-white/5">
              <div
                className={`absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-[2s] ease-out ${isVisible ? "w-full" : "w-0"
                  }`}
                style={{ transitionDelay: "500ms" }}
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Step number */}
                  <div className="relative z-10 w-10 h-10 mx-auto mb-8 bg-[#020817] border border-white/10 rounded-full flex items-center justify-center font-bold text-white shadow-lg ring-4 ring-[#020817]">
                    {index + 1}
                  </div>

                  {/* Card */}
                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group hover:-translate-y-2 h-full">
                    <div className={`w-14 h-14 mx-auto mb-6 rounded-2xl ${step.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className={`w-7 h-7 ${step.color}`} />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
