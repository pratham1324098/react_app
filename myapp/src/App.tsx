import React from 'react';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
      <Route
          path="/"
          element={
              <Homepage />
          }
        />
        <Route
          path="/dashboard"
          element={
              <Dashboard />
          }
        />
        <Route
          path="/register"
          element={
              <Register />
          }
        /><Route
        path="/login"
        element={
            <Login />
        }
      />
        </Routes>
    </>
  );
}

export default App;
