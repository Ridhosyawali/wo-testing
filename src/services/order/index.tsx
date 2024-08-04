import instance from "@/lib/axios/instance";

const endpoint = { product: "/api/order", user: "/api/history" };
export const orderServices = {
  updateAgenda: (id: string, data: any) =>
    instance.post(`${endpoint.product}/${id}`, { data }),
  updateOrder: (id: string, data: any) =>
    instance.post(`${endpoint.user}/${id}`, { data }),
  deleteOrder: (id: string, data: any) =>
    instance.put(`${endpoint.user}/${id}`, { data }),
};

export default orderServices;
