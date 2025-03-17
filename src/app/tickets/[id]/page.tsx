'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getTicket } from '@/requests/ticket-actions';
import { Status } from '@/types/enums';
import { Tickets, ResultLog, Results } from '@/types/mongo-documents';
import { getResult } from '@/requests/result-actions'; 
import useWebSocket from '@/hooks/websocket';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import Navbar from '@/components/navbar';

const TestingLogsSimple = ({ ticketId }: { ticketId: string }) => {
  const { messages } = useWebSocket(ticketId);
  const [results, setResults] = useState<ResultLog[]>([]);

  useEffect(() => {
    const fetchInitialLogs = async () => {
      try {
        const result = await getResult(Number(ticketId));
        const logs: ResultLog[] = result.logs.map((log) => ({
          target_url: log.target_url,
          security_alerts: log.security_alerts,
          test_case: log.test_case,
          result: log.result
        }));
        setResults(logs);
      } catch (error) {
        console.error('Error fetching logs', error);
      }
    };

    fetchInitialLogs();
  }, [ticketId]);

  useEffect(() => {
    if (messages.length > 0) {
      const message = messages[messages.length - 1];
      try {
        const log = JSON.parse(message);
        if (log.result && log.test_case) {
          setResults((prev) => [
            ...prev,
            {
              target_url: log.target_url,
              security_alerts: log.security_alerts,
              test_case: log.test_case,
              result: log.result
            }
          ]);
        }
      } catch (error) {
        console.error('Error parsing log from websocket', error);
      }
    }
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Test Logs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Test Case</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Result</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Target URL</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Security Alerts</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.length === 0 ? (
              <tr>
                <td className="px-4 py-2 text-sm text-gray-500" colSpan={4}>No logs available</td>
              </tr>
            ) : (
              results.map((entry, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-sm text-gray-900">{entry.test_case}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{entry.result}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{entry.target_url}</td>
                  {/* <td className="px-4 py-2 text-sm text-gray-900">{entry.security_alerts}</td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TestingDashboard = ({ ticketId }: { ticketId: string }) => {
  const [result, setResult] = useState<Results | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const resultData = await getResult(Number(ticketId));
        setResult(resultData);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };
    fetchResults();
  }, [ticketId]);

  if (!result) {
    return <div className="text-center p-8 text-gray-700">Loading test results...</div>;
  }

  const failed = result.logs.filter(
    (entry) => entry.result?.toLowerCase() !== 'passed'
  );

  const passed = result.logs.filter(
    (entry) => entry.result?.toLowerCase() === 'passed'
  );

  const summaryData = [
    { name: 'High', value: result.security_alerts.High || 0 },
    { name: 'Medium', value: result.security_alerts.Medium || 0 },
    { name: 'Low', value: result.security_alerts.Low || 0 },
    { name: 'Informational', value: result.security_alerts.Informational || 0 }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-6 bg-white p-6 shadow-md rounded-lg">
      <div className="border border-gray-300 rounded p-4 text-center bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800">
          Ticket ID: {result.ticket_id}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-gray-300 rounded p-4 text-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Title</h2>
          <p className="mt-2 text-gray-700">{result.title}</p>
        </div>

        <div className="border border-gray-300 rounded p-4 text-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Created at</h2>
          <p className="mt-2 text-gray-700">{formatDate(result.created_at)}</p>
        </div>

        <div className="border border-gray-300 rounded p-4 text-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">NumTests</h2>
          <p className="mt-2 text-gray-700">{result.num_tests}</p>
        </div>
      </div>

      {/* Dashboard */}
      <div className="border border-gray-300 rounded p-6 bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4 text-gray-700">
              <h3 className="font-bold mb-2 text-gray-800">Security Alerts</h3>
              <p>
                <span className="font-medium">High:</span>{' '}
                {result.security_alerts.High || 0}
              </p>
              <p>
                <span className="font-medium">Medium:</span>{' '}
                {result.security_alerts.Medium || 0}
              </p>
              <p>
                <span className="font-medium">Low:</span>{' '}
                {result.security_alerts.Low || 0}
              </p>
              <p>
                <span className="font-medium">Informational:</span>{' '}
                {result.security_alerts.Informational || 0}
              </p>
            </div>

            <div className="text-gray-700">
              <h3 className="font-bold mb-2 text-gray-800">Test Results</h3>
              <p>
                <span className="font-medium">Total Tests:</span>{' '}
                {passed.length + failed.length}
              </p>
              <p>
                <span className="font-medium text-green-600">Passed:</span>{' '}
                {passed.length}
              </p>
              <p>
                <span className="font-medium text-red-600">Failed:</span>{' '}
                {failed.length}
              </p>
              <p>
                <span className="font-medium">Progress:</span>{' '}
                {result.progress} / {result.num_tests}
              </p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={summaryData}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded p-4 bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Embedded PDF</h2>
        {result.pdf ? (
          <div className="w-full h-96">
            <iframe
              src={`${result.pdf}#view=FitH`}
              className="w-full h-full border-0"
              title="Test Results PDF"
            />
          </div>
        ) : (
          <p className="text-center py-8 text-gray-600">No PDF available</p>
        )}
      </div>

      {result.pdf && (
        <div className="border-2 border-blue-500 rounded text-center p-4 bg-gray-50">
          <a
            href={result.pdf}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF Report
          </a>
        </div>
      )}
    </div>
  );
};

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

  const { ticket: wsTicket } = useWebSocket(id);
  const currTicket = wsTicket || ticket;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {!currTicket && (
        <p className="text-center mt-10 text-gray-800">Loading ticket details...</p>
      )}
      {currTicket && currTicket.status === Status.ESTIMATING_TESTS && (
        <p className="text-center mt-10 text-gray-800">
          Your ticket is under assessment, please hang tight.
        </p>
      )}
      {currTicket && currTicket.status === Status.ERROR && (
        <p className="text-center mt-10 text-gray-800">
          Your tests have ran into an error, please contact us for further clarification.
        </p>
      )}
      {currTicket && currTicket.status === Status.TESTING && (
        <TestingLogsSimple ticketId={currTicket.id.toString()} />
      )}
      {currTicket && currTicket.status === Status.COMPLETED && (
        <TestingDashboard ticketId={currTicket.id.toString()} />
      )}
    </div>
  );
};

export default TicketDetailPage;
