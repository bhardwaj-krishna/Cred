
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { campaignService } from "@/lib/campaignService";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Instagram, Youtube, Send } from "lucide-react";

interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignId: string;
    campaignTitle: string;
}

const ApplicationModal = ({ isOpen, onClose, campaignId, campaignTitle }: ApplicationModalProps) => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        pitch: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast({ title: "Login Required", description: "You must be logged in to apply.", variant: "destructive" });
            return;
        }

        setLoading(true);
        try {
            await campaignService.submitApplication(campaignId, user.uid, {
                pitch: formData.pitch,
                applicantName: user.displayName || "Anonymous Creator",
                applicantEmail: user.email
            });

            toast({
                title: "Application Sent!",
                description: `You have successfully applied to ${campaignTitle}.`
            });
            onClose();
            setFormData({ pitch: "" }); // Reset
        } catch (error) {
            console.error("Application error:", error);
            toast({
                title: "Error",
                description: "Failed to submit application. Please try again.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-[#0f172a] border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle>Apply for {campaignTitle}</DialogTitle>
                    <DialogDescription className="text-white/60">
                        Pitch your ideas to the brand. detailed profile info will be shared automatically.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    <div className="space-y-2">
                        <Label htmlFor="pitch" className="text-white">Why are you a good fit?</Label>
                        <Textarea
                            id="pitch"
                            name="pitch"
                            placeholder="Short pitch to the brand..."
                            value={formData.pitch}
                            onChange={handleChange}
                            className="bg-white/5 border-white/10 text-white focus:border-primary/50 min-h-[150px]"
                            required
                        />
                    </div>

                    <DialogFooter className="mt-6">
                        <Button type="button" variant="ghost" onClick={onClose} className="text-white/60 hover:text-white hover:bg-white/10">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-primary hover:bg-primary/90 text-white" disabled={loading}>
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                            Submit Application
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ApplicationModal;
