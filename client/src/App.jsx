import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SpeciesDirectory from './pages/SpeciesDirectory';
import SpeciesDetail from './pages/SpeciesDetail';
import EcosystemExplorer from './pages/EcosystemExplorer';
import EcosystemDetail from './pages/EcosystemDetail';
import Dashboard from './pages/Dashboard';
import TakeAction from './pages/TakeAction';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/species" element={<SpeciesDirectory />} />
          <Route path="/species/:id" element={<SpeciesDetail />} />
          <Route path="/ecosystems" element={<EcosystemExplorer />} />
          <Route path="/ecosystems/:id" element={<EcosystemDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/take-action" element={<TakeAction />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
