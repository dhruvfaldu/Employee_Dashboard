import { Navigate } from "react-router-dom";
import { useEmployeeStore } from "../store/employeeStore";

const PrivateRoute = ({ children }: any) => {

    const isAuthenticated = useEmployeeStore(
        (state) => state.isAuthenticated
    );

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;