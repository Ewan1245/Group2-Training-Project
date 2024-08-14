import React, { useState, useEffect } from 'react';
import Recipe from './Recipe';
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Recipes = () => {

    const navigate = useNavigate(); // Hook to navigate
    const [recipes, setRecipes] = useState([]);


    useEffect(() => {
    const getSavedRecipes = async() => {
        let token = sessionStorage.getItem("token");
            if(!token){
                navigate("/login")
                return
            }
        const url = "http://localhost:8080/getUserSavedRecipes/" + token;
        const savedRecipeIds = await axios.get(url).catch(err => console.log(err));
        let allRecipes = [];
        for(let id of savedRecipeIds.data.savedRecipes){
            const recipe = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).catch(err => console.log(err));
            allRecipes.push(recipe.data.meals[0])
        }

        setRecipes(allRecipes)
    }
    getSavedRecipes()
    }, [] );
        
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

