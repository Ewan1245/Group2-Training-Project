import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Recipes.css'

const Recipes = ({ ingredient, setError }) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            if (!ingredient.trim()) {
                return;
            }
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
                const meals = response.data.meals;

                if (!meals) {
                    setRecipes([]);
                    setError("No recipes found for this ingredient.");
                    return;
                }

                const detailedMeals = [];

                for (let meal of meals) {
                    const detailResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                    detailedMeals.push({
                        ...meal,
                        strArea: detailResponse.data.meals[0].strArea,
                        strTags: detailResponse.data.meals[0].strTags,
                    });
                }

                setRecipes(detailedMeals);
                setError("");
            } catch (err) {
                console.error(err);
                setError("Failed to fetch recipes");
            }
        };

        fetchRecipes();
    }, [ingredient, setError]);

    return (
        <div>
            <h1 className="mb-3">Recipes</h1>
            <div className="row">
                {recipes.map(recipe => (
                    <div key={recipe.idMeal} className="col-md-3 mb-3">
                        <div className="card">
                            <Link to={`/recipe/${recipe.idMeal}`} className="text-decoration-none">
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
