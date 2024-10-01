import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';


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
      <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
  </AuthProvider>
  );
}

export default App;
