import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Signup = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Clear the error message after 5 seconds
    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 1500);

    // Cleanup the timer if the component unmounts or the error message changes
    return () => clearTimeout(timer);
  }, [errorMessage]);

  async function handleSubmit(e) {

    e.preventDefault();

    const formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    try {

      // Send user sign-up data to the backend API
      const response = await axios.post('http://localhost:5000/api/v1/users/signup', formData);

      // Handle success
      console.log(response.data); // You can do something here, e.g., show a success message or redirect to login page
      setSuccessMessage("User created successfully");
      setTimeout(() => {
        window.location.replace('/login');
      }, 1000);

    } catch (error) {

      // alert("Email already exists");
      // Handle error
      if (error.response) {
        console.log('Server responded with error:', error.response.data);
        setErrorMessage(error.response.data.error);
      } else if (error.request) {
        console.log('Request was made but no response received:', error.request);
      } else
        console.log('Error setting up the request:', error.message);
    }

  };

  return (
    <>
      <NavBar />

      <div className="bg-gradient-to-r from-purple-400 to-pink-600 min-h-screen flex items-center justify-center">
        <div className="bg-orange-300 shadow-lg rounded-lg px-8 py-6 w-80 md:px-10 md:py-8 md:w-96">

          <h2 className="text-2xl font-semibold mb-6">Create an account</h2>

          <form onSubmit={handleSubmit}>

            {/* Render the Tailwind CSS success alert */}
            {successMessage && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
                <p>{successMessage}</p>
              </div>
            )}

            {/* Render the Tailwind CSS alert if there's an error */}
            {errorMessage && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                <p>{errorMessage}</p>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="mt-1 p-2 w-full border rounded-md"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="mt-1 p-2 w-full border rounded-md"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Sign up
            </button>
          </form>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Signup;