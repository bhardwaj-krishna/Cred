
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, IndianRupee, ExternalLink, Filter, Search, Calendar, Briefcase } from "lucide-react";
import { campaignService, Campaign } from "@/lib/campaignService";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import ApplicationModal from "@/components/ApplicationModal";
import { Loader2 } from "lucide-react";

// Types
type FilterType = "All" | "Paid" | "Barter";
type SortType = "Newest" | "Highest Budget";

const ActiveCampaigns = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // For redirecting to login
  const { toast } = useToast(); // Added toast hook
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortType, setSortType] = useState<SortType>("Newest"); // Added sortType state

  // Application Modal State
  const [selectedCampaign, setSelectedCampaign] = useState<{ id: string, title: string } | null>(null);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await campaignService.getAllActiveCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Failed to load campaigns", error);
      } finally {
        setLoading(false);
      }
    };
    loadCampaigns();
  }, []);

  // Filter & Logic
  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.brandName || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || (c.budget > 0 && typeFilter === "Paid") || (c.budget === 0 && typeFilter === "Barter");
    const matchesCategory = categoryFilter === "All" || c.niche === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Sorting Logic
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortType === "Newest") {
      const getTimestamp = (date: any) => {
        if (!date) return 0;
        if (date.seconds) return date.seconds;
        if (date instanceof Date) return date.getTime();
        return 0;
      };
      return getTimestamp(b.createdAt) - getTimestamp(a.createdAt);
    } else if (sortType === "Highest Budget") {
      return Number(b.budget) - Number(a.budget);
    }
    return 0;
  });

  // Unique Categories for Filter
  const categories = ["All", ...Array.from(new Set(campaigns.map(c => c.niche)))];

  const handleApply = async (id: string, title: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login as a creator to apply for campaigns.",
      });
      navigate("/login");
      return;
    }
    // Check if user is creator
    if (user.role !== "creator") {
      toast({
        title: "Access Restricted",
        description: "Only creators can apply to campaigns.",
        variant: "destructive"
      });
      return;
    }

    // Check Profile Completeness
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (!userData.instagramLink || !userData.followerCount || !userData.ugcPortfolioLink) {
          toast({
            title: "Incomplete Profile",
            description: "Please complete your profile (Instagram, Followers, Portfolio) to apply.",
            variant: "destructive"
          });
          navigate("/creator/profile");
          return;
        }
      }
    } catch (error) {
      console.error("Profile check failed", error);
      // Fallback: allow apply or block? Block is safer for requirement.
      return;
    }

    setSelectedCampaign({ id, title });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] p-8 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Active Campaigns
            </h1>
            <p className="text-white/60 mt-2 text-lg">
              Find and apply to the best opportunities.
            </p>
          </div>

          <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            onClick={() => {
              if (user?.role === "brand") {
                navigate("/brand/dashboard");
              } else if (user?.role === "creator") {
                navigate("/active-campaigns"); // Or stay here / profile
              } else {
                navigate("/login");
              }
            }}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Manage Dashboard
          </Button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 backdrop-blur-md flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-primary transition-colors h-4 w-4" />
            <input
              type="text"
              placeholder="Search campaigns, niches, brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <select
              className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm outline-none cursor-pointer hover:bg-white/10 transition-colors"
              value={sortType}
              onChange={(e) => setSortType(e.target.value as SortType)}
            >
              <option value="Newest" className="bg-[#020817]">Newest</option>
              <option value="Highest Budget" className="bg-[#020817]">Highest Budget</option>
            </select>

            <select
              className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm outline-none cursor-pointer hover:bg-white/10 transition-colors"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as FilterType)}
            >
              <option value="All" className="bg-[#020817]">All Types</option>
              <option value="Paid" className="bg-[#020817]">Paid</option>
              <option value="Barter" className="bg-[#020817]">Barter</option>
            </select>

            <select
              className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm outline-none cursor-pointer hover:bg-white/10 transition-colors"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-[#020817]">{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        {sortedCampaigns.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
            <Filter className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">No campaigns found</h3>
            <p className="text-white/60 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCampaigns.map((campaign) => (
              <Card key={campaign.id} className="group flex flex-col overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300 hover:border-primary/50 bg-card/50 backdrop-blur-sm h-full">
                <div className="relative h-48 overflow-hidden shrink-0 bg-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                    {campaign.brandLogo && (
                      <img
                        src={campaign.brandLogo}
                        alt={campaign.brandName}
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="flex items-center gap-3 mb-2">
                      {campaign.brandLogo ? (
                        <img src={campaign.brandLogo} alt="Brand" className="w-8 h-8 rounded-full border border-white/20 object-cover bg-black" />
                      ) : (
                        <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-white uppercase">{(campaign.brandName || "B").charAt(0)}</span>
                        </div>
                      )}
                      <Badge variant="secondary" className="backdrop-blur-md bg-white/20 text-white border-none">
                        {campaign.niche}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-white shadow-black drop-shadow-md">{campaign.title}</h3>
                    {campaign.brandName && <p className="text-white/70 text-sm font-medium">{campaign.brandName}</p>}
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardDescription className="line-clamp-2 mt-1 min-h-[40px]">{campaign.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 text-sm flex-grow">
                  <div className="flex items-center gap-2 text-muted-foreground bg-secondary/10 p-2 rounded-md">
                    <IndianRupee className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-medium text-foreground">
                      {campaign.budget > 0 ? `₹${Number(campaign.budget).toLocaleString()}` : "Barter Collaboration"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Deadline: {campaign.deadline}</span>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-border/30 mt-auto">
                  <Button
                    size="sm"
                    className="group/btn gap-1.5 w-full"
                    onClick={() => handleApply(campaign.id, campaign.title)}
                  >
                    Apply Now
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Application Modal */}
        {selectedCampaign && (
          <ApplicationModal
            isOpen={!!selectedCampaign}
            onClose={() => setSelectedCampaign(null)}
            campaignId={selectedCampaign.id}
            campaignTitle={selectedCampaign.title}
          />
        )}

      </div>
    </div>
  );
};

export default ActiveCampaigns;
