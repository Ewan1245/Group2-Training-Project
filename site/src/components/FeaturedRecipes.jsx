import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/FeaturedRecipes.css';
import heart from '../images/bookmark-heart.svg'
import featured from '../images/featured-recipes.png';
import baseUrl from '../baseUrl';
import Recipe from './Recipe';
import RecipeCarousel from './RecipeCarousel'
import demoRecipes from './StaticFeaturedRecipes';


{/* duplicate of Recipes.jsx with some changes to create a featured recipes panel */ }
const FeaturedRecipes = ({ ingredients, setError, idMeal }) => {
    console.log("here")
    const [recipes, setRecipes] = useState([demoRecipes]); // State for storing recipes
    const navigate = useNavigate(); // Hook to navigate


    return (
        <div>
            <div class="d-none d-md-block">  {/* show on screens bigger than phones */}
                <img src={featured} className='featured-recipes'></img>
                <br></br>
                <br></br>
                <div className="row">
                    {recipes[0].map(recipe => ( // Mapping over the recipes array filled with the detailedMeals data, using that data to build each recipe card
                        <Recipe idMeal={recipe.idMeal} strMealThumb={recipe.strMealThumb} strMeal={recipe.strMeal} strArea={recipe.strArea} strCategory={recipe.strCategory} />
                    ))}
                </div>
            </div>




            <div className="d-md-none"> {/* hide on screens bigger than phones */}
                <img src={featured} className='featured-recipes'></img>
                <br></br>
                <br></br>
                <div className="row">
                    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">

                            <div className="carousel-item active" data-bs-interval="3000">
                                <RecipeCarousel idMeal={recipes[0][0].idMeal} strMealThumb={recipes[0][0].strMealThumb} strMeal={recipes[0][0].strMeal} strArea={recipes[0][0].strArea} strCategory={recipes[0][0].strCategory} />
                            </div>

                            <div className="carousel-item " data-bs-interval="3000">
                                <RecipeCarousel idMeal={recipes[0][1].idMeal} strMealThumb={recipes[0][1].strMealThumb} strMeal={recipes[0][1].strMeal} strArea={recipes[0][1].strArea} strCategory={recipes[0][1].strCategory} />
                            </div>


                            <div className="carousel-item " data-bs-interval="3000">
                                <RecipeCarousel idMeal={recipes[0][2].idMeal} strMealThumb={recipes[0][2].strMealThumb} strMeal={recipes[0][2].strMeal} strArea={recipes[0][2].strArea} strCategory={recipes[0][2].strCategory} />
                            </div>


                            <div className="carousel-item " data-bs-interval="3000">
                                <RecipeCarousel idMeal={recipes[0][3].idMeal} strMealThumb={recipes[0][3].strMealThumb} strMeal={recipes[0][3].strMeal} strArea={recipes[0][3].strArea} strCategory={recipes[0][3].strCategory} />
                            </div>

                        </div>
                        <div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FeaturedRecipes;
