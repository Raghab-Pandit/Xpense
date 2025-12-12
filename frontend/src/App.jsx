import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route
} from 'react-router-dom'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expenses from './pages/Dashboard/Expenses'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

const Root = () => {
  //check if user is authenticated
  const isAuthenticated = !!localStorage.getItem('token');

  //redirect to dashboard if authenticated, else to login
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}