import { Link } from "react-router-dom"

function Fav({favRecipe, setFavRecipe}){
    return(
        <>
        <img src={favRecipe?.strMealThumb} style={{height: "400px"}}/>
        <p>Name: {favRecipe?.strMeal}</p>
        <p>Origin: {favRecipe?.strArea}</p>
        <Link to="/">Back to Home</Link>
        <button onClick={()=>setFavRecipe(null)}>Remove Favorite</button>
        </>
    )
}

export default Fav