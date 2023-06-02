import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Exchanges from './components/Exchanges';
import Coins from './components/Coins';
import CoinDetails from './components/CoinDetails';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/xcrypto/" element={<Home />} />
        <Route path="/xcrypto/coins/" element={<Coins />} />
        <Route path="/xcrypto/exchanges/" element={<Exchanges />} />
        <Route path="/xcrypto/coin-details/:id/" element={<CoinDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
