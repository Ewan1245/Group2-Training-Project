import { useNavigate } from "react-router-dom";
import heart from '../images/bookmark-heart.svg'

const Recipe = ({idMeal, strMealThumb, strMeal, strArea, strTags}) => {
    const navigate = useNavigate(); // Hook to navigate

return(
    <div key={idMeal} onClick={() => navigate("/recipe/" + idMeal)} className="col-md-3 mb-3"> {/* Using navigate in the div to redirect */}
        <div className="recipes-card card">
            <div className="imgContainer">
                <img src={strMealThumb} className="card-img-top" alt={strMeal} />
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-9 mb-3">
                        <h5 className="card-title">{strMeal}</h5>
                    </div>
                    <div className="col-md-3 mb-3">
                        <img src={heart} alt='Save Recipe' className='img-link save-recipe'></img>
                    </div>
                    <div className="row">
                        <p className="card-text"><strong>Area:</strong> {strArea}</p>
                        <p className="card-text"><strong>Tags:</strong> {strTags}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)




}


export default Recipe
