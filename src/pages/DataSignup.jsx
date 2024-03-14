import React, { Component } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import StartFirebase from '../firebase';
import { ref, set } from 'firebase/database';
import customLogo from '../assets/logo.png'; 

class DataSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      date: '',
        time: '',
        email: '',
        name: '',
        section: '',
        
        
    };

    

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSectionChange = this.handleSectionChange.bind(this);

    

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  
  handleSectionChange(e) {
    this.setState({ section: e.target.value });
  }

  





  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem('token', user.accessToken);
          localStorage.setItem('user', JSON.stringify(user));

          // Additional logic for handling data insertion to the database
          const db = StartFirebase();
          const data = {
            email: this.state.email,
            date: this.state.date,
            time: this.state.time,
            name: this.state.name,
            section: this.state.section,
          };

          const userDataString = JSON.stringify(data);
          
          set(ref(db, 'Users/' + userDataString.email), 
          data);

          
        })  
        .then(()=>{alert('User was registered successfully')})
        .catch((error)=>{
          //alert('There was an error, details: '+error)
          alert('The user has already been registered')
        })
        ;
        
    } catch (error) {
        //alert('There was an error, details: '+error);
        alert('The user has already been registered');
    }
  }

  render() {
    const { email, password, name, section} = this.state;

    return (

        <div>
          <nav className="bg-white border-gray-200 dark:bg-gray-900">

        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href=" "
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={customLogo}
              className="h-10"
              alt="Logo"
            />
            
          </a>
        </div>
      
      
      
          
        
      </nav>


      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
  
  <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-400">Earthquake Monitoring</span> App.</h1>

</div>

    
  
  
  
      
    
  

















        <div className='flex justify-center mt-11' >
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

      
      
        <form className="space-y-6 signup-form" action="#" onSubmit={this.handleSubmit}>
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
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Full Name"
            required=""
            value={name}
            onChange={(e) => this.handleNameChange(e)}
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
            value={section}
            onChange={(e) => this.handleSectionChange(e)}
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
            onChange={(e) => this.handleEmailChange(e)}
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
            onChange={(e) => this.handlePasswordChange(e)}
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
      Already have an account?{" "}
      <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">
        Login
      </Link>
    </div>
        </form>
      </div>
      </div>
      </div>
    );
  }
}

export default DataSignup;
