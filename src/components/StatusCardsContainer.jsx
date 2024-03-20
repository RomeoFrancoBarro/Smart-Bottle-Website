import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import StartFirebase from '../firebase';

const db = StartFirebase();

const StatusCardsContainer = () => {
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
                    {row.key === "Status" && (
                        <div className="w-full md:w-1/2 p-6 pb-64 md:pb-44" key={index}>
                            {/* Metric Card */}
                            <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5 px-8">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded-full p-4 bg-green-600">
                                            
                                                <i className="fas fa-signal fa-2x fa-inverse"></i>
                                            
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center" >
                                        
                                        <p className="font-bold text-2xl">{row.data}</p>
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

export default StatusCardsContainer;
