import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function RandomRecipes() {
const [randomRecipe, setRandomRecipe] = useState(null)
const [error, setError] = useState(null)

useEffect(() =>{
    async function fetchRandomRecipe(){
        try{
            const res = await fetch("https://fsa-recipe.up.railway.app/api/recipes/random")
            if(!res.ok){
                throw new Error("Failed to fetch random recipe");
            }
            const data = await res.json()
            setRandomRecipe(data);
        }catch(err){
            setError(err.message)
        }
    }

    fetchRandomRecipe()
}, [])

if(error){
    return <p>Error: {error}</p>
}

if(!randomRecipe){
    return <p>Loading...</p>
}

    return(
        <div className="random-recipe">
            <h2>Recipe of the Day!</h2>
            <img 
            src={randomRecipe.strMealThumn}
            alt={randomRecipe.strMeal}
            style={{height: "200px", borderRadius: "8px"}}
            />
            <h3>{randomRecipe.strMeal}</h3>
            <Link to={`/recipe/${randomRecipe.idMeal}`}>View Recipe</Link>
        </div>
    )
}

export default RandomRecipes