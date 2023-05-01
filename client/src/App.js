import Topbar from './components/HomeCom/topbar/topbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login';
import Cryptos from './Pages/Cryptos/Cryptos';
import Footer from './components/Footer/Footer';
import News from './Pages/News/News';
import Coin from './Pages/Coin/Coin';
import Register from './Pages/Login/Register';
import Profile from './Pages/Profile/Profile';


function App() {
  
  return (
    <div>
        <Router>
            <Topbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cryptos' element={<Cryptos />} />
              <Route path='/cryptos/:id' element={<Coin />} />
              <Route path='/news' element={<News />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register  />} />
              <Route path='/profile' element={<Profile  />} />
            </Routes>
          <Footer />
        </Router>
    </div>
  );
}

export default App;
