import axiosInstance from '@/axios/axios-instance';
import { Results } from '@/types/mongo-documents';


export const getResult = async (ticketId: number): Promise<Results> => {
    const response = await axiosInstance.get(`/results/${ticketId}`);
    return {
      ticket_id: response.data.ticket,
      logs: response.data.logs.map((log: any) => ({
        test_case: log.test_case,
        result: log.result
      })),
      progress: response.data.progress
    };
  };

