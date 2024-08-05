import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const QR_Router = ({setIngredients, setCuisine}) => {
    const {ingredients, cuisine} = useParams();
    const nav = useNavigate();
    
    useEffect(() => {
        setIngredients(ingredients.split(","));
        if(cuisine == "undefined") setCuisine("");
        else setCuisine(cuisine);

        nav("/");
    }, []);
}

export default QR_Router;