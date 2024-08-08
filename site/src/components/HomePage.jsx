import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Input from "./Input";
import FilterOptions from "./FilterOptions";
import Recipes from "./Recipes";
import GenQR from "./GenQR";
import FeaturedRecipes from "./FeaturedRecipes";


const HomePage = ({ setError, ingredients, setIngredients, selectedCuisine, setSelectedCuisine }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [cuisines, setCuisines] = useState([]); // List of cuisines

    // Effect to update ingredients based on URL parameters
    useEffect(() => {
        setIngredients(searchParams.getAll("ingredient"))
    }, [searchParams, setIngredients]);


    // Function to add an ingredient to the list
    const addIngredient = (ingredient) => {
        setSearchParams(sp => {
            sp.append("ingredient", ingredient);
            console.log(sp.toString());

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
        }
    }

    return (

        <>
            <Input addIngredient={addIngredient} ingredients={ingredients} removeIngredient={removeIngredient} />

            {ingredients.length == 0 && <FeaturedRecipes ingredients={['tomato']} setError={setError} setCuisines={setCuisines} selectedCuisine={selectedCuisine} />}

            {ingredients.length > 0 &&
                <>
                    <FilterOptions cuisines={cuisines} setCuisine={setSelectedCuisine} selectedCuisine={selectedCuisine} />
                    <GenQR ingredients={ingredients} cuisine={selectedCuisine} />
                    <Recipes ingredients={ingredients} setError={setError} setCuisines={setCuisines} selectedCuisine={selectedCuisine} />
                </>
            }
        </>

    )
}

export default HomePage;