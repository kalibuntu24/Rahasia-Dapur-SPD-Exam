import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const RecipeForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ingredients: '',
        steps: '',
        category: 'Masakan Rumah',
        videoUrl: '',
        imageUrl: '',
        priceEstimate: '',
        difficulty: 'Mudah',
        cookingTime: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchRecipe = async () => {
                try {
                    const { data } = await api.get(`/recipes/${id}`);
                    setFormData({
                        ...data,
                        ingredients: data.ingredients.join('\n'),
                        steps: data.steps.join('\n')
                    });
                } catch (err) {
                    setError('Failed to fetch recipe details');
                }
            };
            fetchRecipe();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Prepare data (convert strings back to arrays)
        const recipeData = {
            ...formData,
            ingredients: formData.ingredients.split('\n').filter(item => item.trim() !== ''),
            steps: formData.steps.split('\n').filter(item => item.trim() !== '')
        };

        try {
            if (id) {
                await api.put(`/recipes/${id}`, recipeData);
            } else {
                await api.post('/recipes', recipeData);
            }
            navigate('/admin/recipes');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save recipe');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ea580c', marginBottom: '2rem' }}>
                    {id ? 'Edit Recipe' : 'Add New Recipe'}
                </h1>

                {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label className="block font-medium">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="input-field" required />
                    </div>

                    <div>
                        <label className="block font-medium">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="input-field" rows="3" required />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label className="block font-medium">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="input-field">
                                <option>Masakan Rumah</option>
                                <option>Ide Jualan</option>
                                <option>Kue</option>
                                <option>Minuman</option>
                                <option>Lainnya</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium">Difficulty</label>
                            <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="input-field">
                                <option>Mudah</option>
                                <option>Sedang</option>
                                <option>Sulit</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label className="block font-medium">Cooking Time (e.g., 30 Menit)</label>
                            <input type="text" name="cookingTime" value={formData.cookingTime} onChange={handleChange} className="input-field" />
                        </div>
                        <div>
                            <label className="block font-medium">Price Estimate (for Ide Jualan)</label>
                            <input type="text" name="priceEstimate" value={formData.priceEstimate} onChange={handleChange} className="input-field" />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium">Image URL</label>
                        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="input-field" placeholder="https://..." />
                    </div>

                    <div>
                        <label className="block font-medium">Video URL</label>
                        <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} className="input-field" placeholder="https://youtube.com/..." />
                    </div>

                    <div>
                        <label className="block font-medium">Ingredients (One per line)</label>
                        <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} className="input-field" rows="5" required placeholder="500g Ayam&#10;2 siung Bawang Putih" />
                    </div>

                    <div>
                        <label className="block font-medium">Steps (One per line)</label>
                        <textarea name="steps" value={formData.steps} onChange={handleChange} className="input-field" rows="5" required placeholder="Cuci bersih ayam&#10;Tumis bumbu halus" />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Recipe'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RecipeForm;
