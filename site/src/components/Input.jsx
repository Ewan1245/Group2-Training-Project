import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Input.css';


const Input = ({ onSubmit }) => {
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(value);
        navigate('/');
    };

    return (
        <form className="d-flex mb-4" onSubmit={handleSubmit}>
            <input
                type="text"
                className="form-control me-2"
                value={value}
                onChange={handleChange}
                placeholder="Enter an ingredient"
            />
            <button type="submit" className="input-btn btn btn-primary">Search</button>
        </form>
    );
};

export default Input;
