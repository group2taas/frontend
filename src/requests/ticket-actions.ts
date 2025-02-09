import axiosInstance from '@/axios/axios-instance';
import { Tickets } from '@/types/mongo-documents';
import { Status } from '@/types/enums';

export const fetchTickets = async (): Promise<Tickets[]> => {
  const response = await axiosInstance.get('/tickets/');
  return response.data.map((ticket: any) => ({
    id: ticket.id,
    title: ticket.title,
    status: mapBackendStatus(ticket.status),
    createdAt: new Date(ticket.created_at),
  }));
};

export const createTicket = async (formData: any): Promise<Tickets> => {
  const response = await axiosInstance.post('/tickets/create/', {
    title: formData.applicationName,
  });
  return {
    id: response.data.id,
    title: response.data.title,
    status: mapBackendStatus(response.data.status),
    createdAt: new Date(response.data.created_at),
  };
};

export const getTicket = async (ticketId: number): Promise<Tickets> => {
  const response = await axiosInstance.get(`/tickets/${ticketId}`);
  return {
    id: response.data.id,
    title: response.data.title,
    status: mapBackendStatus(response.data.status),
    createdAt: new Date(response.data.created_at),
  };
};

export const deleteTicket = async (ticketId: number): Promise<void> => {
  await axiosInstance.delete(`/tickets/${ticketId}`);
};

const mapBackendStatus = (status: string): Status => {
  switch (status) {
    case 'new': return Status.ESTIMATING_TESTS;
    case 'testing': return Status.TESTING;
    case 'completed': return Status.COMPLETED;
    default: return Status.ESTIMATING_TESTS;
  }
};