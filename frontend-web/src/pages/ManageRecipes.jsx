import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const ManageRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await api.get('/recipes');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        fetchRecipes();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await api.delete(`/recipes/${id}`);
                setRecipes(recipes.filter((recipe) => recipe._id !== id));
            } catch (error) {
                console.error('Error deleting recipe:', error);
                alert('Failed to delete recipe');
            }
        }
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ea580c' }}>Manage Recipes</h1>
                    <Link to="/admin/recipes/add" className="btn btn-primary">
                        + Add New Recipe
                    </Link>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <thead style={{ backgroundColor: '#f3f4f6' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Title</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Category</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipes.map((recipe) => (
                                <tr key={recipe._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '1rem' }}>{recipe.title}</td>
                                    <td style={{ padding: '1rem' }}>{recipe.category}</td>
                                    <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                        <Link to={`/admin/recipes/edit/${recipe._id}`} style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', borderRadius: '4px', textDecoration: 'none', fontSize: '0.875rem' }}>
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(recipe._id)}
                                            style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageRecipes;
