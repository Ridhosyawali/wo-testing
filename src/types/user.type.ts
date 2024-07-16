export type User = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  role: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  password?: string;
  type?: string;
  transaction?: {
    address: {
      addressLine: string;
      note: string;
      phone: string;
      recipient: string;
    };
    startDate: Date;
    endDate: Date;
    total: number;
    totalall: number;
    remaining: number;
    status: string;
    token: string;
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
};
