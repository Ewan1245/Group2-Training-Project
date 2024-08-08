import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

{/* duplicate of Recipes.jsx with some changes to create a featured recipes panel */}
const FeaturedRecipes = ({ ingredients, setError }) => {
    const [recipes, setRecipes] = useState([]); // State for storing recipes
    const navigate = useNavigate(); // Hook to navigate

    // Function to check if a meal contains all ingredients
    const containsAllIngredients = (meal, ingredients) => {
        const mealIngredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient) {
                mealIngredients.push(ingredient.toLowerCase());
            }
        }
        return ingredients.every(ing => mealIngredients.includes(ing.toLowerCase()));
    };

    // Effect to fetch recipes
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const allMeals = [];

                // Fetch recipes for each ingredient in the ingredients array, initial fetch only gets Recipe name and basic info
                for (let ing of ingredients) {
                    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`);
                    const meals = response.data.meals;

                    if (meals) {
                        // Prepare an array to store detailed information about each meal based on id from previous fetch
                        for (let meal of meals) {
                            const detailResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                            const detailedMeal = detailResponse.data.meals[0];
                            allMeals.push({
                                ...detailedMeal, // Ensure all detailed properties are included, may include duplicate meals
                                strArea: detailedMeal.strArea,
                                strTags: detailedMeal.strTags
                            });
                        }
                    }
                }

                // Remove duplicate meals based on idMeal
                const uniqueMeals = Array.from(new Set(allMeals.map(meal => meal.idMeal)))
                    .map(idMeal => allMeals.find(meal => meal.idMeal === idMeal));

                // Filter meals to keep only those that contain all the ingredients
                const filteredMeals = uniqueMeals.filter(meal => containsAllIngredients(meal, ingredients));

                while (filteredMeals.length > 3) {
                    filteredMeals.pop();
                }

                if (filteredMeals.length === 0) {
                    setError("No featured recipes found for those ingredients.");
                } else {
                    // Update the state with the unique detailed meals
                    setRecipes(filteredMeals);
                    setError("");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch recipes");
            }
        };

        fetchRecipes();
    }, [ingredients, setError]); // Dependency array: re-run effect when setError changes (need to add ingredients in once Input with array has been implemented)

    // // message when no/empty string ingredient is submitted
    // if (!ingredient.trim()) {
    //     return (
    //         <div className="container mt-5">
    //             <div className="alert alert-warning" role="alert">
    //                 Please enter an ingredient to search for recipes.
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div>
            <h1 className="mb-4">Featured Recipes</h1>
            <div className="row">
                {recipes.map(recipe => ( // Mapping over the recipes array filled with the detailedMeals data, using that data to build each recipe card
                    <div key={recipe.idMeal} onClick={() => navigate("/recipe/" + recipe.idMeal)} className="col-md-4 mb-4"> {/* Using navigate in the div to redirect */}
                        <div className="recipes-card card">
                            <div className="imgContainer">
                            <img src={recipe.strMealThumb} className="card-img-top" alt={recipe.strMeal} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{recipe.strMeal}</h5>
                                <p className="card-text"><strong>Area:</strong> {recipe.strArea}</p>
                                <p className="card-text"><strong>Tags:</strong> {recipe.strTags}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedRecipes;
