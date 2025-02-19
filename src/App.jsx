import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './App.css';

function App() {
  const location = useLocation();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

  if (token && location.pathname === '/') {
    return <Navigate to={`/dashboard/${user.name}`} />;
  }
 
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      {!location.pathname.startsWith('/dashboard') && <Navigation />}
      <ScrollToTop />
      <main className="overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/:userName" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;