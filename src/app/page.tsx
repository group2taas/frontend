'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Ticket from '@/components/ticket';
import { useRouter } from 'next/navigation';
import { Status } from '@/types/enums';
import { Tickets, UserProfile } from '@/types/mongo-documents';
import { NextPage } from 'next';
import { fetchTickets } from '@/requests/ticket-actions';

const MainPage: NextPage = () => {
  const router = useRouter();
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data);
      } catch (error) {
        console.error('Error loading tickets:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTickets();
  }, []);

  const handleCreateTicket = () => {
    router.push('/create-ticket');
  };

  const handleTicketClick = (id: number) => {
    router.push(`/tickets/${id}`);
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-100">Loading tickets...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex mt-6">
        {/* Main Content */}
        <div className="w-4/5 p-4 overflow-y-auto">
          {tickets.map((ticket) => (
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
