import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header logged_in={false} />

      <Footer />
    </>
  );
}

export default App;
