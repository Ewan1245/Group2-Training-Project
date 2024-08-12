import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Input from "./Input";
import FilterOptions from "./FilterOptions";
import Recipes from "./Recipes";
import GenQR from "./GenQR";
import FeaturedRecipes from "./FeaturedRecipes";


const HomePage = ({ setError, ingredients, setIngredients, selectedCuisine, setSelectedCuisine }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [fullCuisines, setFullCuisines] = useState([]); // Full list of cuisines

    // Effect to update ingredients based on URL parameters
    useEffect(() => {
        setIngredients(searchParams.getAll("ingredient"))
    }, [searchParams, setIngredients]);


    // Function to add an ingredient to the list
    const addIngredient = (ingredient) => {
        setSearchParams(sp => {
            sp.append("ingredient", ingredient);

            return sp;
        })
        setIngredients([...ingredients, ingredient]);
    }

    // Function to remove an ingredient from the list
    const removeIngredient = (ingredient) => {
        let ing_copy = ingredients.slice(); // Copy current ingredients array
        let index = ing_copy.indexOf(ingredient); // Find index of ingredient
        if (index !== -1) { // Check if it exists in the array
            ing_copy.splice(index, 1); // Remove it from the array
            setIngredients(ing_copy); // Update state

            // Update the URL by removing the ingredient from the search parameters
            setSearchParams(sp => {
                let params = new URLSearchParams(sp.toString());
                params.delete("ingredient");
                ing_copy.forEach(ing => params.append("ingredient", ing)); // Re-add remaining ingredients

                return params;
            });
        }
    }

    return (

        <>
            <Input addIngredient={addIngredient} ingredients={ingredients} removeIngredient={removeIngredient} />

            {ingredients.length == 0 && <FeaturedRecipes ingredients={['bread']} setError={setError} setCuisines={setFullCuisines} selectedCuisine={selectedCuisine} />}

            {ingredients.length > 0 &&
                <>
                    <FilterOptions cuisines={fullCuisines} setCuisine={setSelectedCuisine} selectedCuisine={selectedCuisine} />
                    <GenQR ingredients={ingredients} cuisine={selectedCuisine} />
                    <Recipes ingredients={ingredients} setError={setError} setFullCuisines={setFullCuisines} selectedCuisine={selectedCuisine} />
                </>
            }
        </>

    )
}

export default HomePage;