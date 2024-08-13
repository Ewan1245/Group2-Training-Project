import React, { useState, useEffect } from 'react';
import Recipe from './Recipe';
import TestRecipe from './TestRecipes';


const Recipes = () => {
    const [recipes, setRecipes] = useState( TestRecipe ); //Hard Coded Recipes for now to prove functionality
        

    return (
        <div>
            <h1 className="h1 mb-4">Saved Recipes</h1>
            <div className="row">
                {/* <body>{recipes}</body> */}
                {recipes.map(recipe => ( // Mapping over the recipes array filled with the detailedMeals data, using that data to build each recipe card
                    <Recipe  idMeal = {recipe.idMeal}  strMealThumb = {recipe.strMealThumb} strMeal = {recipe.strMeal} strArea = {recipe.strArea} strTags = {recipe.strTags}/>
                ))}
            </div>
        </div>
    );
};


export default Recipes;

