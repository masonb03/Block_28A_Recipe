
import { useState, useEffect } from 'react';
import './App.css';
import Signup from './components/SignUp';
import Auth from './components/Auth';
import Fav from './components/Fav';
import Recipe from './components/Recipe';
import RecipeDetails from './components/RecipeDetails';
import { Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [recipe, setRecipe] = useState([]);
  const [favRecipe, setFavRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/signup");
  };

  return (
    <>
    
      <nav>
        <div>
          <Link to="/">Home</Link>
          <Link to="/favorite">Favorite</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/auth">Authorize</Link>
        </div>
        {token && <button onClick={handleLogout}>Logout</button>} 
      </nav>
      <div className="container">
        <h1>Recipes</h1>
            <Routes>
              <Route
                path="/"
                element={
                  <Recipe recipe={recipe} setRecipe={setRecipe} favRecipe={favRecipe} setFavRecipe={setFavRecipe} token={token} />} /> 
                  <Route path="/signup" element={<Signup setToken={setToken} />} />
                  <Route path="/auth" element={<Auth token={token} />} />
                  <Route path="/favorite" element={token ? <Fav favRecipe={favRecipe} setFavRecipe={setFavRecipe} /> : <Navigate to="/signup" />} />
                  <Route path="/recipe/:id" element={<RecipeDetails />} />
                  <Route path="/login" element={<Login/>}/>
              </Routes>
      </div>
    </>
  );
}

export default App;
