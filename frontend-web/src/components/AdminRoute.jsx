import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    if (user && user.role === 'admin') {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }
};

export default AdminRoute;
