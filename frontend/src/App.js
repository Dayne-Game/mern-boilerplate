import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Layout from './components/Layout'
import { TokenExpiryCheck } from './helper/TokenExpiryCheck'
import Register from './pages/Register'
import AccountSettings from './pages/account/AccountSettings'

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
    <>
      <Router>
        <Routes>
          <Route element={<Layout hideHeaderPaths={["/login", "/register"]} />}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-account" element={<AccountSettings />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
