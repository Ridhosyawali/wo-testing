import instance from "@/lib/axios/instance";

const endpoint = {
  transaction: "/api/transaction",
};

export const transactionServices = {
  generateTransaction: (data: any) => instance.post(endpoint.transaction, data),
};

export default transactionServices;
