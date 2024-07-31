import React from 'react';

const FilterOptions = ({cuisines, setCuisine, selectedCuisine}) => {

    const handleChange = (event) => {
        setCuisine(event.target.value);
    }

    console.log(selectedCuisine);

    return (
        <div className='filter-options'>
            <select onChange={handleChange}>
                <option value="">Select Cuisine</option>
                {cuisines !== undefined && cuisines.map((cuisine) => (
                    <option selected={selectedCuisine === cuisine ? "selected" : ""} value={cuisine}>{cuisine}</option>
                ))}
            </select>
        </div>
    )
}



export default FilterOptions;