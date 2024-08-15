import { Timestamp } from "firebase/firestore";

export type Histories = {
  fullname: string;
  id: string;
  userId: string;
  create_at: string;
  startDate: Date;
  endDate: Date;
  total: number;
  totalall: number;
  remaining: number;
  status: string;
  token: string;
  redirect_url: string;
  address: {
    addressLine: string;
    note: string;
    phone: string;
    recipient: string;
  };
  items: [
    {
      id: string;
      price: number;
      qty: number;
      size: string;
      image: string;
    }
  ];
};
