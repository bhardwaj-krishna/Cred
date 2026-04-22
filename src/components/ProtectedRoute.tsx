
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: ("brand" | "creator")[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        // improved loading state matching the dark theme
        return (
            <div className="min-h-screen bg-[#020817] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && user.role && !allowedRoles.includes(user.role)) {
        // Redirect to their appropriate dashboard if they try to access a wrong role route
        return <Navigate to={user.role === "brand" ? "/brand/dashboard" : "/active-campaigns"} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
