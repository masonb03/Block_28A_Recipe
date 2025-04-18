import { Link } from "react-router-dom"

function Fav({favRecipe, setFavRecipe}){

    if (!favRecipe) {
        return (
          <>
            <p>No favorite selected. Go back and choose a recipe!</p>
            <Link to="/">Back to Home</Link>
          </>
        );
      }

    return(
        <div className="favorite-view">
        <img src={favRecipe?.strMealThumb} alt="Favorite Recipe" />
        <p>Name: {favRecipe?.strMeal}</p>
        <p>Origin: {favRecipe?.strArea}</p>
        <Link to="/" className="back-home">Back to Home</Link>
        <button className="favorite-button" onClick={()=>setFavRecipe(null)}>Remove Favorite</button>
        </div>
    )
}

export default Fav