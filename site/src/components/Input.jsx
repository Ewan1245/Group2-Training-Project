import React, { createRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Input.css';
import IngredientContainer from './IngredientContainer';
import FilterOptions from './FilterOptions';


const Input = ({ addIngredient, ingredients, removeIngredient }) => { // callback function provided by parent (App) which passes the data (ingredient) back up

    const [inputValue, setInputValue] = useState(""); // state for storing the value (ingredient) in the input field
    const navigate = useNavigate(); // Hook for navigation

    const input_ref = createRef();


    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents default form submission
        addIngredient(inputValue); // Calls the parent component's setIngredient function
        navigate('/'); // Navigates back to the / path which in this case renders Recipe.jsx

        //clear the input field and focus it
        input_ref.current.focus();
        setInputValue("");
    };

    const cuisines = ["Chinese", "Indian", "British"];

    return (

        <div className='input'>
            <form className="d-flex mb-4" onSubmit={handleSubmit}>
                <input
                    name="Ingredient Input"
                    type="text"
                    autoFocus
                    ref={input_ref}
                    className="form-control me-2"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter an ingredient"
                />
                <button type="submit" className="input-btn btn btn-primary">Add Ingredient</button>
            </form>
            <div className='ingredients'>
                {ingredients.map((ingredient, index) => (
                    <IngredientContainer key={index} removeIngredient={removeIngredient} ingredient={ingredient} />
                ))}
            </div>
            {/* <FilterOptions cuisines={cuisines}/> */}
        </div>
    );
};

export default Input;
