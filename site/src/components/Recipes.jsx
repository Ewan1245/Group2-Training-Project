import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Recipes.css'
import Recipe from './Recipe';

const Recipes = ({ ingredients, setError, setFullCuisines, selectedCuisine }) => {
    const [recipes, setRecipes] = useState([]); // State for storing recipes

    // Example ingredients array
    // const ingredients = ['Tomato', 'Mozzarella', 'Bread'];

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
                                strCategory: detailedMeal.strCategory
                            });
                        }
                    }
                }

                // Remove duplicate meals based on idMeal
                const uniqueMeals = Array.from(new Set(allMeals.map(meal => meal.idMeal)))
                    .map(idMeal => allMeals.find(meal => meal.idMeal === idMeal));

                // Filter meals to keep only those that contain all the ingredients
                let filteredMeals = uniqueMeals.filter(meal => containsAllIngredients(meal, ingredients));

                // Create a set of all cuisines in the fetched meals
                const allCuisines = new Set(uniqueMeals.map(meal => meal.strArea));
                setFullCuisines([...allCuisines]); // Update the full list of cuisines

                if (selectedCuisine !== "") filteredMeals = filteredMeals.filter(meal => meal.strArea === selectedCuisine);

                if (filteredMeals.length === 0) {
                    setRecipes([]); // Clear the recipes state
                    setError("No recipes found for those ingredients.");
                } else {
                    setRecipes(filteredMeals); // Update the state with the unique detailed meals
                    setError("");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch recipes");
            }
        };

        fetchRecipes();
    }, [ingredients, setError, selectedCuisine, setFullCuisines]); // Dependency array: re-run effect when setError changes (need to add ingredients in once Input with array has been implemented)


    return (
        <div>
            <div className="row">
                {recipes.map(recipe => ( // Mapping over the recipes array filled with the detailedMeals data, using that data to build each recipe card
                    <Recipe idMeal={recipe.idMeal} strMealThumb={recipe.strMealThumb} strMeal={recipe.strMeal} strArea={recipe.strArea} strCategory={recipe.strCategory} />
                ))}
            </div>
        </div>
    );
};

export default Recipes;
