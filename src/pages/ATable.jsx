import React from 'react';
import { ref, onValue } from 'firebase/database';
import StartFirebase from '../firebase';

import customLogo from '../assets/logo.png';
import AdminTabs from '../components/AdminTabs';

const db = StartFirebase();

class ATable extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
      showTab: false, // Move state to class state
    };
  }

  componentDidMount() {
    const dbRef = ref(db, 'Admin');

    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyName, data: data });
      });
      this.setState({ tableData: records });
    });

    // Call the checkRequirements function when component mounts
    this.checkRequirements();
  }

  // Your function to determine whether to show the button or not
  checkRequirements = () => {
    // Replace this condition with your actual requirements
    const data = JSON.parse(localStorage.getItem('user'));

    // Change to your logic
    let isAdmin = true; // Change to your logic

    if (data.email === 'admin@gmail.com') {
      isAdmin = true;
    } else {
      isAdmin = false;
    }

    this.setState({ showTab: isAdmin });
  };

  render() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
      <div>
        <nav className="bg-gray-900 border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={customLogo} className="h-10" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">E.M.A</span>
            </a>

            <AdminTabs shouldRenderNewLink={this.state.showTab} trackerLink="/requests" />
          </div>
        </nav>

        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
          <h1 style={{ textShadow: '2px 2px 2px black' }} className="text-white text-xl font-semibold text-shadow-md">
            Welcome {user && user.email}
          </h1>
        </div>

        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
          <h1 style={{ textShadow: '2px 2px 2px black' }} className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">
            App <span className="underline underline-offset-3 decoration-8 decoration-blue-600 dark:decoration-blue-600">Requests</span>
          </h1>
        </div>

        <div className="flex lg:mt-10 md:mt-0 justify-center">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-400 dark:text-gray-400">
              <thead className="text-xs text-gray-400 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Section
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.tableData.map((row, index) => {
                  return (
                    <tr className="bg-gray-800 border-gray-700 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-600 dark:hover:bg-gray-600" key={index}>
                      <td className="px-6 py-4">{index + 1}</td>
                      <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                        {row.data.date}
                      </th>
                      <th className="px-6 py-4">{row.data.time}</th>
                      <th className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">{row.data.name}</th>
                      <th className="px-6 py-4">{row.data.section}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ATable;
