import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import StartFirebase from '../firebase';

const db = StartFirebase();

const MetricCardsContainer = () => {
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
    
            setTableData(records);
        });
    }, []);
    
    return (
        <>
            {tableData.map((row, index) => (
                <React.Fragment key={index}>
                    {row.key === "COEng" && (
                        <div className="w-full md:w-1/2 p-6" key={index}>
                            {/* Metric Card */}
                            <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-8 ">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded-full p-5 bg-green-600">
                                            <i className="fa fa-microchip fa-2x fa-inverse"></i>
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center" >
                                        <h2 className="font-bold uppercase text-gray-600">College Of Engineering</h2>
                                        <p className="font-bold text-3xl">{row.data.points} points{/*<span className="text-green-500"><i className="fas fa-caret-up"></i></span>*/}</p>
                                    </div>
                                </div>
                            </div>
                            {/* /Metric Card */}
                        </div>
                    )}
                    
                    {row.key === "COE" && (
                        <div className="w-full md:w-1/2 p-6">
                            {/* Metric Card */}
                            <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-8 ">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded-full p-5 bg-pink-600">
                                            <i className="fas fa-book fa-2x fa-inverse"></i>
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h2 className="font-bold uppercase text-gray-600">College Of Education</h2>
                                        <p className="font-bold text-3xl">{row.data.points} points</p>
                                    </div>
                                </div>
                            </div>
                            {/* /Metric Card */}
                        </div>
                    )}
                    
                    {row.key === "COS" && (
                        <div className="w-full md:w-1/2 p-6">
                            {/* Metric Card */}
                            <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-8">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded-full p-5 bg-yellow-600">
                                            <i className="fas fa-flask fa-2x fa-inverse"></i>
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h2 className="font-bold uppercase text-gray-600">College Of Science</h2>
                                        <p className="font-bold text-3xl">{row.data.points} points</p>
                                    </div>
                                </div>
                            </div>
                            {/* /Metric Card */}
                        </div>
                    )}

                    {row.key === "CIT" && (
                        <div className="w-full md:w-1/2 p-6">
                            {/* Metric Card */}
                            <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-8">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded-full p-5 bg-indigo-600">
                                            <i className="fas fa-gears fa-2x fa-inverse"></i>
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h2 className="font-bold uppercase text-gray-600">College Of Industrial Technology</h2>
                                        <p className="font-bold text-3xl">{row.data.points} points</p>
                                    </div>
                                </div>
                            </div>
                            {/* /Metric Card */}
                        </div>
                    )}
                </React.Fragment>
            ))}
        </>
    );
};

export default MetricCardsContainer;
