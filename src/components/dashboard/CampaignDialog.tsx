
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus } from "lucide-react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

interface Campaign {
    id?: string;
    title: string;
    budget: string | number;
    status: "Active" | "Draft" | "Completed";
    brandId: string;
}

interface CampaignDialogProps {
    campaignToEdit?: Campaign;
    onSuccess?: () => void;
    trigger?: React.ReactNode;
}

export function CampaignDialog({ campaignToEdit, onSuccess, trigger }: CampaignDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const { toast } = useToast();

    const [formData, setFormData] = useState<Partial<Campaign>>({
        title: campaignToEdit?.title || "",
        budget: campaignToEdit?.budget || "",
        status: campaignToEdit?.status || "Draft",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            if (campaignToEdit?.id) {
                // Edit Mode
                const docRef = doc(db, "campaigns", campaignToEdit.id);
                await updateDoc(docRef, {
                    ...formData,
                    updatedAt: new Date().toISOString()
                });
                toast({ title: "Campaign Updated", description: "Your changes have been saved." });
            } else {
                // Create Mode
                await addDoc(collection(db, "campaigns"), {
                    ...formData,
                    brandId: user.uid,
                    createdAt: new Date().toISOString(),
                    status: formData.status || "Draft"
                });
                toast({ title: "Campaign Created", description: "Your new campaign is ready." });
            }

            setOpen(false);
            // Reset form if creating new
            if (!campaignToEdit) {
                setFormData({ title: "", budget: "", status: "Draft" });
            }
            onSuccess?.();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                        <Plus className="w-4 h-4 mr-2" /> Add Campaign
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="bg-[#0f172a] border-white/10 text-white sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{campaignToEdit ? "Edit Campaign" : "New Campaign"}</DialogTitle>
                    <DialogDescription className="text-white/60">
                        {campaignToEdit ? "Update details for this campaign." : "Create a new campaign to start finding creators."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-white">Campaign Title</Label>
                        <Input
                            id="title"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                            placeholder="e.g. Summer Product Launch"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="budget" className="text-white">Budget (₹)</Label>
                            <Input
                                id="budget"
                                type="number"
                                required
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                                placeholder="5000"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-white">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(val: any) => setFormData({ ...formData, status: val })}
                            >
                                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#020817] border-white/10 text-white">
                                    <SelectItem value="Draft">Draft</SelectItem>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={loading} className="bg-primary text-white hover:bg-primary/90">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {campaignToEdit ? "Save Changes" : "Create Campaign"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
