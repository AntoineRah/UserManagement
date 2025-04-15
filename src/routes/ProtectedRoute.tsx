import { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const accessToken = useAuthStore((state) => state.accessToken);
    if (!accessToken) return <Navigate to="/login"></Navigate>;
    return children;
};

export { ProtectedRoute };