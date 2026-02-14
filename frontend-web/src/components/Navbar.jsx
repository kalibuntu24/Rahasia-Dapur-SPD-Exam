import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ea580c', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🍽️ RahasiaDapur
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span style={{ color: '#4b5563' }}>Halo, <b>{user?.name}</b></span>
                    {user?.role === 'admin' && (
                        <Link to="/admin/recipes" style={{ color: '#ea580c', fontWeight: '600', textDecoration: 'none' }}>
                            Manage Recipes
                        </Link>
                    )}
                    <button
                        onClick={handleLogout}
                        style={{ color: '#ef4444', fontWeight: '600', background: 'none' }}
                    >
                        Keluar
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
