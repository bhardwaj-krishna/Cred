import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2, Plus, Trash2, Edit2, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { campaignService, Campaign } from "@/lib/campaignService";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BrandDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCampaigns = async () => {
        if (!user) return;
        try {
            const data = await campaignService.getCampaignsByBrand(user.uid);
            setCampaigns(data);
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            toast({
                title: "Error",
                description: "Failed to load campaigns.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, [user]);



    const handleDelete = async (id: string) => {
        try {
            await campaignService.deleteCampaign(id);
            toast({ title: "Campaign Deleted", description: "Campaign was successfully removed." });
            setCampaigns(prev => prev.filter(c => c.id !== id));
        } catch (error: any) {
            toast({ title: "Error", description: "Failed to delete campaign.", variant: "destructive" });
        }
    };

    return (
        <div className="min-h-screen bg-[#020817] p-8 text-white">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Brand Dashboard</h1>
                        <p className="text-white/60 mt-1">Manage your campaigns and partnerships.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            onClick={() => navigate("/brand/add-campaign")}
                            className="bg-primary hover:bg-primary/90 text-white"
                        >
                            <Plus className="w-4 h-4 mr-2" /> Add Campaign
                        </Button>
                    </div>
                </div>

                {/* Stats placeholder */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                        <h3 className="text-lg font-medium text-white/70 mb-2">Active Campaigns</h3>
                        <p className="text-4xl font-bold text-blue-400">{campaigns.filter(c => c.status === "Active").length}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                        <h3 className="text-lg font-medium text-white/70 mb-2">Total Budget</h3>
                        <p className="text-4xl font-bold text-green-400">
                            ${campaigns.reduce((sum, c) => sum + Number(c.budget || 0), 0).toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                        <h3 className="text-lg font-medium text-white/70 mb-2">Drafts</h3>
                        <p className="text-4xl font-bold text-purple-400">{campaigns.filter(c => c.status === "Draft").length}</p>
                    </div>
                </div>

                {/* Campaigns List */}
                <h2 className="text-2xl font-bold mb-6">My Campaigns</h2>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-white/30" />
                    </div>
                ) : campaigns.length === 0 ? (
                    <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-xl border-dashed">
                        <p className="text-white/40 mb-4">No campaigns found.</p>
                        <Button variant="secondary" onClick={() => navigate("/brand/add-campaign")}>
                            Create your first campaign
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {campaigns.map((campaign) => (
                            <div key={campaign.id} className="group bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-between hover:border-white/20 transition-all">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-semibold text-lg">{campaign.title}</h3>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border ${campaign.status === "Active" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                            campaign.status === "Completed" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                                "bg-white/5 text-white/40 border-white/10"
                                            }`}>
                                            {campaign.status}
                                        </span>
                                    </div>
                                    <p className="text-white/50 text-sm">Budget: <span className="text-white">${Number(campaign.budget).toLocaleString()}</span></p>
                                    <p className="text-white/30 text-xs mt-1">Deadline: {campaign.deadline}</p>
                                </div>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-white/50 hover:text-blue-400 hover:bg-blue-400/10"
                                        title="View Applicants"
                                        onClick={() => navigate(`/brand/campaign/${campaign.id}/applications`)}
                                    >
                                        <Users className="w-4 h-4" />
                                    </Button>

                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10"
                                        onClick={() => navigate(`/brand/edit-campaign/${campaign.id}`)}
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </Button>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-white/50 hover:text-red-400 hover:bg-red-400/10">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="bg-[#0f172a] border-white/10 text-white">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Campaign?</AlertDialogTitle>
                                                <AlertDialogDescription className="text-white/60">
                                                    This action cannot be undone. This will permanently delete the campaign "{campaign.title}".
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(campaign.id)} className="bg-red-500 hover:bg-red-600 border-none">Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default BrandDashboard;
