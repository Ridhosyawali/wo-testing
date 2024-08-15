import instance from "@/lib/axios/instance";

const endpoint = "/api/orders";
export const ordersServices = {
  getAllOrders: () => instance.get(endpoint),
  addTransaction: (data: any) => instance.post(endpoint, data),
  updateTransaction: (order_id: string) =>
    instance.put(`${endpoint}?order_id=${order_id}`),
  deleteProduct: (id: string) => instance.delete(`${endpoint}/${id}`),
};

export default ordersServices;
