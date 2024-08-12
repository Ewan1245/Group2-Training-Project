import { useNavigate } from "react-router-dom";

const Recipe = ({idMeal, strMealThumb, strMeal, strArea, strTags}) => {
    const navigate = useNavigate(); // Hook to navigate

return(
    <div key={idMeal} onClick={() => navigate("/recipe/" + idMeal)} className="col-md-3 mb-3"> {/* Using navigate in the div to redirect */}
        <div className="recipes-card card">
            <div className="imgContainer">
                <img src={strMealThumb} className="card-img-top" alt={strMeal} />
            </div>
            <div className="card-body">
                <h5 className="card-title">{strMeal}</h5>
                <p className="card-text"><strong>Area:</strong> {strArea}</p>
                <p className="card-text"><strong>Tags:</strong> {strTags}</p>
            </div>
        </div>
    </div>
)




}


export default Recipe
