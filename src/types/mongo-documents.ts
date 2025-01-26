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