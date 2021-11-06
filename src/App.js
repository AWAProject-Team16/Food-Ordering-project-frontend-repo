import './App.css';
import { BrowserRouter } from "react-router-dom";
import Nav from './components/Nav';
import Footer from './components/Footer';
import RouterURL from './router/RouterURL';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <RouterURL />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;