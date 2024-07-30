import React from 'react';

const FilterOptions = ({cuisines, setCuisine}) => {

    const handleChange = (event) => {

    }

    return (
        <div className='filter-options' onChange={handleChange}>
            <select>
                <option value="All">Select Cuisine</option>
                {cuisines.map((cuisine) => (
                    <option value={cuisine}>{cuisine}</option>
                ))}
            </select>
        </div>
    )
}

export default FilterOptions;