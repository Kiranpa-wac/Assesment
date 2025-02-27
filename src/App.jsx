// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { RecoilRoot } from 'recoil';
import { Provider } from 'jotai';
import Login from './Pages/Login';
import Home from './Pages/Home';
import ProtectedRoute from './Protected';
import EmployeeDetailsPage from './Components/EmployeeDetailsPage';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route path='/detail/:id' element={
            <ProtectedRoute>
            <EmployeeDetailsPage />
            </ProtectedRoute>
            } />
          <Route path='*' element={<Navigate to='/' />} />
          {/* <Route path='/update-employee/:id' element={<UpdateEmployee />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
