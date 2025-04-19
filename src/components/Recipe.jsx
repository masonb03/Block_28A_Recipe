import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Recipe({ recipe, setRecipe, favRecipe, setFavRecipe, token }) {
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



  return (
    <div className="recipe-grid">
      {recipe.map((food) => (
        <div key={food.idMeal} className="recipe-card">
          <img 
          src={food.strMealThumb} 
          alt="Recipe Image" 
          style={{ height: "200px", borderRadius: "8px" }} />
          <h2>
            <Link to={`/recipe/${food.idMeal}`}>{food.strMeal}</Link>
          </h2>
          <button className="recipe-button"
            onClick={() => handleClick(food)} 
          >
            {token ? "Favorite" : "Log in to Favorite"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Recipe;
