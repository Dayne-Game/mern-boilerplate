import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Layout from './components/Layout'
import { TokenExpiryCheck } from './helper/TokenExpiryCheck'

function App() {

  useEffect(() => {
    const interval = setInterval(() => {
      if(localStorage.getItem('token')) {
        TokenExpiryCheck();
      }
    }, 10000)

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<Layout hideHeaderPaths={["/login"]} />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
