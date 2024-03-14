import React, { useState, useEffect } from 'react';
import { ref, get, set } from 'firebase/database';
import StartFirebase from '../firebase';

const db = StartFirebase();

const ACodeCardsContainer = () => {
    const [COEngCode, setCOEngCode] = useState('');
    const [COECode, setCOECode] = useState('');
    const [COSCode, setCOSCode] = useState('');
    const [CITCode, setCITCode] = useState('');
    const [randomNumbers, setRandomNumbers] = useState([0, 0, 0, 0]);

    useEffect(() => {
        // Fetch the initial codes from Firebase when the component mounts
        fetchCodesFromFirebase();
    }, []);

    const fetchCodesFromFirebase = () => {
        const dbRef = ref(db, 'Bottle');
        get(dbRef)
            .then((snapshot) => {
                const data = snapshot.val();
                setCOEngCode(data.COEng.code);
                setCOECode(data.COE.code);
                setCOSCode(data.COS.code);
                setCITCode(data.CIT.code);
            })
            .catch((error) => {
                console.error("Error retrieving data from Firebase:", error);
            });
    };

    const generateRandomCode = () => {
        const uniqueNumbers = [];
        while (uniqueNumbers.length < 4) {
            const randomNumber = Math.floor(Math.random() * 10);
            if (!uniqueNumbers.includes(randomNumber)) {
                uniqueNumbers.push(randomNumber);
            }
        }
        return uniqueNumbers.join('');
    };

    const generateRandomNumber = (codeKey) => {
        // Generate a new random code
        let newCode;
        do {
            newCode = generateRandomCode();
        } while (newCode === COEngCode || newCode === COECode || newCode === CITCode || newCode === COSCode);
    
        // Update the state with the new code based on the codeKey
        if (codeKey === 'COEng') {
            setCOEngCode(newCode);
        } else if (codeKey === 'COE') {
            setCOECode(newCode);
        } else if (codeKey === 'CIT') {
            setCITCode(newCode);
        } else if (codeKey === 'COS') {
            setCOSCode(newCode);
        }
    
        // Update the code in Firebase for the specified codeKey
        set(ref(db, `Bottle/${codeKey}/code`), newCode)
            .then(() => console.log(`${codeKey} code successfully updated in Firebase:`, newCode))
            .catch((error) => console.error(`Error updating ${codeKey} code in Firebase:`, error));
    };
    

    return (
        <>
            {/* COEng Code Section */}
            <div className="w-full md:w-5/12 p-4 md:p-6">
                <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-500 rounded-lg shadow-xl p-8 md:p-14">
                    <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-2 md:pr-4">
                            <div className="rounded-full p-3 md:p-5 bg-green-600">
                                <i className="fa fa-lock fa-2x fa-inverse"></i>
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-right">
                            <p className="font-medium text-lg md:text-2xl mb-2 md:mb-4 md:pr-4">COEng Code </p>
                            <p className="font-bold text-xl md:text-3xl md:pr-4">{COEngCode}</p> 
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-500 rounded-lg shadow-xl p-2 md:p-4 pl-4 md:pl-8 pr-4 md:pr-8 hover:brightness-75" onClick={() => generateRandomNumber('COEng')}>
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-2">
                                        <div className="rounded-full p-2 md:p-3 bg-yellow-600">
                                            <i className="fas fa-exchange-alt fa-lg fa-inverse"></i>
                                        </div>
                                    </div>
                                    <div className="flex-1 text-center md:text-right">
                                        <p className="font-bold text-lg md:text-2xl">Change Code </p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* COE Code Section */}
            <div className="w-full md:w-5/12 p-4 md:p-6">
                <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-8 md:p-14">
                    <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-2 md:pr-4">
                            <div className="rounded-full p-3 md:p-5 bg-blue-600">
                                <i className="fa fa-lock fa-2x fa-inverse"></i>
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-right">
                            <p className="font-medium text-lg md:text-2xl mb-2 md:mb-4 md:pr-4">COE Code </p>
                            <p className="font-bold text-xl md:text-3xl md:pr-4">{COECode}</p> 
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-500 rounded-lg shadow-xl p-2 md:p-4 pl-4 md:pl-8 pr-4 md:pr-8 hover:brightness-75" onClick={() => generateRandomNumber('COE')}>
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-2">
                                        <div className="rounded-full p-2 md:p-3 bg-yellow-600">
                                            <i className="fas fa-exchange-alt fa-lg fa-inverse"></i>
                                        </div>
                                    </div>
                                    <div className="flex-1 text-center md:text-right">
                                        <p className="font-bold text-lg md:text-2xl">Change Code </p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* COS Code Section */}
            <div className="w-full md:w-5/12 p-4 md:p-6">
                <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-8 md:p-14">
                    <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-2 md:pr-4">
                            <div className="rounded-full p-3 md:p-5 bg-pink-600">
                                <i className="fa fa-lock fa-2x fa-inverse"></i>
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-right">
                            <p className="font-medium text-lg md:text-2xl mb-2 md:mb-4 md:pr-4">COS Code </p>
                            <p className="font-bold text-xl md:text-3xl md:pr-4">{COSCode}</p> 
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-500 rounded-lg shadow-xl p-2 md:p-4 pl-4 md:pl-8 pr-4 md:pr-8 hover:brightness-75" onClick={() => generateRandomNumber('COS')}>
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-2">
                                        <div className="rounded-full p-2 md:p-3 bg-yellow-600">
                                            <i className="fas fa-exchange-alt fa-lg fa-inverse"></i>
                                        </div>
                                    </div>
                                    <div className="flex-1 text-center md:text-right">
                                        <p className="font-bold text-lg md:text-2xl">Change Code </p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* CIT Code Section */}
            <div className="w-full md:w-5/12 p-4 md:p-6">
                <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-8 md:p-14">
                    <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-2 md:pr-4">
                            <div className="rounded-full p-3 md:p-5 bg-indigo-600">
                                <i className="fa fa-lock fa-2x fa-inverse"></i>
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-right">
                            <p className="font-medium text-lg md:text-2xl mb-2 md:mb-4 md:pr-4">CIT Code </p>
                            <p className="font-bold text-xl md:text-3xl md:pr-4">{CITCode}</p> 
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-500 rounded-lg shadow-xl p-2 md:p-4 pl-4 md:pl-8 pr-4 md:pr-8 hover:brightness-75" onClick={() => generateRandomNumber('CIT')}>
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-2">
                                        <div className="rounded-full p-2 md:p-3 bg-yellow-600">
                                            <i className="fas fa-exchange-alt fa-lg fa-inverse"></i>
                                        </div>
                                    </div>
                                    <div className="flex-1 text-center md:text-right">
                                        <p className="font-bold text-lg md:text-2xl">Change Code </p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    );
};

export default ACodeCardsContainer;
