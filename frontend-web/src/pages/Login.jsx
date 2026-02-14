import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'row' }}>
            {/* Left Side - Image */}
            <div style={{ flex: 1, backgroundColor: '#fff7ed', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <h1 style={{ fontSize: '3rem', color: '#ea580c', marginBottom: '1rem' }}>🍽️</h1>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Rahasia Dapur</h2>
                    <p style={{ color: '#6b7280' }}>Teman setia masak untuk keluarga dan ide jualan.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
                <div className="card" style={{ width: '100%', maxWidth: '400px', boxShadow: 'none' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Masuk</h2>
                    {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                            <input
                                type="email"
                                className="input-field"
                                placeholder="Contoh: ibu@pkk.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Kata Sandi</label>
                            <input
                                type="password"
                                className="input-field"
                                placeholder="Masukkan kata sandi"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Masuk</button>
                    </form>
                    <p style={{ marginTop: '1rem', textAlign: 'center', color: '#6b7280' }}>
                        Belum punya akun? <Link to="/register" style={{ color: '#ea580c', fontWeight: '600' }}>Daftar sekarang</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
