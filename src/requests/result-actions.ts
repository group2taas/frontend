import axiosInstance from '@/axios/axios-instance';
import { Results } from '@/types/mongo-documents';


export const getResult = async (ticketId: number): Promise<Results> => {
    const response = await axiosInstance.get(`/results/ticket/${ticketId}`);
    return {
      ticket_id: response.data.ticket,
      logs: response.data.logs.map((log: any) => ({
        target_url: log.target_url,
        security_alerts: log.security_alerts,
        test_case: log.test_case,
        result: log.result
      })),
      progress: response.data.progress
    };
  };

