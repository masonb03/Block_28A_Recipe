import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Recipe({ recipe, setRecipe, favRecipe, setFavRecipe, token }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch("https://fsa-recipe.up.railway.app/api/recipes");
        const data = await res.json();
        setRecipe(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRecipes();
  }, [setRecipe]);

  const handleClick = (recipe) => {
    if (!token) {
      navigate("/signup");
      return;
    }
    setFavRecipe(recipe);
    navigate("/favorite");
  };

  const filteredRecipes = recipe.filter((food) => {
    const matchesSearch = food.strMeal.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter ? food.strCategory === categoryFilter : true;
    const matchesLocation = locationFilter ? food.strArea === locationFilter : true;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const categories = [...new Set(recipe.map(r => r.strCategory))];
  const locations = [...new Set(recipe.map(r => r.strArea))];

  return (
    <div className="recipe-page">
      <div className="filters">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className="recipe-grid">
        {filteredRecipes.map((food) => (
          <div key={food.idMeal} className="recipe-card">
            <img
              src={food.strMealThumb}
              alt="Recipe Image"
              style={{ height: "200px", borderRadius: "8px" }}
            />
            <h2>
              <Link to={`/recipe/${food.idMeal}`}>{food.strMeal}</Link>
            </h2>
            <button className="recipe-button" onClick={() => handleClick(food)}>
              {token ? "Favorite" : "Log in to Favorite"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipe;
