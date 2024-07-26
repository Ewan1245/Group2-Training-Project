import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import Recipes from './components/Recipes';
import RecipeDetail from './components/RecipeDetail';
import Input from './components/Input';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // useState hooks to manage the ingredient and error state. Defined here as states are set and used in different children components from here
  const [ingredient, setIngredient] = useState("");
  const [error, setError] = useState("");

  // Function to handle new ingredient, coming from Input and passed to Recipes
  const handleIngredientChange = (newIngredient) => {
    setError("");
    setIngredient(newIngredient);
  };

  return (
    <Router>
      <Header logged_in={false} />
      <div className="container mt-5">
        {/* Input component, passing handleIngredientChange as the onSubmit prop */}
        <Input onSubmit={handleIngredientChange} />
        {/* Display error message if there's an error */}
        {error && <div className="alert alert-danger">{error}</div>}
        <Switch>
          {/* Route for the recipes page, passing ingredient (set in handleIngredientChange) and setError (to set possible error messages) as props to Recipes component */}
          <Route path="/" element={<Recipes ingredient={ingredient} setError={setError} />} />
          {/* Route for recipe details, matching any URL with /recipe/:id pattern. This is the structure used by Link in Recipes.jsx and useParams() gets the id that way */}
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Switch>
      </div>
      <Footer />
    </Router>

  );
}

export default App;
