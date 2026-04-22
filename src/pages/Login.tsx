
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!password) {
            newErrors.password = "Password is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const checkRoleAndRedirect = async (uid: string) => {
        try {
            console.log("Checking role for user:", uid);
            const userDoc = await getDoc(doc(db, "users", uid));

            if (!userDoc.exists()) {
                console.error("User document not found in Firestore!");
                toast({
                    title: "Account Error",
                    description: "User profile not found. Please contact support.",
                    variant: "destructive",
                });
                return;
            }

            const userData = userDoc.data();
            const role = userData?.role;

            console.log("User data fetched:", userData);
            console.log("Detected Role:", role);

            if (role === "brand") {
                console.log("Redirecting to Brand Dashboard");
                navigate("/brand/dashboard");
            } else if (role === "creator") {
                console.log("Redirecting to Creator Marketplace");
                navigate("/active-campaigns");
            } else {
                console.warn("No valid role found for user:", uid);
                toast({
                    title: "Login Failed",
                    description: "Your account does not have a valid role assigned.",
                    variant: "destructive",
                });
                // Do NOT redirect to "/"
            }
        } catch (error) {
            console.error("Error fetching user role:", error);
            toast({
                title: "Error",
                description: "Failed to retrieve user profile.",
                variant: "destructive",
            });
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setErrors({});
        try {
            await loginWithGoogle();
            const currentUser = auth.currentUser;
            if (currentUser) {
                await checkRoleAndRedirect(currentUser.uid);
            }
        } catch (error: any) {
            setErrors({ general: error.message || "Google sign in failed" });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!validateForm()) return;

        setLoading(true);
        try {
            await login(email, password);
            const currentUser = auth.currentUser;
            if (currentUser) {
                await checkRoleAndRedirect(currentUser.uid);
            }
        } catch (error: any) {
            console.error(error);
            let errorMessage = "Failed to sign in";
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = "Invalid email or password";
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = "Too many failed attempts. Please try again later.";
            }
            setErrors({ general: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-theme(spacing.16))] flex items-center justify-center bg-[#020817] px-4 py-12">
            <div className="w-full max-w-md space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Welcome back</h2>
                    <p className="mt-2 text-sm text-white/60">
                        Log in to manage your campaigns or profile.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {errors.general && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {errors.general}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors({ ...errors, email: undefined });
                                }}
                                className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 ${errors.email ? "border-red-500/50 focus:border-red-500" : ""}`}
                                placeholder="john@example.com"
                                disabled={loading}
                            />
                            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) setErrors({ ...errors, password: undefined });
                                }}
                                className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 ${errors.password ? "border-red-500/50 focus:border-red-500" : ""}`}
                                disabled={loading}
                            />
                            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-11"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Log In"}
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#020817] px-2 text-white/40">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white h-11"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                    >
                        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        Sign in with Google
                    </Button>

                    <p className="text-center text-sm text-white/60">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-medium text-primary hover:text-primary/80 transition-colors">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
