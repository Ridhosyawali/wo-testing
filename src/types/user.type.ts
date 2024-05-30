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
};
