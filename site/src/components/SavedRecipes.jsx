import React, { useState, useEffect, useContext } from 'react';
import Recipe from './Recipe';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from '../baseUrl';
import { ChangeLoginContext } from '../App';



const Recipes = () => {

    const navigate = useNavigate(); // Hook to navigate
    const [recipes, setRecipes] = useState([]);
    const reCheckLogin = useContext(ChangeLoginContext);


    useEffect(() => {
    const getSavedRecipes = async() => {
        let token = sessionStorage.getItem("token");
            if(!token || token == ""){
                navigate("/login")
                return
            }
        const url = process.env.REACT_APP_BASEURL + "/getUserSavedRecipes/" + token;
        const savedRecipeIds = await axios.get(url).catch(err => console.log(err));
        if(!savedRecipeIds) {
            navigate("/login")
            return
        }
        let allRecipes = [];
        for(let id of savedRecipeIds.data.savedRecipes){
            const recipe = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).catch(err => console.log(err));
            allRecipes.push(recipe.data.meals[0])
        }

        setRecipes(allRecipes)
    }
    reCheckLogin(true);
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

