import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Input = ({ setIngredient }) => { // callback function provided by parent (App) which passes the data (ingredient) back up

    const [inputValue, setInputValue] = useState(""); // state for storing the value (ingredient) in the input field
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents default form submission
        setIngredient(inputValue); // Calls the parent component's setIngredient function
        navigate('/'); // Navigates back to the / path which in this case renders Recipe.jsx
    };

    return (
        <form className="d-flex mb-4" onSubmit={handleSubmit}>
            <input
                type="text"
                className="form-control me-2"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter an ingredient"
            />
            <button type="submit" className="btn btn-primary">Search</button>
        </form>
    );
};

export default Input;
