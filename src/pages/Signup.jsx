import React, { useState } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';




const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error("The user has already been registered.");
    }
  }




  return (
    <div>
    <nav className="bg-white border-gray-200 dark:bg-gray-900">

    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a
        href="https://flowbite.com/"
        className="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <img
          src={"https://flowbite.com/docs/images/logo.svg"}
          className="h-8"
          alt="Flowbite Logo"
        />
        
      </a>
    </div>
  
  
    
  </nav>
    

    <div className='flex justify-center mt-11' >
    
    
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">



  <form className="space-y-6 signup-form" action="#" onSubmit={handleSubmit}>
    <h5 className="flex justify-center text-xl font-medium text-gray-900 dark:text-white">
      Sign Up
    </h5>
    <div></div>

    <div>
      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="Full Name"
        required=""

        /*value={email}
        onChange={(e) => setEmail(e.target.value)}*/
      />
    </div>

    <div>
      <label
        htmlFor="section"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Section
      </label>
      <input
        type="text"
        name="section"
        id="section"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="Section"
        required=""

        /*value={email}
        onChange={(e) => setEmail(e.target.value)}*/
      />
    </div>
    
    






    <div>
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder="name@mail.com"
        required=""

        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div>
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
       Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        required=""

        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className="flex items-start">
      
      <a
        href="#"
        className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
      >
        
      </a>
    </div>
    <button
      type="submit"
      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 signup-button"
      
    >
     Create a new account
    </button>
    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
      Already registered?{" "}
      <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">
        Login
      </Link>
    </div>
  </form>
</div>
</div>
</div>
  )
}

export default Signup