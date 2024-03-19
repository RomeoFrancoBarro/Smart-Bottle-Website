import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import StartFirebase from '../firebase';

const db = StartFirebase();

const TableCardsContainer = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const dbRef = ref(db, 'Bottle/History');
        
        onValue(dbRef, (snapshot) => {
            let records = [];
    
            snapshot.forEach((childSnapshot) => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                
                // Extract department name from data
                const departmentFromData = data.split(' - ')[0]; // Assuming the department name comes before " - "
                
                // Filter records based on department name
                const parent = localStorage.getItem('parent'); // Retrieve parent from localStorage
                const departmentName = getDepartmentName(parent);
                
                if (departmentFromData === departmentName) { 
                    records.push({ "key": keyName, "data": data }); 
                }
            
                
            });
            

            // Sort the records based on the date-time string (key)
            records.sort((a, b) => {
                // Extract date-time strings from keys
                const dateA = new Date(a.key.split('|')[1]);
                const dateB = new Date(b.key.split('|')[1]);
                // Compare dates
                return dateB - dateA;
            });
    
            setTableData(records);
        });
    }, []);

    
    const getDepartmentName = (data) => {
        switch(data.split('-')[0]) {
            case "Admin":
                return "Administrator";
            case "CIT":
                return "CIT";
            case "COE":
                return "COE";
            case "COEng":
                return "COEng";
            case "COS":
                return "COS";
            default:
                return null; // Return null for unknown department
        }
    };


    return (
        
                <div className="relative flex flex-col min-w-0 break-words w-full  shadow-lg rounded bg-gradient-to-b from-purple-200 to-purple-100  text-black">
                    
                    <div className="block w-full overflow-x-auto">
                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead className="text-xs text-white uppercase bg-purple-600">
                                <tr>
                                    <th className="px-3 align-middle border border-solid py-4 text-m uppercase border-l-0 border-r-0 whitespace-nowrap font-extrabold text-left "> </th>
                                    <th className="px-4 align-middle border border-solid py-4 text-m uppercase border-l-0 border-r-0 whitespace-nowrap font-extrabold text-left ">Input</th>
                                    <th className="px-4 align-middle border border-solid py-4 text-m uppercase border-l-0 border-r-0 whitespace-nowrap font-extrabold text-left ">Day</th>
                                    <th className="px-4 align-middle border border-solid py-4 text-m uppercase border-l-0 border-r-0 whitespace-nowrap font-extrabold text-left ">Date</th>
                                    <th className="px-4 align-middle border border-solid py-4 text-m uppercase border-l-0 border-r-0 whitespace-nowrap font-extrabold text-left ">Time</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tableData.map((item, index) => (
                                    <tr key={index} className='font-medium'>
                                        <td className="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {index + 1}
                                        </td>
                                        <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-extrabold">
                                            + {item.data.split(' - ')[1]} 
                                        </td>
                                        {/* Assuming your data format is "Day|Date|Time" */}
                                        <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {item.key.split('|')[0]}
                                        </td>
                                        <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {item.key.split('|')[1]}
                                        </td>
                                        <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {item.key.split('|')[2]}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            
    );
};

export default TableCardsContainer;


