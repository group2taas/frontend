'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getTicket } from '@/requests/ticket-actions';
import { Status } from '@/types/enums';
import { Tickets } from '@/types/mongo-documents';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TicketDetailPage = () => {
    const params = useParams();
    const id = params?.id ? params.id.toString() : null;
  const [ticket, setTicket] = useState<Tickets | null>(null);

  useEffect(() => {
    if (id) {
      getTicket(Number(id)).then((data) => {
        if (!data) {
          console.error("Ticket not found");
        }
        setTicket(data);
      });
    }
  }, [id]);

  if (!ticket) {
    return <p className="text-center mt-10">Loading ticket details...</p>;
  }

  if (ticket.status === Status.ESTIMATING_TESTS) {
    return <p className="text-center mt-10">Your ticket is under assessment, please hang tight.</p>;
  }

  if (ticket.status === Status.TESTING) {
    return <p className="text-center mt-10">The tests are being conducted, please come back in awhile.</p>;
  }

  if (ticket.status === Status.COMPLETED) {
    const data = [
      { name: 'Jan', value: 400 },
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 500 },
      { name: 'Apr', value: 700 },
    ];

    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Test Results Dashboard</h1>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-lg font-semibold">Download Report</p>
          <button className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Download PDF
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default TicketDetailPage;
