import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Products from './components/Products';
import Navbar from './components/Navbar';
import Authentication from './components/Authentication';
import Home from './components/Home';
function App() {
  return (
    <div>

      <Router>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/authentication' element={<Authentication/>}></Route>
        </Routes>
      </Router>
     

    </div>
  );
}

export default App;
