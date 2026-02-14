import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await api.get('/recipes');
                setRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recipes", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const categories = ['All', 'Masakan Rumah', 'Ide Jualan', 'Kue', 'Minuman'];

    const filteredRecipes = activeTab === 'All'
        ? recipes
        : recipes.filter(r => r.category === activeTab);

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <Navbar />

            {/* Hero Section */}
            <div style={{ backgroundColor: '#fff7ed', padding: '4rem 1rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', color: '#ea580c', marginBottom: '1rem' }}>Masak Apa Hari Ini, Bu?</h1>
                <p style={{ fontSize: '1.2rem', color: '#4b5563' }}>Kumpulan resep praktis dan ide jualan untuk ibu cerdas.</p>
            </div>

            <div className="container" style={{ marginTop: '2rem' }}>
                {/* Categories */}
                <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`btn ${activeTab === cat ? 'btn-primary' : ''}`}
                            style={{
                                backgroundColor: activeTab === cat ? 'var(--primary-color)' : 'white',
                                color: activeTab === cat ? 'white' : 'var(--text-color)',
                                border: '1px solid #e5e7eb',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Recipe Grid */}
                {loading ? (
                    <p>Memuat resep...</p>
                ) : (
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                        {filteredRecipes.map(recipe => (
                            <Link to={`/recipe/${recipe._id}`} key={recipe._id} className="card" style={{ padding: 0, overflow: 'hidden', transition: 'transform 0.2s', cursor: 'pointer' }}>
                                <div style={{ height: '200px', backgroundColor: '#e5e7eb', position: 'relative' }}>
                                    <img
                                        src={recipe.imageUrl || "https://placehold.co/600x400"}
                                        alt={recipe.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    {recipe.category === 'Ide Jualan' && (
                                        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#16a34a', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                            Ide Jualan
                                        </span>
                                    )}
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#ea580c', fontWeight: '600' }}>{recipe.category}</span>
                                        <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>⏱️ {recipe.cookingTime || '45m'}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{recipe.title}</h3>
                                    <p style={{ color: '#6b7280', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {recipe.description}
                                    </p>
                                    {recipe.priceEstimate && (
                                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                                            <p style={{ fontSize: '0.9rem', color: '#059669', fontWeight: '600' }}>
                                                💰 Potensi Cuan: {recipe.priceEstimate}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
