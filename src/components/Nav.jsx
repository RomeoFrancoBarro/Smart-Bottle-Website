import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { get, child, ref } from 'firebase/database';
import customLogo from '../assets/logo.png'; 
import StartFirebase from '../firebase'; // Import your Firebase configuration
import { Link } from 'react-router-dom';


const db = StartFirebase(); // Initialize Firebase

const Nav = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [parent, setParentInfo] = useState(null); // State to hold the parent information

   

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const getParentInfo = async () => {
        try {
            const userCode = localStorage.getItem('user');
            if (userCode) {
                const snapshot = await get(child(ref(db), 'Bottle'));
                if (snapshot.exists()) {
                    let parent = null;
                    snapshot.forEach(childSnapshot => {
                        const bottleData = childSnapshot.val();
                        if (bottleData && bottleData.code === userCode) {
                            parent = { name: childSnapshot.key };
                        }
                    });
                    if (parent) {
                        console.log("Parent found:", parent);
                    } else {
                        console.log("No parent found for the user code:", userCode);
                    }
                    setParentInfo(parent);
                } else {
                    console.log("No data available in 'Bottle' node.");
                }
            } else {
                console.log("User code not found in localStorage.");
            }
        } catch (error) {
            console.log("Error fetching parent information:", error);
        }
    };

    useEffect(() => {
        getParentInfo(); // Fetch parent information when the component mounts
    }, []);

    const getDepartmentName = (parentName) => {
        switch(parentName) {
            case "Admin":
                return "Administrator";
            case "CIT":
                return "College of Industrial Technology";
            case "COE":
                return "College of Education";
            case "COEng":
                return "College of Engineering";
            case "COS":
                return "College of Science";
            default:
                return "Unknown Department";
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <nav aria-label="menu nav" className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
            <div className="flex flex-wrap items-center">
                <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
                    <a href="" className="flex items-center space-x-3 rtl:space-x-reverse pl-4">
                        <img src={customLogo} className="h-10" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">S.B.T</span>
                    </a>
                </div>

                <div className="flex flex-1 md:w-1/3 justify-center md:justify-end text-white px-2">
                    <span className="relative w-full"></span>
                </div>

                <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
                    <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                        <li className="flex-1 md:flex-none md:mr-3">
                            <div className="relative inline-block">
                                <button onClick={toggleDropdown} className="drop-button text-white py-2 px-2 flex items-center whitespace-nowrap">
                                    <span className="pr-2"><i className="fas fa-user pl-3 pr-2"></i></span>
                                    {parent ? getDepartmentName(parent.name) : "no department"}
                                    <svg className="h-3 fill-current inline ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </button>

                                <div id="myDropdown" className={`dropdownlist absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto ${dropdownVisible ? 'visible' : 'invisible'}`}>
                                    <div className="border border-gray-800"></div>
                                    
                                    <Link to="/" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block">
                                        <i className="fas fa-sign-out-alt fa-fw"></i> Log Out
                                    </Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
