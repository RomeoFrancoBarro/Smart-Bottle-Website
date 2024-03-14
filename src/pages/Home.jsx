import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

import Navbar from '../components/Nav';
import MetricCardsContainer from '../components/MetricCardsContainer';
import LeaderboardCardsContainer from '../components/LeaderboardCardsContainer';
import CodeCardsContainer from '../components/CodeCardsContainer';
import LevelCardsContainer from '../components/LevelCardsContainer';
import ACodeCardsContainer from '../components/ACodeCardsContainer';




const MyComponent = () => {
    
    const [showPointsSection, setShowPointsSection] = useState(true);
    const [showLeaderboardSection, setShowLeaderboardSection] = useState(false);
    const [showCodeSection, setShowCodeSection] = useState(false);
    const [showLevelSection, setShowLevelSection] = useState(false);
    const [showACodeSection, setShowACodeSection] = useState(false);

    const [localStorageUser, setLocalStorageUser] = useState('');

    const togglePointsSection = () => {
        setShowPointsSection(true);
        setShowLeaderboardSection(false);
        setShowCodeSection(false);
        setShowLevelSection(false);
        setShowACodeSection(false);
    };

    const toggleLeaderboardSection = () => {
        setShowPointsSection(false);
        setShowLeaderboardSection(true);
        setShowCodeSection(false);
        setShowLevelSection(false);
        setShowACodeSection(false);
    };

    const toggleCodeSection = () => {
      setShowPointsSection(false);
      setShowLeaderboardSection(false);
      setShowCodeSection(true);
      setShowLevelSection(false);
      setShowACodeSection(false);
    };

    const toggleLevelSection = () => {
      setShowPointsSection(false);
      setShowLeaderboardSection(false);
      setShowCodeSection(false);
      setShowLevelSection(true);
      setShowACodeSection(false);
    };

    const toggleACodeSection = () => {
        setShowPointsSection(false);
        setShowLeaderboardSection(false);
        setShowCodeSection(false);
        setShowLevelSection(false);
        setShowACodeSection(true);
    };

    useEffect(() => {
        // Retrieve user from localStorage
        const user = localStorage.getItem('user');
        setLocalStorageUser(user);
    }, []);

      

    

    return (
        <div className="bg-gray-800 font-sans leading-normal tracking-normal mt-12">
            <header>
                <Navbar/>
            </header>
            <main>
            <div className="flex flex-col md:flex-row">
                <nav aria-label="alternative nav">
                    <div className="bg-gray-800 shadow-xl h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center">
                        <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
                            <ul className="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">

                                
                                    <li className={`mr-3 flex-1 ${showPointsSection ? 'active' : ''}`}> 
                                        <a href="#" onClick={togglePointsSection} className={`block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-blue-600 border-b-2 ${showPointsSection ? 'border-blue-600 text-blue-600' : 'border-gray-800 hover:border-blue-600 text-gray-400 md:text-gray-200'}`}>
                                            <i className="fas fa-star pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Points</span>
                                        </a>
                                    </li>
                                
                                    <li className={`mr-3 flex-1 ${showLeaderboardSection ? 'active' : ''}`}> 
                                        <a href="#" onClick={toggleLeaderboardSection} className={`block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-red-600 border-b-2 ${showLeaderboardSection ? 'border-red-500 text-red-500' : 'border-gray-800 hover:border-red-500 text-gray-400 md:text-gray-200'}`}>
                                            <i className="fa fa-trophy pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Leaderboards</span>
                                        </a>
                                    </li>
                               
                                {localStorageUser !== '98765' && (
                                    <li className={`mr-3 flex-1 ${showCodeSection ? 'active' : ''}`}> 
                                        <a href="#" onClick={toggleCodeSection} className={`block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-pink-500 border-b-2 ${showCodeSection ? 'border-pink-500 text-pink-500' : 'border-gray-800 hover:border-pink-500 text-gray-400 md:text-gray-200'}`}>
                                            <i className="fa fa-code pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Code</span>
                                        </a>
                                    </li>
                                )}
                                {localStorageUser === '98765' && (
                                    <li className={`mr-3 flex-1 ${showLevelSection ? 'active' : ''}`}> 
                                        <a href="#" onClick={toggleLevelSection} className={`block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-purple-500 border-b-2 ${showLevelSection ? 'border-purple-500 text-purple-500' : 'border-gray-800 hover:border-purple-500 text-gray-400 md:text-gray-200'}`}>
                                            <i className="fa fa-trash pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Level</span>
                                        </a>
                                    </li>
                                )}
                                {localStorageUser === '98765' && (
                                    <li className={`mr-3 flex-1 ${showACodeSection ? 'active' : ''}`}>
                                        <a href="#" onClick={toggleACodeSection} className={`block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-yellow-600 border-b-2 ${showACodeSection ? 'border-yellow-600 text-yellow-600' : 'border-gray-800 hover:border-yellow-600 text-gray-400 md:text-gray-200'}`}>
                                            <i className="fa fa-code pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Admin Codes</span>
                                        </a>
                                    </li>
                                )}

                            </ul>
                        </div>
                    </div>
                </nav>
                <section className='md:w-full'>
                        {/* Section for Points */}
                        {showPointsSection && (
                            <div id="pointsSection" className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
                                {/* Your Points Section Content */}
                                <div className="bg-gray-800 pt-3">
                                    <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white ">
                                        <h1 className="font-bold pl-2">Points</h1>
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-center">
                                    {/* Metric Cards */}
                                    <MetricCardsContainer />
                                </div>
                            </div>
                        )}
                        {/* Section for Leaderboards */}
                        {showLeaderboardSection && (
                            <div id="leaderboardSection" className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
                                {/* Your Leaderboards Section Content */}
                                <div className="bg-gray-800 pt-3">
                                    <div className="rounded-tl-3xl bg-gradient-to-r from-red-700 to-gray-800 p-4 shadow text-2xl text-white ">
                                        <h1 className="font-bold pl-2">Leaderboards</h1>
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-center">
                                    {/* Metric Cards */}
                                    <LeaderboardCardsContainer /> 
                                </div>
                            </div>
                        )}
                        {/* Section for Leaderboards */}
                        {showCodeSection && (
                            <div id="leaderboardSection" className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
                                {/* Your Leaderboards Section Content */}
                                <div className="bg-gray-800 pt-3">
                                    <div className="rounded-tl-3xl bg-gradient-to-r from-pink-700 to-gray-800 p-4 shadow text-2xl text-white ">
                                        <h1 className="font-bold pl-2">Login Code</h1>
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-center">
                                    {/* Metric Cards */}
                                    <CodeCardsContainer /> 
                                </div>
                            </div>
                        )}
                        {showLevelSection && (
                            <div id="leaderboardSection" className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
                                {/* Your Leaderboards Section Content */}
                                <div className="bg-gray-800 pt-3">
                                    <div className="rounded-tl-3xl bg-gradient-to-r from-purple-500 to-gray-800 p-4 shadow text-2xl text-white ">
                                        <h1 className="font-bold pl-2">Trashcan Level</h1>
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-center">
                                    {/* Metric Cards */}
                                    <LevelCardsContainer /> 
                                </div>
                            </div>
                        )}
                        {showACodeSection && (
                            <div id="leaderboardSection" className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
                                {/* Your Leaderboards Section Content */}
                                <div className="bg-gray-800 pt-3">
                                    <div className="rounded-tl-3xl bg-gradient-to-r from-purple-500 to-gray-800 p-4 shadow text-2xl text-white ">
                                        <h1 className="font-bold pl-2">Admin Login Codes</h1>
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-center">
                                    {/* Metric Cards */}
                                    <ACodeCardsContainer /> 
                                </div>
                            </div>
                        )}
                </section>
            </div>
        </main>
            {/* Scripts */}
            <script>
                {/* Your Chart.js scripts here */}
            </script>
        </div>
    );
};

export default MyComponent;
