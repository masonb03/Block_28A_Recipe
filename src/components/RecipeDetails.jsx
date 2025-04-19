import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetails(){
    const {id} = useParams();
    const [ recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() =>{
        async function fetchRecipeById(){
            try{
                const res = await fetch(`https://fsa-recipe.up.railway.app/api/recipes/${id}`)
                const data = await res.json();
                setRecipe(data);

            }catch(err){
            setError("failed to load recipe");
            }
        }
        fetchRecipeById();
    }, [id]);
if(error) return <p>{error}</p>
if(!recipe) return <p>Loading...</p>

return(
    <div className="container">
        <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{width: "300px", borderRadius: "10px"}} />
            <p><strong>Category:</strong> {recipe.strCategory}</p>
            <p><strong>Area:</strong>{recipe.strArea}</p>
            <p><strong>Instructions:</strong></p>
            <p style={{lineHeight: '1.6'}}>{recipe.strInstructions}</p>

        <div style={{marginTop: '2rem'}}>
            <Link to="/" className="back-home">Back to Recipes</Link>
        </div>
    </div>
    )
}


export default RecipeDetails;