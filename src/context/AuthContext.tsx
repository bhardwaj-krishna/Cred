
import React, { createContext, useContext, useEffect, useState } from "react";
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type UserRole = "brand" | "creator" | null;

interface AuthUser {
    uid: string;
    email: string | null;
    role: UserRole;
    displayName: string | null;
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, role: UserRole, name: string) => Promise<void>;
    loginWithGoogle: (role?: UserRole) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fast fallback: If Firebase doesn't respond in 3 seconds, assume not logged in to show UI.
        const timer = setTimeout(() => {
            if (loading) {
                console.warn("Auth check timed out, falling back to guest mode.");
                setLoading(false);
            }
        }, 3000);

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            clearTimeout(timer);
            if (firebaseUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                    const userData = userDoc.data();

                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        role: userData?.role || null,
                        displayName: userData?.name || firebaseUser.displayName,
                    });
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    // Still log them in even if profile fetch fails
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        role: null,
                        displayName: firebaseUser.displayName,
                    });
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        }, (error) => {
            console.error("Auth Error", error);
            setLoading(false);
        });

        return () => {
            unsubscribe();
            clearTimeout(timer);
        };
    }, []);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (email: string, password: string, role: UserRole, name: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user role and extra data to Firestore
        await setDoc(doc(db, "users", user.uid), {
            email,
            role,
            name,
            createdAt: new Date().toISOString(),
        });

        // Update local state immediately to avoid race conditions
        setUser({
            uid: user.uid,
            email: user.email,
            role: role,
            displayName: name
        });
    };

    const loginWithGoogle = async (role?: UserRole) => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if user exists in Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            // New user! create firestore doc
            // If role wasn't provided (e.g. from Login page), default to null or force selection later.
            // Ideally, usage from Signup page should pass the role.
            await setDoc(userDocRef, {
                email: user.email,
                role: role || null, // If null, user might need to be prompted to select role
                name: user.displayName,
                createdAt: new Date().toISOString(),
            });
        }
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
