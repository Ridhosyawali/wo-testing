import instance from "@/lib/axios/instance";

const endpoint = { product: "/api/order" };
export const orderServices = {
  updateAgenda: (id: string, data: any) =>
    instance.post(`${endpoint}/${id}`, { data }),
};

export default orderServices;
