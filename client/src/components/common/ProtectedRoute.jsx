import {Navigate, useLocation} from "react-router-dom";

function ProtectedRoute({isAuthenticated, user, children, requireAuth = true}) {

    const loc = useLocation();
    const path = loc.pathname;

    const isAdminPath = path.startsWith("/admin");
    const isSellerPath = path.startsWith("/seller");
    const isAuthPath = path.startsWith("/auth");
    const isShopPath = !isAdminPath && !isSellerPath && !isAuthPath && path !== "/unauth-page";

    // Only force login when this route actually requires it (checkout/account do; home/product don't)
    if (!isAuthenticated && !isAuthPath && requireAuth) {
        return <Navigate to={"/auth/login"} />;
    }

    if (isAuthenticated && isAuthPath) {
        if (user?.role === "ADMIN") return <Navigate to={"/admin/dashboard"} />;
        if (user?.role === "SELLER") return <Navigate to={"/seller/dashboard"} />;
        return <Navigate to={"/"} />;
    }

    if (isAuthenticated && user.role !== "ADMIN" && isAdminPath) {
        return <Navigate to={"/unauth-page"} />;
    }

    if (isAuthenticated && user.role !== "SELLER" && isSellerPath) {
        return <Navigate to={"/unauth-page"} />;
    }

    // Admins/sellers browsing shop pages (even public ones) get sent to their own dashboard
    if (isAuthenticated && user.role === "ADMIN" && isShopPath) {
        return <Navigate to={"/admin/dashboard"} />;
    }

    if (isAuthenticated && user.role === "SELLER" && isShopPath) {
        return <Navigate to={"/seller/dashboard"} />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;