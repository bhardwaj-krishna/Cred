import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Product", href: "/#product" },
  { label: "How It Works", href: "/#how-it-works" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we are on a page that needs a dark header (like Active Campaigns)
  const isDarkPage = location.pathname !== "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith("/#")) {
      e.preventDefault();
      // If we are on the homepage, scroll. Otherwise navigate home with the hash
      if (location.pathname === "/") {
        const hash = href.replace("/", "");
        const element = document.querySelector(hash);
        element?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(href);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isDarkPage
        ? "bg-[#020817]/80 backdrop-blur-md border-b border-white/5 shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-16 md:h-[4.5rem]">
          <a href="/" onClick={handleLogoClick} className="flex items-center group">
            <img
              alt="Credora"
              className="h-10 md:h-12 transition-transform duration-300 group-hover:scale-105"
              src="/lovable-uploads/694dcc2c-0eeb-4ed8-9728-299542e73246.png"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick(link.href)}
                className={`text-[13px] font-medium transition-all duration-300 hover:text-white relative group ${isScrolled || isDarkPage ? "text-white/70" : "text-white/60"
                  }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-glow-sm hover:shadow-glow transition-all duration-300 h-9 px-5 text-[13px] rounded-lg"
              onClick={() => navigate("/active-campaigns")}
            >
              Active Campaigns
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="text-white" size={22} />
            ) : (
              <Menu className="text-white" size={22} />
            )}
          </button>
        </nav>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="py-5 border-t border-white/10 bg-[#020817]/95 backdrop-blur-xl rounded-b-xl">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick(link.href)}
                  className="text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <div className="px-4 pt-3">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 rounded-lg"
                  onClick={() => navigate("/active-campaigns")}
                >
                  Active Campaigns
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
