import instance from "@/lib/axios/instance";

const endpoint = "/api/article";

export const articleServices = {
  getAllArticles: () => instance.get(endpoint),
  getDetailArticles: (id: string) => instance.get(`${endpoint}/${id}`),
  addArticles: (data: any) => instance.post(endpoint, data),
  updateArticles: (id: string, data: any) =>
    instance.put(`${endpoint}/${id}`, { data }),
  deleteArticles: (id: string) => instance.delete(`${endpoint}/${id}`),
};

export default articleServices;
