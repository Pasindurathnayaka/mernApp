import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Clear the error message after 5 seconds
    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 2000);

    // Cleanup the timer if the component unmounts or the error message changes
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send user login data to the backend API
      const response = await axios.post('http://localhost:5000/api/v1/users/login', formData);

      // Handle success, save the JWT token to localStorage or a state management solution
      localStorage.setItem('token', response.data.token);

      // You can do something here, e.g., redirect to a dashboard or home page
      // Replace '/dashboard' with the desired route
      window.location.replace('/');
    } catch (error) {
      // Handle error
      // alert("Invalid credentials");
      setErrorMessage(error.response.data.error);
      console.log(error.response.data);
    }
  };

  return (
    <>
      <NavBar />

      <div className="bg-gradient-to-r from-purple-400 to-pink-600 min-h-screen flex items-center justify-center">
        <div className="bg-orange-300 shadow-lg rounded-lg px-8 py-6 w-80 md:px-12 md:py-12 md:w-96">

          <h2 className="text-2xl font-semibold mb-6">Login</h2>

          <form onSubmit={handleSubmit}>

            {/* Render the Tailwind CSS alert if there's an error */}
            {errorMessage && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                <p>{errorMessage}</p>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Login
            </button>

          </form>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
