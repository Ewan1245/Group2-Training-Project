import { BrowserRouter as Router, Route, Routes as Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState, useEffect, useRef } from 'react';
import Recipes from './components/Recipes';
import RecipeDetail from './components/RecipeDetail';
import Input from './components/Input';
import Login from './components/Login';
import PersonalProfile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import FeaturedRecipes from './components/FeaturedRecipes';
import FilterOptions from './components/FilterOptions';
import { FaComments, FaTimes, FaMinus } from 'react-icons/fa';
import Chat from './components/Chat';
import './css/Chat.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AppContent() {
  const [ingredients, setIngredients] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [error, setError] = useState("");

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setChatHistory([]);
  };

  const query = useQuery();
  const prevIngredientsRef = useRef();


  useEffect(() => {
    const urlIngredients = query.get("ingredients");
    const ingredientsArray = urlIngredients ? urlIngredients.split(",") : [];

    if (prevIngredientsRef.current !== ingredientsArray.toString()) {
      setIngredients(ingredientsArray);
      prevIngredientsRef.current = ingredientsArray.toString();
    }
  }, [query]);

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
    if (index != -1) { //check that it exists in the array
      ing_copy.splice(index, 1);
      setIngredients(ing_copy);
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header logged_in={false} />
      <div className="flex-grow-1 container mt-5">
        {/* TODO remove input when on login/profile page */}
        {/* Input component, passing setIngredient function as a prop so we can set the Ingredient state in the Input component */}

        {/* Display error message if there's an error */}
        {error && <div className="alert alert-danger">{error}</div>}
        <Switch>
          <Route path="/login" element={<Login />} />
          <Route path='/' element={
            <>
              <Input addIngredient={addIngredient} ingredients={ingredients} removeIngredient={removeIngredient} />
              {/* {ingredients.length==0 && <FeaturedRecipes setError={setError} />} */}
              {ingredients.length > 0 &&
                <>
                  <FilterOptions cuisines={cuisines} setCuisine={setSelectedCuisine} selectedCuisine={selectedCuisine} />
                  <Recipes ingredients={ingredients} setError={setError} setCuisines={setCuisines} selectedCuisine={selectedCuisine} />
                </>
              }
            </>
          } />
          {/* Route for the recipes page, passing ingredient (set in Ingredient component) and setError (to set state of possible error messages) as props to Recipes component */}
          {/* Route for recipe details, matching any URL with /recipe/:id pattern. This is the structure used by navigate in Recipes.jsx and useParams() gets the id that way */}
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/profile" element={<PersonalProfile />} />
        </Switch>
      </div>
      <div name="ChatBot">
        {!isChatOpen && (
          <button className="chat-icon" onClick={toggleChat}>
            <FaComments size={30} />
          </button>
        )}
        {isChatOpen && (
          <div className="chat-container">
            <div className="chat-header">
              <button className="chat-minimize" onClick={toggleChat}>
                <FaMinus size={20} />
              </button>
              <button className="chat-close" onClick={closeChat}>
                <FaTimes size={20} />
              </button>
            </div>
            <div className="chat-content">
              <Chat
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                userInput={userInput}
                setUserInput={setUserInput}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
