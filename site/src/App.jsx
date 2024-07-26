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
  const [ingredient, setIngredient] = useState("");
  const [error, setError] = useState("");

  const handleIngredientChange = (newIngredient) => {
    setError("");
    setIngredient(newIngredient);
  };

  return (
    <Router>
      <Header logged_in={false} />
      <div className="container mt-5">
        <Input onSubmit={handleIngredientChange} />
        {error && <div className="alert alert-danger">{error}</div>}
        <Switch>
          <Route path="/" element={<Recipes ingredient={ingredient} setError={setError} />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Switch>
      </div>
      <Footer />
    </Router>

  );
}

export default App;
