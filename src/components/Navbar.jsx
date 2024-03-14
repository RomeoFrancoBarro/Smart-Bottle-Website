import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">

  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a
      href="https://flowbite.com/"
      className="flex items-center space-x-3 rtl:space-x-reverse"
    >
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="h-8"
        alt="Flowbite Logo"
      />
     
    </a>
    <h1 className='text-white'>Welcome to React Firebase Auth using email and password {user && user.email}</h1>
      



    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      
        <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleLogout}
      >
        Logout
      </button>
      
      
    </div>





    <div
      className="items-center justify-between  w-full md:flex md:w-auto md:order-1"
      id="navbar-cta"
    >
      <ul className="flex flex-row font-medium justify-around p-2 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
          <Link
            to="/"
            className="flexbox py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 d:dark:hover:text-blue-500 dark:text-white dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/tracker"
            className="flexbox py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 d:dark:hover:text-blue-500 dark:text-white dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Tracker
          </Link>
        </li>
        
        
      </ul>
    </div>
  </div>
  
  
</nav>



  );
}

export default Navbar;
