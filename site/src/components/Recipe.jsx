import { useNavigate } from "react-router-dom";
import heart from '../images/bookmark-heart.svg'
import axios from "axios";
import baseUrl from "../baseUrl";
import { useCallback, useContext } from "react";
import { ChangeLoginContext } from "../App";

const Recipe = ({ idMeal, strMealThumb, strMeal, strArea, strCategory, isSaved, setRefreshSaved }) => {

    const navigate = useNavigate(); // Hook to navigate

    const reCheckLogin = useContext(ChangeLoginContext);

    const SaveRecipe = async () => {
        reCheckLogin(true);
        let token = sessionStorage.getItem("token");
        let url = process.env.REACT_APP_BASEURL;
        if (!isSaved) url += "/saveRecipe/";
        else url += "/unsaveRecipe/";
        url += idMeal + "/" + token;
        await axios.patch(url).catch(err => {
            if (err.response.status === 401) {
                navigate("/login")
                return
            }
            console.log(err)
        });
        if (isSaved) setRefreshSaved(true);
    };

    return (
        <div key={idMeal} className="col-md-3 mb-3"> {/* Using navigate in the div to redirect */}
            <div className="recipes-card card">
                <div className="imgContainer" onClick={() => navigate("/recipe/" + idMeal)}>
                    <img src={strMealThumb} className="card-img-top" alt={strMeal} />
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col" onClick={() => navigate("/recipe/" + idMeal)}>
                            <h5 className="card-title">{strMeal}</h5>
                        </div>
                    </div>
                    <div className="row" onClick={() => navigate("/recipe/" + idMeal)}>
                        {strArea && <p className="card-text col" ><strong>Cuisine:</strong> {strArea}</p>}
                    </div>
                    <div className="row" >
                        <p className="card-text col mb-0" onClick={() => navigate("/recipe/" + idMeal)}><strong>Category:</strong> {strCategory}</p>
                        <div className="col-auto">
                            <img src={heart} alt='Save Recipe' className='img-link save-recipe' onClick={SaveRecipe}></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )




}


export default Recipe
