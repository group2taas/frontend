'use client';

import React from 'react';
import { Tickets } from '../types/mongo-documents';
import { Status } from '@/types/enums';
import { NextPage } from 'next';

const Ticket: NextPage<Tickets> = ({ id, title, status, createdAt }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-4/5 mx-auto border border-gray-300">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            status === Status.COMPLETED
              ? 'bg-green-100 text-green-700'
              : status === Status.TESTING
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {status}
        </span>
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Ticket ID: {id}</span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default Ticket;
