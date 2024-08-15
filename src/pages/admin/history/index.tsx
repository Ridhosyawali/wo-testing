import HistoryAdminView from "@/components/views/admin/History";
import orderServices from "@/services/order";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

const AdminOrdersPage = () => {
  const [history, setHistory] = useState([]);

  const getAllHistory = async () => {
    const { data } = await orderServices.getAllHistories();
    setHistory(data.data);
  };

  useEffect(() => {
    getAllHistory();
  }, []);

  return (
    <>
      <HistoryAdminView history={history} />
    </>
  );
};

export default AdminOrdersPage;
