import instance from "@/lib/axios/instance";

const endpoint = { product: "/api/order", history: "/api/history" };

export const historyServices = {
  getAllHistories: () => instance.get(endpoint.history),
  agendaUpdate: (id: string, data: any) =>
    instance.post(`${endpoint.product}/${id}`, { data }),
  addHistory: (data: any) => instance.post(`${endpoint.history}`, { data }),
  updateHistory: (id: string, data: any) =>
    instance.put(`${endpoint.history}/${id}`, { data }),
};

export default historyServices;
