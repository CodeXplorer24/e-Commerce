import {Navigate, useLocation} from "react-router-dom";

// children → The page/component you want to render if access is allowed.
// user -> user info of a logged user

function ProtectedRoute({isAuthenticated, user, children}) {
    
    const loc = useLocation();
    // Suppose a user visits your website without specifying a page:
    // https://myecom.com/ -> "/" it is root URL of the application
    // At this point, your app needs to decide where to send them.
    
    if(loc.pathname === "/"){

        if(!isAuthenticated){
            return <Navigate to={"/auth/login"}/>
        }
    
        if(user?.role === "ADMIN"){
            return <Navigate to={"/admin/dashboard"}/>
        }

        if(user?.role === "SELLER"){
            return <Navigate to={"/seller/dashboard"}/>
        }

        return <Navigate to={"/shop/home"}/>    
    }

    if(!isAuthenticated && !(loc.pathname.includes("/login") || loc.pathname.includes("/register"))){
        return <Navigate to={"/auth/login"}/>
    }

    if(isAuthenticated && (loc.pathname.includes("/login") || loc.pathname.includes("/register"))){

        if(user?.role === "ADMIN") return <Navigate to={"/admin/dashboard"}/>
        
        if(user?.role === "SELLER") return <Navigate to={"/seller/dashboard"}/>

        return <Navigate to={"/shop/home"}/>
    }

    if(isAuthenticated && user.role !== "ADMIN" && loc.pathname.includes("admin")){
        return <Navigate to={"/unauth-page"}/>
    }

    if(isAuthenticated && user.role != "SELLER" && loc.pathname.includes("seller")){
        return <Navigate to={"/unauth-page"}/>
    }

    if(isAuthenticated && user.role === "ADMIN" && loc.pathname.includes("shop")){
        return <Navigate to={"/admin/dashboard"}/>
    }

    if(isAuthenticated && user.role === "SELLER" && loc.pathname.includes("shop")){
        return <Navigate to={"/seller/dashboard"}/>
    }

    return <>{children}</>
}

export default ProtectedRoute;