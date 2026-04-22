
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClosingCTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 bg-[#020817] relative overflow-hidden flex items-center justify-center">

      {/* Background Magic */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 to-green-500/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full" />
            <div className="relative inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium backdrop-blur-xl">
              <Sparkles size={16} className="text-blue-400" />
              <span>Start Collaborating Today</span>
            </div>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white leading-tight">
            Ready to find your next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">verified partnership?</span>
          </h2>

          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Join thousands of creators and brands building the future of the creator economy on Credora.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-[#020817] hover:bg-white/90 font-bold h-16 px-10 text-lg w-full sm:w-auto rounded-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1"
              onClick={() => navigate("/active-campaigns")}
            >
              View Active Campaigns
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <p className="mt-8 text-white/30 text-sm">No credit card required for creators.</p>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTASection;
