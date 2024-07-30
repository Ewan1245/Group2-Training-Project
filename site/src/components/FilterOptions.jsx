import React from 'react';

const FilterOptions = ({cuisines, setCuisine}) => {

    const handleChange = (event) => {
        setCuisine(event.target.value);
    }

    return (
        <div className='filter-options'>
            <select onChange={handleChange}>
                <option value="">Select Cuisine</option>
                {cuisines !== null && cuisines.map((cuisine) => (
                    <option value={cuisine}>{cuisine}</option>
                ))}
            </select>
        </div>
    )
}

export default FilterOptions;