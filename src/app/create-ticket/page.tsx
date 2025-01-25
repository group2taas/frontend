'use client';

import React from 'react';
import Navbar from '@/components/navbar';
import { NextPage } from 'next';

const CreateTicket: NextPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Ticket created successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar userProfile={{ name: 'John Doe', company_name: 'Acme Corp', phone: '123012', email: 'wea@a.com' }} />
      <div className="flex justify-center items-center flex-grow">
        <div className="w-4/5 max-w-3xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create Ticket</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Text Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter ticket title"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Yes/No Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Is it urgent?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="urgent" value="yes" className="mr-2" />
                  Yes
                </label>
                <label className="flex items-center">
                  <input type="radio" name="urgent" value="no" className="mr-2" />
                  No
                </label>
              </div>
            </div>

            {/* Dropdown */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">
                Upload File
              </label>
              <input
                type="file"
                id="attachment"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
