import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products'
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import TestStripe from './pages/TestStripe';
import Return from './components/Return';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/products' element={<Products />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/test-stripe' element={<TestStripe />} />
                <Route path='/return' element={<Return />} />
            </Routes>
        </div>
    );
}

export default App;
