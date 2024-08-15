import React from 'react';
import '../css/FilterOptions.css'

const FilterOptions = ({ cuisines, setCuisine, selectedCuisine }) => {

    const handleChange = (event) => {
        setCuisine(event.target.value);
    }

    return (
        <div className="recipe-filter-container">
            <select className="recipe-filter-box" value={selectedCuisine} onChange={handleChange}>
                <option value="">Select Cuisine</option>
                {cuisines !== undefined && cuisines.map((cuisine, index) => (
                    <option key={index} value={cuisine}>{cuisine}</option>
                ))}
            </select>
        </div>
    )
}

export default FilterOptions;