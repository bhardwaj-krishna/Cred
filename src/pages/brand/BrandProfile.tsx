
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Save, Building2 } from "lucide-react";

const BrandProfile = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        brandName: "",
        description: "",
        website: "",
        logoUrl: "",
        industry: ""
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.uid) return;
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        brandName: data.brandName || data.displayName || "",
                        description: data.description || "",
                        website: data.website || "",
                        logoUrl: data.logoUrl || "",
                        industry: data.industry || ""
                    });
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                toast({
                    title: "Error",
                    description: "Failed to load profile data.",
                    variant: "destructive"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user, toast]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.uid) return;

        setSaving(true);
        try {
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                brandName: formData.brandName,
                displayName: formData.brandName, // Sync display name
                description: formData.description,
                website: formData.website,
                logoUrl: formData.logoUrl,
                industry: formData.industry,
                updatedAt: new Date().toISOString()
            });

            toast({
                title: "Profile Updated",
                description: "Your brand profile has been successfully saved."
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            toast({
                title: "Error",
                description: "Failed to save profile changes.",
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-white/30" />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight">Brand Profile</h1>
                <p className="text-white/60 mt-2">Manage your public brand identity visible to creators.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Brand Identity Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                            <Building2 className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-semibold text-white">Brand Identity</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="brandName" className="text-white">Brand Name</Label>
                                <Input
                                    id="brandName"
                                    name="brandName"
                                    value={formData.brandName}
                                    onChange={handleChange}
                                    placeholder="e.g. Acme Corp"
                                    className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="industry" className="text-white">Industry</Label>
                                <Input
                                    id="industry"
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    placeholder="e.g. Fashion, Tech, Beauty"
                                    className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-white">About the Brand</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Tell creators about your brand mission and values..."
                                className="bg-white/5 border-white/10 text-white focus:border-primary/50 min-h-[120px]"
                            />
                        </div>
                    </div>

                    {/* Online Presence Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-xs font-bold text-primary">@</span>
                            </div>
                            <h2 className="text-lg font-semibold text-white">Online Presence</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="website" className="text-white">Website URL</Label>
                                <Input
                                    id="website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder="https://"
                                    className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="logoUrl" className="text-white">Logo URL</Label>
                                <Input
                                    id="logoUrl"
                                    name="logoUrl"
                                    value={formData.logoUrl}
                                    onChange={handleChange}
                                    placeholder="https://... (Image Link)"
                                    className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                                />
                                <p className="text-xs text-white/40">Provide a direct link to your logo image.</p>
                            </div>
                        </div>

                        {formData.logoUrl && (
                            <div className="mt-4">
                                <p className="text-sm text-white/60 mb-2">Logo Preview:</p>
                                <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                    <img src={formData.logoUrl} alt="Logo Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button
                            type="submit"
                            className="bg-primary hover:bg-primary/90 text-white min-w-[140px]"
                            disabled={saving}
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BrandProfile;
