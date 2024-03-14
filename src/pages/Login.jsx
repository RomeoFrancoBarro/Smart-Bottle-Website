import React, { useState, useEffect } from 'react';
import { ref, get, child } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import StartFirebase from '../firebase';

import customLogo from '../assets/logo.png';

const db = StartFirebase();

const Login = () => {
  const [code, setCode] = useState('');
  const [showErrorToast, setShowErrorToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showErrorToast) {
      const timeoutId = setTimeout(() => {
        setShowErrorToast(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [showErrorToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch data from Firebase and check if the entered code matches any code in the database
      const snapshot = await get(child(ref(db), 'Bottle'));
      if (snapshot.exists()) {
        let isValidCode = false;
        snapshot.forEach((childSnapshot) => {
          const bottle = childSnapshot.val();
          if (bottle.code === code) {
            isValidCode = true;
            localStorage.setItem('token', code);
            localStorage.setItem('user', code);
            console.log('Token:', localStorage.getItem('token')); // Log token
            console.log('User:', localStorage.getItem('user')); // Log user
            navigate('/home');
          }
        });
        if (!isValidCode) {
          setShowErrorToast(true);
          console.log(code);
        }
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
      setShowErrorToast(true);
      
    }
  };

  return (
    <div>
      <header>
        <nav aria-label="menu nav" className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
          <div className="flex flex-wrap items-center">
            <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
              <a href="" className="flex items-center space-x-3 rtl:space-x-reverse pl-4">
                <img src={customLogo} className="h-10" alt="Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">S.B.T</span>
              </a>
            </div>

            <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
              <span className="relative w-full"></span>
            </div>
            <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end"></div>
          </div>
        </nav>
      </header>
      {showErrorToast && (
          <div className="absolute inset-x-0 top-14 flex justify-center"> {/* Positioned toast at the bottom */}
            <div id="toast-warning" className="flex items-center max-w-xs p-4 rounded-lg shadow text-gray-400 bg-gray-800" role="alert">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-red-700 dark:text-red-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                </svg>
                <span className="sr-only">Error icon</span>
              </div>
              <div className="ms-3 text-sm font-normal">Invalid login code.</div>
            </div>
          </div>
        )}

      <div className="relative mt-40"> {/* Adjusted margin-top to move below navbar */}
        <div className="flex justify-center font-sans leading-normal tracking-normal">
          <div className="w-full max-w-sm p-4 bg-gray-800 border border-gray-700 rounded-lg shadow sm:p-6 md:p-8">
            <form className="space-y-6 signup-form mt-4 mb-10" onSubmit={handleSubmit}>
              <h5 className="flex justify-center text-xl font-medium text-white">Login</h5>
              <div>
                <label htmlFor="code" className="block mb-2 text-sm font-medium text-white">Code</label>
                <input
                type="text"
                name="code"
                id="code"
                className="bg-gray-600 border border-gray-500 text-sm placeholder-gray-400 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter code"
                value={code}
                maxLength={5} // Increased maxLength to 5 to allow for "98765"
                onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                    if (numericValue === '98765' && numericValue.length === 5) {
                    setCode(numericValue); // Set the state to "98765" if entered completely
                    
                    } else {
                    setCode(numericValue.slice(0, 4)); // Update the state with only the first 4 characters otherwise
                    
                    }
                }}
                />

              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  signup-button"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Login;
