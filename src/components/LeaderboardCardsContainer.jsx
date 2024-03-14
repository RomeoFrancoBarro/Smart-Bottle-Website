import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import StartFirebase from '../firebase';

const db = StartFirebase();

const LeaderboardCardsContainer = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const dbRef = ref(db, 'Bottle');
        
        onValue(dbRef, (snapshot) => {
            let records = [];
    
            snapshot.forEach((childSnapshot) => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({ "key": keyName, "data": data });
            });

            // Sort the records based on data.points
            records.sort((a, b) => b.data.points - a.data.points);
    
            setTableData(records);
        });
    }, []);


    return (
        <>
        {tableData.map((row, index) => (
                <React.Fragment key={index}>

            {row.key === "COEng" && (
            <div className="w-full md:w-7/12 p-6">
                {/* Metric Card */}
                <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-10 ">
                    <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-4">
                            <div className="rounded-full p-5 pr-6 pl-6 bg-green-600">
                            <i className={`fas fa-${index} fa-2x fa-inverse`}></i>
                            </div>
                        </div>
                        
                        <div className="flex-1 text-center md:text-center">
                            <p className="font-bold text-3xl">College of Engineering </p>
                        </div>

                        <div className="flex-shrink pl-4">
                            <div className="rounded-full p-5 bg-green-600">
                                <i className="fa fa-microchip fa-2x fa-inverse"></i>
                            </div>
                        </div>
                    </div>
                </div>
             
            </div>
            )}


            {row.key === "COE" && (
            <div className="w-full md:w-7/12 p-6">
                {/* Metric Card */}
                <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-10 ">
                    <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-4">
                            <div className="rounded-full p-5 pr-6 pl-6 bg-pink-600">
                            <i className={`fas fa-${index} fa-2x fa-inverse`}></i>
                            </div>
                        </div>
              
                        <div className="flex-1 text-center md:text-center">
                            <p className="font-bold text-3xl">College of Education </p>
                        </div>

                        <div className="flex-shrink pl-4">
                            <div className="rounded-full p-5 bg-pink-600">
                                <i className="fas fa-book fa-2x fa-inverse"></i>
                            </div>
                        </div>
                    </div>
                </div>
             
            </div>
            )}

            
            
            {row.key === "COS" && (
            <div className="w-full md:w-7/12 p-6">
                {/* Metric Card */}
                <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-10">
                    <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-4">
                            <div className="rounded-full p-5 pr-6 pl-6 bg-yellow-600">
                            <i className={`fas fa-${index} fa-2x fa-inverse`}></i>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-center">
                            <p className="font-bold text-3xl">College of Science</p>
                        </div>

                        <div className="flex-shrink pl-4">
                            <div className="rounded-full p-5 bg-yellow-600">
                                <i className="fas fa-flask fa-2x fa-inverse"></i>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
            )}

            {row.key === "CIT" && (
            <div className="w-full md:w-7/12 p-6">
                {/* Metric Card */}
                <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-10">
                    <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-4">
                            <div className="rounded-full p-5 pr-6 pl-6 bg-indigo-600">
                            <i className={`fas fa-${index} fa-2x fa-inverse`}></i>
                            </div>
                        </div>
                        
                        <div className="flex-1 text-center md:text-center">
                            <p className="font-bold text-3xl">College Of Industrial Technology</p>
                        </div>

                        <div className="flex-shrink pl-4">
                            <div className="rounded-full p-5 bg-indigo-600">
                                <i className="fas fa-gears fa-2x fa-inverse"></i>
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
            )}

        </React.Fragment>
        ))}
        </>
        
    );
};

export default LeaderboardCardsContainer;
