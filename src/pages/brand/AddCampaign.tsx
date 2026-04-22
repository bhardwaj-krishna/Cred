import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { campaignService } from "@/lib/campaignService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const AddCampaign = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: "",
        niche: "",
        deadline: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return;
        if (!formData.title || !formData.description || !formData.budget || !formData.niche || !formData.deadline) {
            toast({
                title: "Missing Fields",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);

        try {
            // Fetch latest user profile to get logo and name
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.exists() ? userDoc.data() : {};

            await campaignService.createCampaign({
                title: formData.title,
                description: formData.description,
                budget: Number(formData.budget),
                niche: formData.niche,
                deadline: formData.deadline,
                status: "Active",
                brandId: user.uid,
                brandName: userData.brandName || user.displayName || "Unknown Brand",
                brandLogo: userData.logoUrl || ""
            });

            toast({
                title: "Campaign Created",
                description: "Your campaign is now live.",
            });
            navigate("/brand/dashboard");
        } catch (error: any) {
            toast({
                title: "Error",
                description: "Failed to create campaign. Please try again.",
                variant: "destructive"
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

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
                    <h1 className="text-2xl font-bold mb-6">Create New Campaign</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-white">Campaign Title</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="e.g. Summer Skincare Launch"
                                value={formData.title}
                                onChange={handleChange}
                                className="bg-white/5 border-white/10 text-white focus:border-primary/50 placeholder:text-white/20"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="budget" className="text-white">Budget (₹)</Label>
                                <Input
                                    id="budget"
                                    name="budget"
                                    type="number"
                                    placeholder="5000"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="bg-white/5 border-white/10 text-white focus:border-primary/50 placeholder:text-white/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="niche" className="text-white">Niche / Category</Label>
                                <Input
                                    id="niche"
                                    name="niche"
                                    placeholder="e.g. Beauty, Tech"
                                    value={formData.niche}
                                    onChange={handleChange}
                                    className="bg-white/5 border-white/10 text-white focus:border-primary/50 placeholder:text-white/20"
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
                                className="bg-white/5 border-white/10 text-white focus:border-primary/50 placeholder:text-white/20 [color-scheme:dark]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-white">Description & Requirements</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Describe your campaign goals, deliverables, and requirements..."
                                value={formData.description}
                                onChange={handleChange}
                                className="bg-white/5 border-white/10 text-white focus:border-primary/50 min-h-[150px] placeholder:text-white/20"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-11"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Publish Campaign"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCampaign;
