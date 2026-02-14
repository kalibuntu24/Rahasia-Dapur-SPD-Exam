import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await api.get(`/recipes/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error("Error fetching recipe log", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) return <div className="flex-center" style={{ height: '100vh' }}>Memuat resep...</div>;
    if (!recipe) return <div className="flex-center" style={{ height: '100vh' }}>Resep tidak ditemukan</div>;

    return (
        <div style={{ paddingBottom: '3rem' }}>
            <Navbar />

            <div className="container" style={{ marginTop: '2rem', maxWidth: '800px' }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', color: '#6b7280', marginBottom: '1rem' }}>
                    ← Kembali ke Beranda
                </Link>

                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
                    {recipe.title}
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#4b5563', marginBottom: '2rem' }}>
                    {recipe.description}
                </p>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <span style={{ backgroundColor: '#fff7ed', color: '#ea580c', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: '600' }}>
                        {recipe.category}
                    </span>
                    <span style={{ backgroundColor: '#f3f4f6', color: '#4b5563', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: '600' }}>
                        ⏱️ {recipe.cookingTime || '45 Menit'}
                    </span>
                    <span style={{ backgroundColor: '#f3f4f6', color: '#4b5563', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: '600' }}>
                        📊 {recipe.difficulty || 'Sedang'}
                    </span>
                </div>

                {/* Video Placeholder */}
                {/* Video Section */}
                {recipe.videoUrl && (
                    <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '1rem', marginBottom: '3rem', overflow: 'hidden' }}>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${recipe.videoUrl.split('v=')[1]?.split('&')[0]}`}
                            title={recipe.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}

                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                    {/* Ingredients */}
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', borderBottom: '2px solid #ea580c', paddingBottom: '0.5rem', display: 'inline-block' }}>
                            Bahan-bahan
                        </h3>
                        <ul style={{ listStyle: 'none' }}>
                            {recipe.ingredients.map((ing, idx) => (
                                <li key={idx} style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ color: '#ea580c', marginRight: '0.75rem', fontSize: '1.2rem' }}>•</span>
                                    {ing}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Steps */}
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', borderBottom: '2px solid #ea580c', paddingBottom: '0.5rem', display: 'inline-block' }}>
                            Langkah Pembuatan
                        </h3>
                        <div>
                            {recipe.steps.map((step, idx) => (
                                <div key={idx} style={{ display: 'flex', marginBottom: '1.5rem' }}>
                                    <div style={{
                                        flexShrink: 0,
                                        width: '32px', height: '32px',
                                        backgroundColor: '#ea580c', color: 'white',
                                        borderRadius: '50%', display: 'flex',
                                        justifyContent: 'center', alignItems: 'center',
                                        marginRight: '1rem', fontWeight: 'bold'
                                    }}>
                                        {idx + 1}
                                    </div>
                                    <p style={{ paddingTop: '0.25rem' }}>{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RecipeDetail;
