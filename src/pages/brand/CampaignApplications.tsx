
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { campaignService } from "@/lib/campaignService";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Instagram, Youtube, ExternalLink, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const CampaignApplications = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [campaignTitle, setCampaignTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Campaign Details for Title
                const campaign = await campaignService.getCampaign(id);
                if (campaign) setCampaignTitle(campaign.title);

                // Fetch Applications
                const apps = await campaignService.getApplicationsByCampaign(id);

                // Fetch Creator Profiles for each App
                const appsWithProfiles = await Promise.all(apps.map(async (app) => {
                    if (!app.creatorId) return app;
                    try {
                        const userDoc = await getDoc(doc(db, "users", app.creatorId));
                        if (userDoc.exists()) {
                            const userData = userDoc.data();
                            return {
                                ...app,
                                applicantName: userData.displayName || app.applicantName || "Anonymous", // Prefer profile name
                                followerCount: userData.followerCount,
                                instagramLink: userData.instagramLink,
                                ugcLink: userData.ugcPortfolioLink,
                                profilePhotoURL: userData.profilePhotoURL,
                                bio: userData.bio
                            };
                        }
                    } catch (e) {
                        console.error("Failed to fetch profile for", app.creatorId);
                    }
                    return app;
                }));

                setApplications(appsWithProfiles);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <Button
                variant="ghost"
                className="mb-6 text-white/50 hover:text-white pl-0 hover:bg-transparent"
                onClick={() => navigate("/brand/dashboard")}
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Applications</h1>
                    <p className="text-white/60 mt-1">
                        Reviewing {applications.length} applicants for <span className="text-white font-medium">"{campaignTitle}"</span>
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-white/30" />
                </div>
            ) : applications.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                    <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white">No applicants yet</h3>
                    <p className="text-white/60 mt-2">Wait for creators to discover your campaign.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {applications.map((app) => (
                        <Card key={app.id} className="bg-white/5 border-white/10 text-white overflow-hidden">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div className="flex gap-4">
                                    {/* Profile Photo */}
                                    {app.profilePhotoURL ? (
                                        <img src={app.profilePhotoURL} alt={app.applicantName} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                            <span className="text-lg font-bold text-white/50">{(app.applicantName || "C").charAt(0)}</span>
                                        </div>
                                    )}

                                    <div>
                                        <div className="flex items-center gap-3">
                                            <CardTitle className="text-xl font-semibold">{app.applicantName}</CardTitle>
                                            <Badge variant="secondary" className="bg-white/10 text-white/80 hover:bg-white/20">
                                                {Number(app.followerCount).toLocaleString()} Followers
                                            </Badge>
                                        </div>
                                        {/* Bio Snippet or Email */}
                                        <CardDescription className="text-white/40 mt-1 line-clamp-1">{app.bio || app.applicantEmail}</CardDescription>
                                    </div>
                                </div>
                                <div className="text-xs text-white/30">
                                    Applied: {app.submittedAt?.toDate().toLocaleDateString()}
                                </div>
                            </CardHeader>
                            <CardContent className="mt-4 space-y-4">
                                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                                    <h4 className="text-xs uppercase font-bold text-white/30 mb-2">Pitch</h4>
                                    <p className="text-sm text-white/80 italic">"{app.pitch}"</p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {app.instagramLink && (
                                        <Button variant="outline" size="sm" className="border-white/10 bg-white/5 hover:bg-white/10 hover:text-white" asChild>
                                            <a href={app.instagramLink} target="_blank" rel="noopener noreferrer">
                                                <Instagram className="w-4 h-4 mr-2 text-pink-500" /> Instagram
                                            </a>
                                        </Button>
                                    )}
                                    {app.ugcLink && (
                                        <Button variant="outline" size="sm" className="border-white/10 bg-white/5 hover:bg-white/10 hover:text-white" asChild>
                                            <a href={app.ugcLink} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-4 h-4 mr-2 text-blue-400" /> Portfolio / Video
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CampaignApplications;
