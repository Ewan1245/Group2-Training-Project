import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                setRecipe(response.data.meals[0]);
            } catch (err) {
                console.error(err);
                setError("Failed to find recipe details");
            }
        };

        fetchRecipe();
    }, [id]);

    const handleBackClick = () => {
        navigate(-1);
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

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
