import HistoryAdminView from "@/components/views/admin/History";
import historyServices from "@/services/history";
import { useEffect, useState } from "react";

const AdminOrdersPage = () => {
  const [history, setHistory] = useState([]);

  const getAllHistory = async () => {
    const { data } = await historyServices.getAllHistories();
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
