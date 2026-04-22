import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Save, User, Instagram, Youtube, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreatorProfile = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [formData, setFormData] = useState({
        displayName: "",
        bio: "",
        profilePhotoURL: "", // Manual URL for now as per req
        instagramLink: "",
        followerCount: "",
        ugcPortfolioLink: "",
        niches: "" // Comma separated string for input
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        displayName: data.displayName || "",
                        bio: data.bio || "",
                        profilePhotoURL: data.profilePhotoURL || "",
                        instagramLink: data.instagramLink || "",
                        followerCount: data.followerCount || "",
                        ugcPortfolioLink: data.ugcPortfolioLink || "",
                        niches: data.niches ? data.niches.join(", ") : ""
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
                setFetching(false);
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
        if (!user) return;
        setLoading(true);

        try {
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                displayName: formData.displayName,
                bio: formData.bio,
                profilePhotoURL: formData.profilePhotoURL,
                instagramLink: formData.instagramLink,
                followerCount: Number(formData.followerCount), // Ensure number
                ugcPortfolioLink: formData.ugcPortfolioLink,
                niches: formData.niches.split(",").map(n => n.trim()).filter(n => n),
                updatedAt: serverTimestamp()
            });

            toast({
                title: "Profile Updated",
                description: "Your creator profile has been saved."
            });
            // Optional: navigate back if they came from a redirect, but for now stay here
        } catch (error) {
            console.error("Error updating profile:", error);
            toast({
                title: "Error",
                description: "Failed to save profile. Please try again.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen bg-[#020817] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020817] text-white p-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Creator Profile</h1>
                    <p className="text-white/60">Complete your profile to apply for campaigns.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-6 rounded-xl border border-white/10">

                    <div className="space-y-2">
                        <Label htmlFor="displayName" className="flex items-center gap-2">
                            Full Name
                        </Label>
                        <Input
                            id="displayName"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            className="bg-black/20 border-white/10 text-white"
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="bg-black/20 border-white/10 text-white min-h-[100px]"
                            placeholder="Tell brands about yourself..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="profilePhotoURL" className="flex items-center gap-2">
                            <User className="w-4 h-4" /> Profile Photo URL
                        </Label>
                        <Input
                            id="profilePhotoURL"
                            name="profilePhotoURL"
                            value={formData.profilePhotoURL}
                            onChange={handleChange}
                            className="bg-black/20 border-white/10 text-white"
                            placeholder="https://example.com/photo.jpg"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="instagramLink" className="flex items-center gap-2">
                                <Instagram className="w-4 h-4" /> Instagram Link
                            </Label>
                            <Input
                                id="instagramLink"
                                name="instagramLink"
                                value={formData.instagramLink}
                                onChange={handleChange}
                                className="bg-black/20 border-white/10 text-white"
                                placeholder="https://instagram.com/handle"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="followerCount">Follower Count</Label>
                            <Input
                                id="followerCount"
                                name="followerCount"
                                type="number"
                                value={formData.followerCount}
                                onChange={handleChange}
                                className="bg-black/20 border-white/10 text-white"
                                placeholder="e.g. 10000"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="ugcPortfolioLink" className="flex items-center gap-2">
                            <Youtube className="w-4 h-4" /> UGC / Portfolio Link
                        </Label>
                        <Input
                            id="ugcPortfolioLink"
                            name="ugcPortfolioLink"
                            value={formData.ugcPortfolioLink}
                            onChange={handleChange}
                            className="bg-black/20 border-white/10 text-white"
                            placeholder="Link to your work (Drive, Website)"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="niches" className="flex items-center gap-2">
                            <Hash className="w-4 h-4" /> Niches (comma separated)
                        </Label>
                        <Input
                            id="niches"
                            name="niches"
                            value={formData.niches}
                            onChange={handleChange}
                            className="bg-black/20 border-white/10 text-white"
                            placeholder="Beauty, Tech, Lifestyle"
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="ghost" onClick={() => navigate(-1)} className="text-white/60 hover:text-white">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-primary text-white hover:bg-primary/90">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                            Save Profile
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreatorProfile;
