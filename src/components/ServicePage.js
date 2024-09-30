// src/components/ServicePage.js
import React from 'react';

const ServicePage = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Service/Activity Update</h2>

      <div className="mb-4">
        <label className="block font-semibold">Add New Event:</label>
        <input type="text" className="border rounded p-2 w-full" placeholder="Short description" />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Upload File:</label>
        <input type="file" className="border rounded p-2 w-full" />
      </div>

      <div className="mb-4 flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">Edit</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">Add Another</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition">Upload</button>
      </div>

      {/* Add carousel for recent and existing content here */}
    </div>
  );
};

export default ServicePage;
