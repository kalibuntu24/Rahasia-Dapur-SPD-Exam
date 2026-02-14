import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import AdminRoute from './components/AdminRoute';
import ManageRecipes from './pages/ManageRecipes';
import RecipeForm from './pages/RecipeForm';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="/recipe/:id" element={
            <ProtectedRoute>
              <RecipeDetail />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/recipes" element={<ManageRecipes />} />
            <Route path="/admin/recipes/add" element={<RecipeForm />} />
            <Route path="/admin/recipes/edit/:id" element={<RecipeForm />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
