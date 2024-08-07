import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Input from "./Input";
import FilterOptions from "./FilterOptions";
import Recipes from "./Recipes";
import GenQR from "./GenQR";


const HomePage = ({ setError, ingredients, setIngredients,selectedCuisine,setSelectedCuisine }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const [cuisines, setCuisines] = useState([]); // List of cuisines

    // Effect to update ingredients based on URL parameters
    useEffect(() => {
        const urlIngredients = new URLSearchParams(searchParams).get("ingredients");
        const ingredientsArray = urlIngredients ? urlIngredients.split(",") : [];

        setIngredients(ingredientsArray);
    }, [searchParams]);


    // Function to add an ingredient to the list
    const addIngredient = (ingredient) => {
        setIngredients([...ingredients, ingredient]);
        params.append("ingredients", ingredient);
        setSearchParams({ ingredients: params.getAll("ingredients").join(",") });
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
            
            {/* {ingredients.length==0 && <FeaturedRecipes setError={setError} />} */}
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