import React, { useState, useEffect } from 'react';
import { ref, get, set } from 'firebase/database';
import StartFirebase from '../firebase';

const db = StartFirebase();

const CodeCardsContainer = () => {
    const [randomNumbers, setRandomNumbers] = useState([0, 0, 0, 0]);
    const [loginCode, setLoginCode] = useState('');

    useEffect(() => {
        // Fetch the initial login code from local storage or generate random numbers
        const initialCode = localStorage.getItem('user') || generateRandomCode();
        setLoginCode(initialCode);
    }, []);

    const generateRandomCode = () => {
        const uniqueNumbers = [];
        while (uniqueNumbers.length < 4) {
            const randomNumber = Math.floor(Math.random() * 10);
            if (!uniqueNumbers.includes(randomNumber)) {
                uniqueNumbers.push(randomNumber);
            }
        }
        const code = uniqueNumbers.join('');
        localStorage.setItem('user', code);
        return code;
    };

    const generateRandomNumbers = () => {
        // Fetch the user code from local storage
        const userCode = localStorage.getItem('user');
        if (!userCode) {
            console.error("User code not found in local storage.");
            return;
        }
    
        // Fetch the data from Firebase
        const dbRef = ref(db, 'Bottle');
        get(dbRef)
            .then((snapshot) => {
                const data = snapshot.val();
                // Check if the user code matches any code in the Firebase data
                const matchingKey = Object.keys(data).find(key => data[key].code === userCode);
                if (matchingKey) {
                    // If the user code matches, generate a new random code
                    const newCode = generateRandomCode();
                    // Update the loginCode state
                    setLoginCode(newCode);
                    // Update only the loginCode in the Firebase database
                    const updatedData = { ...data[matchingKey], code: newCode };
                    set(ref(db, `Bottle/${matchingKey}/code`), newCode)
                        .then(() => {
                            console.log("Code successfully updated in Firebase:", newCode);
                        })
                        .catch((error) => {
                            console.error("Error updating Code in Firebase:", error);
                        });
                } else {
                    console.log("User code does not match any code in Firebase. Change aborted.");
                }
            })
            .catch((error) => {
                console.error("Error retrieving data from Firebase:", error);
            });
    };
    
    

    return (
        <>
            <div className="w-full md:w-9/12 p-6">
                {/* Metric Card */}
                <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-500 rounded-lg shadow-xl p-14">
                    <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-4">
                            <div className="rounded-full p-5 bg-green-600">
                                <i className="fa fa-lock fa-2x fa-inverse"></i>
                            </div>
                        </div>
                        <div className="flex-1 text-right md:text-center">
                            <p className="font-medium text-2xl mb-4">Login Code </p>
                            <p className="font-bold text-3xl">{loginCode}</p> {/* Display login code */}
                        </div>
                    </div>
                </div>
                {/* /Metric Card */}
            </div>

            <div className="w-full md:w-4/12 p-6">
                {/* Metric Card */}
                <div className="flex justify-center">
                    <button className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-4 pl-8 pr-8 hover:brightness-75" onClick={generateRandomNumbers}>
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded-full p-3 bg-pink-600">
                                    <i className="fas fa-exchange-alt fa-lg fa-inverse"></i>
                                </div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <p className="font-bold text-2xl">Change Code </p>
                            </div>
                        </div>
                    </button>
                </div>
                {/* /Metric Card */}
            </div>
        </>
    );
};

export default CodeCardsContainer;
