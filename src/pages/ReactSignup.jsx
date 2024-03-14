import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import StartFirebase from '../firebase';
import { ref, set } from 'firebase/database';
import customLogo from '../assets/logo.png';
import customLogo2 from '../assets/logo.png';  


const DataSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    section: '',
  });

  const { email, password, name, section } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      const db = StartFirebase();
      const data = {
        email,
        name,
        section,
      };

      const encodedEmail = data.email.replace('.',',')

      await set(ref(db, `Users/${encodedEmail}`), data);

      //lagay dito ung nav
      navigate("/");

    } catch (error) {
      //alert('There was an error, details: ' + error.message);
      alert('The user has already been registered')
    }
  };

  return (
    <div>
<nav className="bg-gray-900 border-gray-200 dark:bg-gray-900">

<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a
    href=""
    className="flex items-center space-x-3 rtl:space-x-reverse"
  >
    <img
              src={customLogo}
              className="h-10"
              alt="Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">E.M.A</span>
    
  </a>

  <a
        href=""
        className="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <img
          src={customLogo2}
          className="h-12"
          alt="Logo2"
        />
       
        
  </a>
</div>



  

</nav>

<div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
  
  <h2 className="mb-4 text-3xl font-extrabold text-white dark:text-white md:text-4xl lg:text-6xl text-shadow-md">
    <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-400">Earthquake Monitoring</span> App.</h2>
  
  

</div>


    
    <div className='flex justify-center '>
      <div className="w-full max-w-sm p-4 bg-gray-800 border border-gray-700 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6 signup-form" action="#" onSubmit={handleSubmit}>
          <h5 className="flex justify-center text-xl font-medium text-white dark:text-white">
            Sign Up
          </h5>

          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-600 border border-gray-500 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Full Name"
              required=""
              value={name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="section"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Section
            </label>
            <input
              type="text"
              name="section"
              id="section"
              className="bg-gray-600 border border-gray-500 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Section"
              required=""
              value={section}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-600 border border-gray-500 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@mail.com"
              required=""
              value={email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-600 border border-gray-500 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required=""
              value={password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 signup-button"
          >
            Create a new account
          </button>

          <div className="text-sm font-medium text-gray-300 dark:text-gray-300">
            Already have an account? {' '}
            <Link to="/" className="text-blue-500 hover:underline dark:text-blue-500">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default DataSignup;
