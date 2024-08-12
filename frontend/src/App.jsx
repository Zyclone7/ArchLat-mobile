import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import BookDetails from './components/bookDetails'; // Adjusted import path and component name
import BookRead from './components/bookRead';


function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/file/:fileId' element={<BookDetails />} /> {/* Updated to use element prop */}
            <Route path='/read/:fileId' element={<BookRead />} /> {/* Add this route */}
          </Routes>

        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
