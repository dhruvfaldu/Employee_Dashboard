import { Navigate } from "react-router-dom";
import { useEmployeeStore } from "../store/employeeStore";

const PublicRoute = ({ children }: any) => {

    const isAuthenticated = useEmployeeStore(
        (state) => state.isAuthenticated
    );

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default PublicRoute;