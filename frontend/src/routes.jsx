import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

export const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <h1>Cargando...</h1>

    if (!isAuthenticated && !loading) return <Navigate to="/login" replace/>;

    return <Outlet />
}