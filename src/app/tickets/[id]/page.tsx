'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getTicket } from '@/requests/ticket-actions';
import { Status } from '@/types/enums';
import { Tickets } from '@/types/mongo-documents';
import { ResultLog } from '@/types/mongo-documents';
import { SecurityAlerts } from '@/types/mongo-documents';
import { getResult } from '@/requests/result-actions'; 
import useWebSocket from '@/hooks/websocket';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';


const TestingLogs = ({ ticketId }: { ticketId: string }) => {
  const { status: wsStatus, messages } = useWebSocket(ticketId);
  const [results, setResults] = useState< ResultLog[] >([]);
  const [progress, setProgress] = useState< number >(0);

  //fetch the progress of the ticket from api call
  const fetchProgress = async () => {
    try {
      const result = await getResult(Number(ticketId));
      setProgress(result.progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  //initial loading of page will load based on api call
  useEffect(() => {
    const fetchInitialLogs = async () => {
      try {
        const result = await getResult(Number(ticketId));
        
        const logs: ResultLog[] = result.logs.map((log) => 
          ({
            target_url: log.target_url,
            security_alerts: log.security_alerts,
            test_case: log.test_case,
            result: log.result
          })
        )

        setResults(logs)
        setProgress(result.progress)
    } catch (error) {
      console.error("Error fetching logs", error)
    }
  };

    fetchInitialLogs(); 
  }, [ticketId]);

  //check for new messages going through the websocket, will update the page in real time
  useEffect(() => {
    if (messages.length > 0) {
      const message = messages[messages.length - 1];
      console.log("Message received:", message);
      try {
        const log = JSON.parse(message);
        if (log.result && log.test_case) {
          setResults((prev) => [...prev, {target_url: log.target_url, security_alerts: log.security_alerts, test_case: log.test_case, result: log.result}]);

        }

        fetchProgress();
      } catch (error) {
        console.error("Error parsing log from websocket", error);
      }
    }
  }, [messages]);

  const failed = results.filter(
    (entry, index) => entry.result?.toLowerCase() !== 'passed'
  );

  const passed = results.filter(
    (entry, index) => entry.result?.toLowerCase() === 'passed'
  );

  return (
  <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Real-Time Test Logs</h1>
      <h2 className ="text-xl font-bold mb-4 text-center">Test Progress: {progress} </h2>
      <div className="border border-gray-300 rounded-lg bg-black text-green-400 p-4 h-64 overflow-y-auto font-mono">
        {results.length === 0 ? (
          <p className="text-gray-400">Waiting for test output...</p>
        ) : (
          <div className="space-y-2">
            {failed.length > 0 && (<>
            <h3 className="text-white">Failed Test Cases:</h3>
            {failed.map((entry, index) => (
              <div key={index} className="flex justify-between bg-gray-800 text-white p-2 rounded-md">
                <span className="font-medium">{entry.test_case}</span>
                <span className="px-3 py-1 rounded-md bg-red-500">
                  {entry.result}
                </span>
              </div>
            )
            )}
            </>
        )} 
        <br></br>
        {passed.length > 0 && (<>
            <h3 className="text-white">Passed Test Cases:</h3>
            {passed.map((entry, index) => (
              <div key={index} className="flex justify-between bg-gray-800 text-white p-2 rounded-md">
                <span className="font-medium">{entry.test_case}</span>
                <span className="px-3 py-1 rounded-md bg-green-500">
                  {entry.result}
                </span>
              </div>
            )
            )}
            </>
        )}
        </div>
        )}
        <p className="mt-2 text-sm text-gray-500">
        WebSocket Status: <strong>{wsStatus}</strong>
        </p>
      </div>
  </div>
  )};

const TestingDashboard = ({ ticketId }: { ticketId: string }) => {
  const [results, setResults] = useState<ResultLog[]>([]);
  
  useEffect(() => {
  const fetchResults = async () => {
    try {
      const result = await getResult(Number(ticketId));
      setResults(result.logs);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };
  fetchResults();
  }, [ticketId]);

  const initAlerts: SecurityAlerts = {
    High: 0,
    Medium: 0,
    Low: 0,
    Informational: 0,
  };

  const cumAlerts: SecurityAlerts = { ... initAlerts};

  for (const log of results) {
    for (const level in log.security_alerts) {
      const alertLevel = level as keyof SecurityAlerts
      cumAlerts[alertLevel] += log.security_alerts[alertLevel];
    }
  }

  const failed = results.filter(
    (entry, index) => entry.result?.toLowerCase() !== 'passed'
  );

  const passed = results.filter(
    (entry, index) => entry.result?.toLowerCase() === 'passed'
  );

  const summaryData = [
    { name: 'High', value: cumAlerts.High },
    { name: 'Medium', value: cumAlerts.Medium },
    { name: 'Low', value: cumAlerts.Low },
    { name: 'Informational', value: cumAlerts.Informational },
  ];
  console.log(summaryData)
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Test Results Dashboard</h1>
      <div className="mb-4">
      <p><strong>Number of High Security Alerts flagged: {cumAlerts.High}</strong></p>
      <p><strong>Number of Medium Security Alerts flagged: {cumAlerts.Medium}</strong></p>
      <p><strong>Number of Low Security Alerts flagged: {cumAlerts.Low}</strong></p>
      <p><strong>Number of Informational Security Alerts flagged: {cumAlerts.Informational}</strong></p>
      <p><strong>Test Cases Passed: {passed.length}</strong></p>
      <p><strong>Test Cases Failed: {failed.length}</strong></p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={summaryData} margin={{ top:20, bottom:20, left: 5, right:20 }}>
          <CartesianGrid stroke="#8884d8"/>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey='value' fill='blue'/>
        </BarChart>
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

  if (!currTicket) {
    return <p className="text-center mt-10">Loading ticket details...</p>;
  }

  if (currTicket.status === Status.ESTIMATING_TESTS) {
    return <p className="text-center mt-10">Your ticket is under assessment, please hang tight.</p>;
  }

  if (currTicket.status === Status.TESTING || currTicket.status === Status.ERROR) {
    return <TestingLogs ticketId={currTicket.id.toString()} />;
  }

  // if (currTicket.status === Status.ERROR) {
  //   return <p className="text-center mt-10 text-red-500">Something went wrong during testing. Check back again later.</p>;;
  // }

  if (currTicket.status === Status.COMPLETED) {
    return <TestingDashboard ticketId={currTicket.id.toString()} />;

  return null;
  }
};

export default TicketDetailPage;
