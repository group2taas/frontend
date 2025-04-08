import { Status } from "./enums"

export interface UserProfile {
    uid: string;
    name: string;
    phone: string;
    email: string;
    company_name: string;
}

export interface Tickets {
  id: number;
  title: string;
  status: Status;
  createdAt: Date;
}

export interface SecurityAlerts {
  High: number;
  Medium: number;
  Low: number;
  Informational: number;
}

export interface ResultLog {
  target_url: string;
  security_alerts: SecurityAlerts;
  test_case: string;
  result: string;
}

export interface Results {
  title: string;
  created_at: string;
  ticket_id: number;
  num_tests: number;
  logs: Array<{
    target_url: string;
    security_alerts: any;
    test_case: string;
    result: string;
  }>;
  progress: number;
  security_alerts: Record<string, number>;
  alerts_detail: any[];
  markdown?: string;
  pdf?: string;
  embeddable_pdf_url?: string;
}