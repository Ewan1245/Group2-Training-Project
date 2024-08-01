import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import Recipes from './components/Recipes';
import RecipeDetail from './components/RecipeDetail';
import Input from './components/Input';
import Login from './components/Login';
import PersonalProfile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // useState hooks to manage the ingredient and error state. Defined here as states are set and used in different children components from here
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState("");

  //add an ingredient to the ingredients array
  const addIngredient = (ingredient) => {
    //copy the current ingredients array
    let ing_copy = ingredients.slice();
    ing_copy.push(ingredient);
    setIngredients(ing_copy);
  }

  //remove an ingredient from the ingredients aray
  const removeIngredient = (ingredient) => {
    //copy the current ingredients array
    let ing_copy = ingredients.slice();
    let index = ing_copy.indexOf(ingredient);
    if(index != -1) { //check that it exists in the array
      ing_copy.splice(index,1);
      setIngredients(ing_copy);
    }
  }


  return (
    <Router>
      <Header logged_in={false} />
      <div className="container mt-5">
        {/* TODO remove input when on login/profile page */}
        {/* Input component, passing setIngredient function as a prop so we can set the Ingredient state in the Input component */}
        <Input addIngredient={addIngredient} ingredients={ingredients} removeIngredient={removeIngredient} />
        {/* Display error message if there's an error */}
        {error && <div className="alert alert-danger">{error}</div>}
        <Switch>
          <Route path="/login" element={<Login />} />
          {/* Route for the recipes page, passing ingredient (set in Ingredient component) and setError (to set state of possible error messages) as props to Recipes component */}
          <Route path="/" element={<Recipes ingredients={ingredients} setError={setError} />} />
          {/* Route for recipe details, matching any URL with /recipe/:id pattern. This is the structure used by navigate in Recipes.jsx and useParams() gets the id that way */}
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/profile" element={<PersonalProfile />} />
        </Switch>
      </div>
      <Footer />
    </Router>

  );
}

export default App;
