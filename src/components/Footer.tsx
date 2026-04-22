
import { Linkedin, Github } from "lucide-react";
import credoraLogo from "@/assets/credora-logo.png";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Product", href: "#product" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Active Campaigns", href: "/active-campaigns" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/credoora", label: "LinkedIn" },
  // Keeping Github as a placeholder or example of another professional link if needed, or we can just have LinkedIn
  // Removing Twitter/Instagram as requested
];

const Footer = () => {
  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    // Only intercept hash links
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-12 bg-[#020817] text-white border-t border-white/[0.04] relative overflow-hidden">
      {/* Footer Magic - Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-blue-900/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src={credoraLogo} alt="Credora" className="h-10 opacity-90" />
            <p className="text-white/40 text-sm max-w-xs text-center md:text-left">
              The trust layer for the creator economy. Verified data, escrow payments, and reliable partnerships.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <nav className="flex flex-wrap items-center justify-center gap-8">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick(link.href)}
                  className="text-white/50 hover:text-white transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/5 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Credora Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/20">
            <a href="#" className="hover:text-white/40 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/40 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
