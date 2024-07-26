import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Input = ({ onSubmit }) => { // callback function provided by parent (App) which passes the data (ingredient) back up

    const inputRef = useRef(""); // Reference to the input element
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents default form submission
        const ingredient = inputRef.current.value; // Retrieves value from the input
        onSubmit(ingredient); // Calls the parent component's onSubmit function (handleIngredientChange)
        navigate('/'); // Navigates back to the / path which in this case renders Recipe.jsx
    };

    return (
        <form className="d-flex mb-4" onSubmit={handleSubmit}>
            <input
                type="text"
                className="form-control me-2"
                ref={inputRef}
                placeholder="Enter an ingredient"
            />
            <button type="submit" className="btn btn-primary">Search</button>
        </form>
    );
};

export default Input;
