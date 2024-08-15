import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/RecipeDetail.css';
import heart from '../images/bookmark-heart.svg'


const RecipeDetail = () => {
    
    // Hook to get the id parameter from the URL
    const { id } = useParams();

    // State to store the detailed recipe information
    const [recipe, setRecipe] = useState("");

    // State to store any error messages
    const [error, setError] = useState("");

    // Hook to programmatically navigate
    const navigate = useNavigate();

    // Fetches recipe details when the component mounts or the id changes
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                // API call to get recipe details based on the ID
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

                // Sets the recipe state with the fetched data
                setRecipe(response.data.meals[0]);
            } catch (err) {
                console.error(err);
                // Sets an error message if the fetch fails
                setError("Failed to find recipe details");
            }
        };

        fetchRecipe();
    }, [id]); // Dependency array, ensures the effect only runs when id changes

    // Function to navigate back to the previous page
    const handleBackClick = () => {
        navigate(-1);
    };

    // Renders an error message if there is an error
    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    // Creating array with list of all ingredients
    const allIngredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            allIngredients.push(
                <li key={i}>
                    {ingredient}, {measure}
                </li>
            );
        }
    }

    // Create array with <p> elements for each step in the instructions (can format weird because of inconsitency from mealDB format)
    const steps = recipe.strInstructions
        ? recipe.strInstructions.split(/\r\n|\n|\r/).map((step, index) => ( // spltting based on new line characters in the instructions from mealDB
            <p key={index}>{step.trim()}</p>
        ))
        : [];



    
    const SaveRecipe = async() => {
        let token = sessionStorage.getItem("token");
        const url = process.env.REACT_APP_BASEURL + "/saveRecipe/" + id + "/" + token
        await axios.patch(url).catch(err => {
            if(err.response.status === 401){
                navigate("/login")
                    return
            }
            console.log(err)
        });
    };
    

    // Similar to previous page, uses meal data to render card. Only single meal fetched based on id
    return (
        <div className="container">
            <img src={heart} alt='Save Recipe' className='detailed-save-recipe' onClick={SaveRecipe}></img>

            <div className="row">
                <div className="row ">
                    <button className="col-auto input-btn btn btn-outline-light" onClick={handleBackClick}>Back</button>
                    <img src={heart} alt='Save Recipe' className='col-auto detailed-save-recipe' onClick={SaveRecipe}></img>
                </div>
            </div>
            <img src={heart} alt='Save Recipe' className='detailed-save-recipe' onClick={SaveRecipe}></img>
            <div className="container text-start my-2">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="title">{recipe.strMeal}</h2>
                        <div class="d-flex flex-column md-6">
                            {recipe.strCategory && <div class="p-2"><strong>Category:</strong> {recipe.strCategory}</div>}
                            {recipe.strArea && <div class="p-2"><strong>Area:</strong> {recipe.strArea}</div>}
                            {recipe.strTags && <div class="p-2"><strong>Tags:</strong> {recipe.strTags}</div>}
                            <div class="p-2">
                                <strong>Ingredients:</strong>
                                <ul>{allIngredients}</ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img src={recipe.strMealThumb} className="img-fluid rounded-start" alt={recipe.strMeal} />
                    </div>
                </div>
                <div className='row g-4'>
                    <div className="d-flex flex-column">
                        <div class="p-2">
                            <strong>Instructions:</strong>
                                {steps}
                                {recipe.strYoutube && (
                                    <a href={recipe.strYoutube} className="btn input-btn btn-outline-dark" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
