
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"brand" | "creator" | "">("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; role?: string; general?: string }>({});

    const { signup, loginWithGoogle, logout } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const validateForm = () => {
        const newErrors: typeof errors = {};
        if (!name.trim()) newErrors.name = "Full name is required";
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        if (!role) {
            newErrors.role = "Please select a role";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleGoogleSignup = async () => {
        setErrors({});
        if (!role) {
            setErrors({ role: "Please select a role before signing up with Google" });
            return;
        }

        setLoading(true);
        try {
            await loginWithGoogle(role);
            if (role === "brand") navigate("/brand/dashboard");
            else navigate("/creator/dashboard");

        } catch (error: any) {
            setErrors({ general: error.message || "Google sign-up failed" });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!validateForm()) return;
        if (!role) return; // Should be caught by validateForm but for logic safety

        setLoading(true);
        try {
            await signup(email, password, role, name);
            // After signup, we log them out to force them to login manually? 
            // User requirement: "After successful signup: Redirect to /login"
            await logout();
            navigate("/login");
            // We can show a toast here since we are navigating away
            toast({
                title: "Account Created",
                description: "Please log in with your new credentials.",
            });
        } catch (error: any) {
            console.error(error);
            let errorMessage = "Failed to create account";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Email is already in use. Please log in.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Password is too weak.";
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
                    <h2 className="text-3xl font-bold text-white tracking-tight">Create an account</h2>
                    <p className="mt-2 text-sm text-white/60">
                        Join Credora to verify your influence or find partners.
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
                            <Label htmlFor="name" className="text-white">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (errors.name) setErrors({ ...errors, name: undefined });
                                }}
                                className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 ${errors.name ? "border-red-500/50 focus:border-red-500" : ""}`}
                                placeholder="John Doe"
                                disabled={loading}
                            />
                            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                        </div>

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

                        <div className="space-y-2">
                            <Label className="text-white">I am a...</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center justify-center gap-2 transition-all hover:bg-white/5 ${role === 'brand' ? 'bg-primary/10 border-primary text-primary' : 'bg-transparent border-white/10 text-white/60 hover:border-white/20'}`}
                                    onClick={() => {
                                        setRole('brand');
                                        if (errors.role) setErrors({ ...errors, role: undefined });
                                    }}
                                >
                                    <span className="font-semibold">Brand</span>
                                    <span className="text-[10px] text-center opacity-70">Hiring creators</span>
                                </div>
                                <div
                                    className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center justify-center gap-2 transition-all hover:bg-white/5 ${role === 'creator' ? 'bg-primary/10 border-primary text-primary' : 'bg-transparent border-white/10 text-white/60 hover:border-white/20'}`}
                                    onClick={() => {
                                        setRole('creator');
                                        if (errors.role) setErrors({ ...errors, role: undefined });
                                    }}
                                >
                                    <span className="font-semibold">Creator</span>
                                    <span className="text-[10px] text-center opacity-70">Looking for work</span>
                                </div>
                            </div>
                            {errors.role && <p className="text-xs text-red-400 mt-1">{errors.role}</p>}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-11"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
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
                        onClick={handleGoogleSignup}
                        disabled={loading}
                    >
                        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        Sign up with Google
                    </Button>

                    <p className="text-center text-sm text-white/60">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
