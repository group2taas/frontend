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
  ticket_id: number;
  logs: ResultLog[];
  progress: number;
}