import { useNavigate } from "react-router-dom";
import heart from '../images/bookmark-heart.svg'
import axios from "axios";


const Recipe = ({idMeal, strMealThumb, strMeal, strArea, strTags}) => {
    const navigate = useNavigate(); // Hook to navigate

    const SaveRecipe = async() => {
        let token = sessionStorage.getItem("token");
        const url = "http://localhost:8080/saveRecipe/" + idMeal + "/" + token
        await axios.patch(url).catch(err => {
            if(err.response.status === 401){
                navigate("/login")
                    return
            }
            console.log(err)
        });
    };

return(
    <div key={idMeal} className="col-md-3 mb-3"> {/* Using navigate in the div to redirect */}
        <div className="recipes-card card">
            <div className="imgContainer"  onClick={() => navigate("/recipe/" + idMeal)}>
                <img src={strMealThumb} className="card-img-top" alt={strMeal}/>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-9 mb-3"  onClick={() => navigate("/recipe/" + idMeal)}>
                        <h5 className="card-title">{strMeal}</h5>
                    </div>
                </div>    
                <div className="row"  onClick={() => navigate("/recipe/" + idMeal)}>
                    <p className="card-text col" ><strong>Area:</strong> {strArea}</p>
                    </div>
                <div className="row" onClick={() => navigate("/recipe/" + idMeal)}>
                    <p className="card-text col"><strong>Tags:</strong> {strTags}</p>
                    <div className="col-md-3 mb-3">
            
                        <img src={heart} alt='Save Recipe' className='img-link save-recipe' onClick={SaveRecipe}></img>
                    </div>
                </div>
            </div>
        </div>
    </div>
)




}


export default Recipe
