import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Layout from './components/Layout'
import AccountSettings from './pages/account/AccountSettings'
import RequestPasswordReset from './pages/password-reset/RequestPasswordReset';
import PasswordReset from './pages/password-reset/PasswordReset';
import TimeLog from './pages/TimeLog';
import PersistentLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout hideHeaderPaths={["/login", "/register", "/request-password-reset", "/password-reset/"]} />}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/request-password-reset" element={<RequestPasswordReset />} />
            <Route path="/password-reset/:id/:resetToken" element={<PasswordReset />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}

            {/* Protected Routes */}
            <Route element={<PersistentLogin />}>
				<Route element={<RequireAuth />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/my-account" element={<AccountSettings />} />
					<Route path="/timelogs" element={<TimeLog />} />
				</Route>
            </Route>

          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
