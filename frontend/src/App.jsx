import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, ProtectedRoute } from './Context/AuthContext';
import { UserProvider } from './Context/UserContext';
import { AdminProvider } from './Context/AdminContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <UserProvider>
              <Home />
            </UserProvider>
          } />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/admin-login" element={<Login />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminProvider>
                  <AdminPage />
                </AdminProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </Router>
    </AuthProvider>
  )
}

export default App