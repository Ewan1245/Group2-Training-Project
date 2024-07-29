import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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

    // Similar to previous page, uses meal data to render card. Only single meal fetched based on id
    return (
        <div className="container mt-5">
            <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Back</button>
            <div className="card">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={recipe.strMealThumb} className="img-fluid rounded-start" alt={recipe.strMeal} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title">{recipe.strMeal}</h2>
                            <p className="card-text"><strong>Category:</strong> {recipe.strCategory}</p>
                            <p className="card-text"><strong>Area:</strong> {recipe.strArea}</p>
                            <p className="card-text"><strong>Tags:</strong> {recipe.strTags}</p>
                            <p className="card-text"><strong>Instructions:</strong></p>
                            <p className="card-text">{recipe.strInstructions}</p>
                            <a href={recipe.strYoutube} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
