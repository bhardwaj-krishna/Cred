import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, UserCircle, Plus } from "lucide-react";

const DashboardLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-[#020817] text-white flex flex-col">
            {/* Dashboard Header */}
            <header className="border-b border-white/10 bg-[#020817]/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/brand/dashboard" className="flex items-center gap-2">
                            <img
                                alt="Credora"
                                className="h-8 w-auto"
                                src="/lovable-uploads/694dcc2c-0eeb-4ed8-9728-299542e73246.png"
                            />
                            <span className="font-semibold tracking-tight hidden sm:block">Brand Dashboard</span>
                        </Link>

                        <nav className="flex items-center gap-1">
                            <Link to="/brand/dashboard">
                                <Button
                                    variant={isActive("/brand/dashboard") ? "secondary" : "ghost"}
                                    size="sm"
                                    className={`gap-2 ${isActive("/brand/dashboard") ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Overview
                                </Button>
                            </Link>
                            <Link to="/brand/profile">
                                <Button
                                    variant={isActive("/brand/profile") ? "secondary" : "ghost"}
                                    size="sm"
                                    className={`gap-2 ${isActive("/brand/profile") ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                                >
                                    <UserCircle className="w-4 h-4" />
                                    Profile
                                </Button>
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90 text-white hidden sm:flex"
                            onClick={() => navigate("/brand/add-campaign")}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Campaign
                        </Button>
                        <div className="h-6 w-px bg-white/10 mx-1" />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-white/60 hover:text-red-400 hover:bg-red-400/10"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Log Out
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
