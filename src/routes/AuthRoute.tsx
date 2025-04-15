import { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";

const AuthRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const accessToken = useAuthStore((state) => state.accessToken);
    if (accessToken) return <Navigate to="/"></Navigate>;
    return children;
};

export { AuthRoute };