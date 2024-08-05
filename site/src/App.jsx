import { BrowserRouter as Router, Route, Routes as Switch, useLocation, useParams } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState, useEffect, useRef } from 'react'; // React and its hooks
import Recipes from './components/Recipes';
import RecipeDetail from './components/RecipeDetail';
import Input from './components/Input';
import Login from './components/Login';
import PersonalProfile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS for styling
import FeaturedRecipes from './components/FeaturedRecipes';
import FilterOptions from './components/FilterOptions';
// import { FaComments, FaTimes, FaMinus } from 'react-icons/fa'; // Icons for chat UI
// import Chat from './components/Chat';
import './css/Chat.css';
import GenQR from './components/GenQR';
import QR_Router from './components/QR_Router';
// Custom hook to get query parameters from the URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Main content of the app, split from main App() component to be able to implement useLocation since it needs to be called within Router component
function AppContent() {
  // State variables
  const [ingredients, setIngredients] = useState([]); // List of ingredients
  const [cuisines, setCuisines] = useState([]); // List of cuisines
  const [selectedCuisine, setSelectedCuisine] = useState(""); // Currently selected cuisine
  const [error, setError] = useState(""); // Error message

  const [isChatOpen, setIsChatOpen] = useState(false); // Whether chat is open
  const [chatHistory, setChatHistory] = useState([]); // History of chat messages
  const [userInput, setUserInput] = useState(""); // User input for chat

  // Function to minimise chat, not fully closing
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Function to close chat
  const closeChat = () => {
    setIsChatOpen(false);
    setChatHistory([]); // Clear chat history when closing
  };

  const query = useQuery(); // Get query parameters from URL
  const prevIngredientsRef = useRef(); // Ref to store previous ingredients

  // Effect to update ingredients based on URL parameters
  useEffect(() => {
    const urlIngredients = query.get("ingredients");
    const ingredientsArray = urlIngredients ? urlIngredients.split(",") : [];

    if (prevIngredientsRef.current !== ingredientsArray.toString()) {
      setIngredients(ingredientsArray);
      prevIngredientsRef.current = ingredientsArray.toString();
    }
  }, [query]);

  // Function to add an ingredient to the list
  const addIngredient = (ingredient) => {
    let ing_copy = ingredients.slice(); // Copy current ingredients array
    ing_copy.push(ingredient); // Add new ingredient
    setIngredients(ing_copy); // Update state
  }

  // Function to remove an ingredient from the list
  const removeIngredient = (ingredient) => {
    let ing_copy = ingredients.slice(); // Copy current ingredients array
    let index = ing_copy.indexOf(ingredient); // Find index of ingredient
    if (index !== -1) { // Check if it exists in the array
      ing_copy.splice(index, 1); // Remove it from the array
      setIngredients(ing_copy); // Update state
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
          <Route path='/qr_routing/:ingredients/:cuisine' element={<QR_Router setIngredients={setIngredients} setCuisine={setSelectedCuisine}/>}/>
          <Route path='/' element={
            <>
              <Input addIngredient={addIngredient} ingredients={ingredients} removeIngredient={removeIngredient} />
              {/* {ingredients.length==0 && <FeaturedRecipes setError={setError} />} */}
              {ingredients.length > 0 &&
                <>
                  <FilterOptions cuisines={cuisines} setCuisine={setSelectedCuisine} selectedCuisine={selectedCuisine} />
                  <GenQR ingredients={ingredients} cuisine={selectedCuisine}/>
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
      {/* <div name="ChatBot"> */}
        {/* Button to open chat */}
        {/* {!isChatOpen && ( */}
          {/* <button className="chat-icon" onClick={toggleChat}> */}
            {/* <FaComments size={30} /> */}
          {/* </button> */}
        {/* )} */}
        {/* Chat window */}
        {/* {isChatOpen && ( */}
          {/* <div className="chat-container"> */}
            {/* <div className="chat-header"> */}
              {/* Minimize chat button */}
              {/* <button className="chat-minimize" onClick={toggleChat}> */}
                {/* <FaMinus size={20} /> */}
              {/* </button> */}
              {/* Close chat button */}
              {/* <button className="chat-close" onClick={closeChat}> */}
                {/* <FaTimes size={20} /> */}
              {/* </button> */}
            {/* </div> */}
            {/* <div className="chat-content"> */}
              {/* <Chat
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                userInput={userInput}
                setUserInput={setUserInput}
              /> */}
            {/* </div> */}
          {/* </div> */}
        {/* )} */}
      {/* </div> */}
      <Footer />
    </div>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
