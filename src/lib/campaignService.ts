import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    serverTimestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Campaign {
    id: string;
    title: string;
    description: string;
    budget: number;
    niche: string;
    deadline: string;
    status: "Active" | "Draft" | "Completed";
    brandId: string;
    brandName?: string;
    brandLogo?: string;
    createdAt?: any;
}

const CAMPAIGNS_COLLECTION = "campaigns";

export const campaignService = {
    // Create
    createCampaign: async (data: Omit<Campaign, "id">) => {
        const campaignData = {
            ...data,
            createdAt: serverTimestamp()
        };

        const docRef = await addDoc(
            collection(db, CAMPAIGNS_COLLECTION),
            campaignData
        );

        return docRef.id;
    },

    // Read (All for a specific brand)
    getCampaignsByBrand: async (brandId: string) => {
        const q = query(
            collection(db, CAMPAIGNS_COLLECTION),
            where("brandId", "==", brandId)
            // Note: Compound queries with orderBy requires an index in Firestore. 
            // We'll sort client-side or assume index exists if we add orderBy later.
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Campaign));
    },

    // Read (Single)
    getCampaign: async (id: string) => {
        const docRef = doc(db, CAMPAIGNS_COLLECTION, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Campaign;
        }
        return null;
    },

    // Update
    updateCampaign: async (id: string, data: Partial<Campaign>) => {
        const docRef = doc(db, CAMPAIGNS_COLLECTION, id);
        await updateDoc(docRef, data);
    },

    // Read (All Active - for Job Board)
    getAllActiveCampaigns: async () => {
        const q = query(
            collection(db, CAMPAIGNS_COLLECTION),
            where("status", "==", "Active")
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Campaign));
    },

    // Submit Application
    submitApplication: async (campaignId: string, creatorId: string, data: any) => {
        await addDoc(collection(db, "applications"), {
            campaignId,
            creatorId,
            ...data,
            submittedAt: serverTimestamp(),
            status: "pending"
        });
    },

    // Get Applicants for a Campaign
    getApplicationsByCampaign: async (campaignId: string) => {
        const q = query(
            collection(db, "applications"),
            where("campaignId", "==", campaignId)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    },

    // Delete
    deleteCampaign: async (id: string) => {
        const docRef = doc(db, CAMPAIGNS_COLLECTION, id);
        await deleteDoc(docRef);
    }
};
