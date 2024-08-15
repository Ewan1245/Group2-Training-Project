import React, { useContext, useEffect } from 'react';
import { ChangeLoginContext } from '../App';

const FilterOptions = ({ cuisines, setCuisine, selectedCuisine }) => {

    const handleChange = (event) => {
        setCuisine(event.target.value);
    }

    const reCheckLogin = useContext(ChangeLoginContext);
    useEffect(() => {
        reCheckLogin(true);
    }, []);



    return (
        <div className='filter-options'>
            <select value={selectedCuisine} onChange={handleChange}>
                <option value="">Select Cuisine</option>
                {cuisines !== undefined && cuisines.map((cuisine, index) => (
                    <option key={index} value={cuisine}>{cuisine}</option>
                ))}
            </select>
        </div>
    )
}



export default FilterOptions;