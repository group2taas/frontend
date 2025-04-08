import axiosInstance from '@/axios/axios-instance';
import { Results } from '@/types/mongo-documents';


export const getResult = async (ticketId: number): Promise<Results> => {
  const response = await axiosInstance.get(`/results/ticket/${ticketId}`);
  
  return {
    title: response.data.title,
    created_at: response.data.created_at,
    ticket_id: response.data.ticket,
    num_tests: response.data.num_tests,
    logs: response.data.logs.map((log: any) => ({
      target_url: log.target_url,
      security_alerts: log.security_alerts,
      test_case: log.test_case,
      result: log.result,
    })),
    progress: response.data.progress,
    security_alerts: response.data.security_alerts,
    alerts_detail: response.data.alerts_detail,
    markdown: response.data.markdown,
    pdf: response.data.pdf_link,
    embeddable_pdf_url: response.data.embeddable_pdf_url,
  };
};
