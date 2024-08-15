import instance from "@/lib/axios/instance";

const endpoint = { product: "/api/order", history: "/api/history" };
export const orderServices = {
  getAllHistories: () => instance.get(endpoint.history),
  updateAgenda: (id: string, data: any) =>
    instance.post(`${endpoint.product}/${id}`, { data }),
  addHistory: (data: any) => instance.post(`${endpoint.history}`, { data }),
};

export default orderServices;
