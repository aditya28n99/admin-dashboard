import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/LoginScreen';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import DashboardScreen from './pages/Dashboard/DashboardScreen';

function App() {

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };
  
  const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
  };
  
  return (
    <AuthProvider> 
    <Router>
    <Routes>      
      <Route path="/" element={<PrivateRoute element={<DashboardScreen />} />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
  </AuthProvider>
  );
}

export default App;
