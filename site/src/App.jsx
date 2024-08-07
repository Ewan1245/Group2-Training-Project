import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState } from 'react'; // React and its hooks
import RecipeDetail from './components/RecipeDetail';
import Login from './components/Login';
import PersonalProfile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS for styling
import { FaComments, FaTimes, FaMinus } from 'react-icons/fa'; // Icons for chat UI
import Chat from './components/Chat';
import './css/Chat.css';
import HomePage from './components/HomePage';
import GenQR from './components/GenQR';
import QR_Router from './components/QR_Router';

function App() {
  // State variables
  const [error, setError] = useState(""); // Error message

  const [isChatOpen, setIsChatOpen] = useState(false); // Whether chat is open
  const [chatHistory, setChatHistory] = useState([]); // History of chat messages
  const [userInput, setUserInput] = useState(""); // User input for chat

  const [ingredients, setIngredients] = useState([]); // List of ingredients
  const [selectedCuisine, setSelectedCuisine] = useState(""); // Currently selected cuisine

  // Function to minimise chat, not fully closing
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Function to close chat
  const closeChat = () => {
    setIsChatOpen(false);
    setChatHistory([]); // Clear chat history when closing
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header logged_in={false} />
        <div className="flex-grow-1 container mt-5">
          {/* TODO remove input when on login/profile page */}
          {/* Input component, passing setIngredient function as a prop so we can set the Ingredient state in the Input component */}

          {/* Display error message if there's an error */}
          {error && <div className="alert alert-danger">{error}</div>}
          <Switch>
            <Route path="/login" element={<Login />} />
            <Route path='/qr_routing/:ingredients/:cuisine' element={<QR_Router setIngredients={setIngredients} setCuisine={setSelectedCuisine} />} />


            {/* Home Page content */}
            <Route path='/' element={
              <>
                <HomePage setError={setError} ingredients={ingredients} setIngredients={setIngredients} selectedCuisine={selectedCuisine} setSelectedCuisine={setSelectedCuisine} />
                {/* <GenQR ingredients={ingredients} cuisine={selectedCuisine} /> */}
              </>} />
            {/* Route for the recipes page, passing ingredient (set in Ingredient component) and setError (to set state of possible error messages) as props to Recipes component */}
            {/* Route for recipe details, matching any URL with /recipe/:id pattern. This is the structure used by navigate in Recipes.jsx and useParams() gets the id that way */}
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/profile" element={<PersonalProfile />} />
          </Switch>
        </div>
        <div name="ChatBot">
          {/* Button to open chat */}
          {!isChatOpen && (
            <button className="chat-icon" onClick={toggleChat}>
              <FaComments size={30} />
            </button>
          )}
          {/* Chat window */}
          {isChatOpen && (
            <div className="chat-container">
              <div className="chat-header">
                {/* Minimize chat button */}
                <button className="chat-minimize" onClick={toggleChat}>
                  <FaMinus size={20} />
                </button>
                {/* Close chat button */}
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
    </Router>
  );
}

// // Main App component
// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

export default App;