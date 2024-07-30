import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home/Page';
import Inventory from './pages/Inventory/Page';
import Stats from './pages/Stats/Page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Home />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/stats' element={<Stats />} />
        {/* <Route path='/game/:gameId' element={<GamePage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
