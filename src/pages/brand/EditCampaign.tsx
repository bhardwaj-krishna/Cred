import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { campaignService } from "@/lib/campaignService";

const EditCampaign = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: "",
        niche: "",
        deadline: ""
    });

    useEffect(() => {
        const fetchCampaign = async () => {
            if (!id || !user) return;
            try {
                const campaign = await campaignService.getCampaign(id);
                if (campaign) {
                    if (campaign.brandId !== user.uid) {
                        toast({
                            title: "Access Denied",
                            description: "You cannot edit this campaign.",
                            variant: "destructive"
                        });
                        navigate("/brand/dashboard");
                        return;
                    }
                    setFormData({
                        title: campaign.title,
                        description: campaign.description,
                        budget: String(campaign.budget),
                        niche: campaign.niche,
                        deadline: campaign.deadline
                    });
                } else {
                    toast({
                        title: "Not Found",
                        description: "Campaign not found.",
                        variant: "destructive"
                    });
                    navigate("/brand/dashboard");
                }
            } catch (error) {
                console.error("Error fetching campaign:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaign();
    }, [id, user, navigate, toast]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        if (!formData.title || !formData.description || !formData.budget || !formData.niche || !formData.deadline) {
            toast({
                title: "Missing Fields",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            return;
        }

        setSubmitting(true);

        try {
            await campaignService.updateCampaign(id, {
                title: formData.title,
                description: formData.description,
                budget: Number(formData.budget),
                niche: formData.niche,
                deadline: formData.deadline,
            });

            toast({
                title: "Campaign Updated",
                description: "Changes saved successfully.",
            });
            navigate("/brand/dashboard");
        } catch (error: any) {
            toast({
                title: "Error",
                description: "Failed to update campaign.",
                variant: "destructive"
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020817] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020817] p-8 text-white">
            <div className="max-w-2xl mx-auto">
                <Button
                    variant="ghost"
                    className="mb-6 pl-0 text-white/50 hover:text-white hover:bg-transparent"
                    onClick={() => navigate("/brand/dashboard")}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>

                <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
                    <h1 className="text-2xl font-bold mb-6">Edit Campaign</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-white">Campaign Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="budget" className="text-white">Budget (₹)</Label>
                                <Input
                                    id="budget"
                                    name="budget"
                                    type="number"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="niche" className="text-white">Niche / Category</Label>
                                <Input
                                    id="niche"
                                    name="niche"
                                    value={formData.niche}
                                    onChange={handleChange}
                                    className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="deadline" className="text-white">Application Deadline</Label>
                            <Input
                                id="deadline"
                                name="deadline"
                                type="date"
                                value={formData.deadline}
                                onChange={handleChange}
                                className="bg-white/5 border-white/10 text-white focus:border-primary/50 [color-scheme:dark]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-white">Description & Requirements</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="bg-white/5 border-white/10 text-white focus:border-primary/50 min-h-[150px]"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-11"
                            disabled={submitting}
                        >
                            {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCampaign;
