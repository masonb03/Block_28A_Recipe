import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      alert("You need to be logged in to add to favorites!");
      return;
    }
    setFavRecipe(recipe);
    navigate("/favorite");
  };

  return (
    <>
      {recipe.map((food) => (
        <div key={food.idMeal}>
          <img src={food.strMealThumb} style={{ height: "200px" }} />
          <h2>{food.strMeal}</h2>
          <button 
            onClick={() => handleClick(food)} 
            disabled={!token}
          >
            {token ? "Favorite" : "Log in to Favorite"}
          </button>
        </div>
      ))}
    </>
  );
}

export default Recipe;
