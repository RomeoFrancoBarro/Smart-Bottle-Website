
import React, { useState, useEffect } from 'react';
import FloorPlan from '../assets/Sample_Floorplan.jpg'
import { ref, set, get } from "firebase/database";
import StartFirebase from '../firebase';

import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import customLogo from '../assets/logo.png'; 

import AdminTabs from '../components/AdminTabs'; 

const Home2 = () => {

    const [db, setDb] = useState(null);

    const [showButton, setShowButton] = useState(false);
    const [showTab, setShowTab] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    

    useEffect(() => {
        setDb(StartFirebase());
    }, []);

    const insertData = () => {
        
        const data = JSON.parse(localStorage.getItem('user'));

        const encodedEmail  = data.email.replace('.', ',');

        if (data) {

            get(ref(db, 'Users/' + encodedEmail))
        .then((snapshot) => {
            if (snapshot.exists()) {
            const userData = snapshot.val();
            //alert(`Data: ${JSON.stringify(userData)}`);
            

            const currentDateAndTime = new Date();
            //const formattedDateTime = currentDateAndTime.toLocaleString(); // Adjust the format as needed
            //const formattedDate = currentDateAndTime.toLocaleDateString(); // Adjust the format as needed
            //const formattedTime = currentDateAndTime.toLocaleTimeString(); // Adjust the format as needed
            
            const dateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
            const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
            
            const formattedDate = dateFormatter.format(currentDateAndTime);
            const formattedTime = timeFormatter.format(currentDateAndTime);

            const formattedDateWithoutSlashes = formattedDate.split('/').join('');

            /*if (encodedEmail === userData.email) {

                set(ref(db, 'Admin/' + formattedDate), {
                    name: userData.name,
                    section: userData.section,
                    time: formattedTime
                    })
                    .then(() => { alert('Request has been sent.') })
                    .catch((error) => { alert('There was an error 2, details: ' + error)});
            }*/
            set(ref(db, 'Admin/' + formattedDateWithoutSlashes + formattedTime), {
                name: userData.name,
                
                section: userData.section,
                date: formattedDate,
                time: formattedTime
                })
              .then(() => { /*alert('Request has been sent.') */})
                .catch((error) => { alert('There was an error 2, details: ' + error) });


            

            } else {
            alert('Data not found');

            }
        })
        .catch((error) => { alert('There was an error, details: ' + error) });

        }

        // Show the popup
        setShowPopup(true);

        // Hide the button after a few seconds
        setTimeout(() => {
          
          setShowPopup(false);
        }, 3000); // Adjust the time as needed (3000 milliseconds = 3 seconds)
    }

    







      const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }




  const getTrackerLink = () => {
    // Your condition goes here
    const data = JSON.parse(localStorage.getItem('user'));
    

    let shouldUseAlternateLink = false;

    if (data.email === "romeofrancobarro@gmail.com") {
        shouldUseAlternateLink = true;
    } else {

        shouldUseAlternateLink = false;
    
    }

    // Return the appropriate link based on the condition
    return shouldUseAlternateLink ? '/tracker' : '/requests';

  };




  // Your function to determine whether to show the button or not
  const checkRequirements = () => {



    // Replace this condition with your actual requirements
    const data = JSON.parse(localStorage.getItem('user'));
    
    let requirementsMet = true; // Change to your logic
    let isAdmin = true; // Change to your logic

    if (data.email === "admin@gmail.com") {
        requirementsMet = false;
        isAdmin = true;
    } else {

        requirementsMet = true;
        isAdmin = false;
    
    }

    

    setShowButton(requirementsMet);
    setShowTab(isAdmin);
  };


  // Call the function to check requirements when the component mounts
  React.useEffect(() => {
    checkRequirements();
  }, []); // Empty dependency array ensures it only runs once when the component mounts








  const trackerLink = getTrackerLink();

  return (
    



    


    <div >

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
  
    



  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    
      <button
      type="button"
      className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={handleLogout}
    >
      Logout
    </button>
    
    
  </div>





  <AdminTabs shouldRenderNewLink={showTab} trackerLink={trackerLink} />



</div>


</nav>

<div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
  <h1 style={{ textShadow: '2px 2px 2px black' }} className="text-white text-xl font-semibold text-shadow-md">Welcome {user && user.email}</h1>
</div>
    




    <div className='flex justify-center'>
    <div className='flexbox mt-10 justify-center '>
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 sm:w-12/12 lg:w-6/12 mx-auto">
            <a href="#">
                <img className="rounded-t-lg " src={FloorPlan} alt="" />
                
            </a>
            
  
          <div className="p-5 " >
              <a href="#">
                  <h5 className=" flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
                      URS EARTS Floor Plan
                  </h5>
              </a>
      
              
          </div>
        
        </div>



    <div>
      {showButton && (
        <div className='m-10 flex justify-center'>
          <button
            type="button"
            className="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={insertData}
          >
            <svg
              className="w-6 h-6 text-white me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
            <path d="M15.133 10.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175ZM4 4a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 4 4ZM2 8H1a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 16 4Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z"/>
            </svg>
            Help Me!!
          </button>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-900 hover:bg-gray-800 border border-black p-8 rounded-lg shadow-lg">
            <p className="text-white text-lg font-semibold mb-4">Request has been sent.</p>
          </div>
        </div>
      )}

    </div>


</div>
</div>
</div>

  )
}

export default Home2