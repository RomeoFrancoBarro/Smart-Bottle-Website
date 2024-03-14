import React from 'react';
import { Link } from 'react-router-dom';

const AdminTabs = ({ shouldRenderNewLink, trackerLink }) => {
  return (
    <div
      className="items-center justify-between w-full md:flex md:w-auto md:order-1"
      id="navbar-cta"
    >
      <ul className="flex flex-row font-medium justify-around p-2 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-gray-800 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <Link
            to="/home"
            className="flexbox py-2 px-3 md:p-0 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-700 d:dark:hover:text-blue-500 dark:text-white dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/tracker"
            className="flexbox py-2 px-3 md:p-0 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-700 d:dark:hover:text-blue-500 dark:text-white dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Tracker
          </Link>
        </li>
        
        {shouldRenderNewLink && (
          <li>
            <Link
              to={trackerLink}
              className="flexbox py-2 px-3 md:p-0 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-700 d:dark:hover:text-blue-500 dark:text-white dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Requests
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default AdminTabs;
