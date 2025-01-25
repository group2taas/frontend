'use client';

import React from 'react';
import Navbar from '@/components/navbar';
import Ticket from '@/components/ticket';
import { useRouter } from 'next/navigation';
import { Status } from '@/types/enums';
import { Tickets, UserProfile } from '@/types/mongo-documents';
import { NextPage } from 'next';

const fakeTickets: Tickets[] = [
  { id: 1, title: 'Fix login bug', status: Status.COMPLETED, createdAt: new Date() },
  { id: 2, title: 'Implement dashboard', status: Status.TESTING, createdAt: new Date() },
  { id: 3, title: 'Add search functionality', status: Status.APPROVAL, createdAt: new Date() },
  { id: 4, title: 'Refactor codebase', status: Status.ESTIMATING_TESTS, createdAt: new Date() },
];

const MainPage: NextPage = () => {
  const router = useRouter();

  const handleCreateTicket = () => {
    router.push('/create-ticket');
  };

  const handleTicketClick = (id: number) => {
    router.push(`/tickets/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        userProfile={{
          name: 'John Doe',
          company_name: 'Acme Corp',
          email: 'Test@test.com',
          phone: '1231023',
        }}
      />
      <div className="flex mt-6">
        {/* Main Content */}
        <div className="w-4/5 p-4 overflow-y-auto">
          {fakeTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => handleTicketClick(ticket.id)}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            >
              <Ticket {...ticket} />
            </div>
          ))}
        </div>
        {/* Create Button */}
        <div className="w-1/5 flex flex-col items-center justify-start p-4">
          <button
            onClick={handleCreateTicket}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
