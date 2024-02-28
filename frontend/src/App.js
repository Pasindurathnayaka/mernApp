import React from 'react';
import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddBlog from './pages/AddBlog';
import ViewBlog from './pages/ViewBlog';
import UpdateBlog from './pages/UpdateBlog';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './hooks/PrivateRoute'; // Import the PrivateRoute component

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          {/* <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> */}

          {/* Use the PrivateRoute for the protected routes */}
          <Route path="/addBlog" element={<PrivateRoute element={<AddBlog />} />} />
          <Route path="/viewBlog/:id" element={<PrivateRoute element={<ViewBlog />} />} />
          <Route path="/updateBlog/:id" element={<PrivateRoute element={<UpdateBlog />} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;