import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

import PublicLayout from './components/layout/PublicLayout';
import PrivateLayout from './components/layout/PrivateLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Explore from './pages/Explore';
import MyBookings from './pages/MyBookings';
import MyCars from './pages/MyCars';
import AddCar from './pages/AddCar';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <Toaster 
        position="bottom-right" 
        toastOptions={{ 
          style: { background: '#161618', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0' } 
        }} 
      />
      <Router>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route element={<PrivateLayout />}>
               <Route path="/my-bookings" element={<MyBookings />} />
               <Route path="/my-cars" element={<MyCars />} />
               <Route path="/add-car" element={<AddCar />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
