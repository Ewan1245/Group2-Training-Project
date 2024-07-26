import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Recipes = ({ ingredient, setError }) => { // ingredient prop passed from parent component (App) to find recipes, and setError allows to set error message to change state in parent (App)

    const [recipes, setRecipes] = useState([]); // State for storing recipes

    // Effect to fetch recipes when the ingredient changes
    useEffect(() => {
        const fetchRecipes = async () => {
            if (!ingredient.trim()) {
                return; // Do nothing if ingredient is empty, needed to pull the rendering of message outside of useEffect because it sometimes messed up.
            }
            try {
                // Fetching recipes based on ingredient
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
                // Extract the list of meals from the response data
                const meals = response.data.meals;

                // Handle the case where no meals are returned
                if (!meals) {
                    setRecipes([]);
                    setError("No recipes found for this ingredient.");
                    return;
                }

                // Prepare an array to store detailed information about each meal
                const detailedMeals = [];

                // Loop through each meal to fetch additional details
                for (let meal of meals) {
                    // Fetching additional details for each meal to have more info to display on Recipes page
                    const detailResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);

                    // Add the detailed information to the detailedMeals array
                    detailedMeals.push({
                        ...meal, // Spread operator to include all properties of the original meal
                        strArea: detailResponse.data.meals[0].strArea,
                        strTags: detailResponse.data.meals[0].strTags,
                    });
                }

                // Update the state with the array of detailed meals
                setRecipes(detailedMeals);
                setError("");
            } catch (err) {
                console.error(err);
                setError("Failed to fetch recipes");
            }
        };

        fetchRecipes();
    }, [ingredient, setError]); // Dependency array: re-run effect when ingredient or setError changes

    // message when no/empty string ingredient is submitted
    if (!ingredient.trim()) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning" role="alert">
                    Please enter an ingredient to search for recipes.
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="mb-4">Recipes</h1>
            <div className="row">
                {recipes.map(recipe => ( // mapping over the recipes array filled with the detailedMeals data, using that data to build each recipe card
                    <div key={recipe.idMeal} className="col-md-4 mb-4">
                        <div className="card">
                            <Link to={`/recipe/${recipe.idMeal}`} className="text-decoration-none"> {/* using the meal id to redirect to RecipeDetail component with id in URL */}
                                <img src={recipe.strMealThumb} className="card-img-top" alt={recipe.strMeal} />
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.strMeal}</h5>
                                    <p className="card-text"><strong>Area:</strong> {recipe.strArea}</p>
                                    <p className="card-text"><strong>Tags:</strong> {recipe.strTags}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recipes;
