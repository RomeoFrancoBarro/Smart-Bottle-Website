import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import StartFirebase from '../firebase';

const db = StartFirebase();

const LevelCardsContainer = () => {
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
                    {row.key === "Level" && (
                        <div className="w-full md:w-1/2 p-6" key={index}>
                            {/* Metric Card */}
                            <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-8 ">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded-full p-5 bg-green-600">
                                            {row.data.plastic !== 100 ? (
                                                <i className="fas fa-battery-full fa-2x fa-inverse"></i>
                                            ) : (
                                                <i className="fas fa-battery-half fa-2x fa-inverse"></i>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center" >
                                        <h2 className="font-bold uppercase text-gray-600">Plastic Bottle Container</h2>
                                        <p className="font-bold text-3xl">{row.data.plastic}%{/*<span className="text-green-500"><i className="fas fa-caret-up"></i></span>*/}</p>
                                    </div>
                                </div>
                            </div>
                            {/* /Metric Card */}
                        </div>
                    )}
                    
                    {row.key === "Level" && (
                        <div className="w-full md:w-1/2 p-6">
                            {/* Metric Card */}
                            <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-8 ">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded-full p-5 bg-pink-600">
                                            {row.data.unknown !== 100 ? (
                                                <i className="fas fa-battery-full fa-2x fa-inverse"></i>
                                            ) : (
                                                <i className="fas fa-battery-half fa-2x fa-inverse"></i>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h2 className="font-bold uppercase text-gray-600">Unknown Container</h2>
                                        <p className="font-bold text-3xl">{row.data.unknown}%</p>
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

export default LevelCardsContainer;
