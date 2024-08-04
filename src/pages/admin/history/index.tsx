import HistoryAdminView from "@/components/views/admin/History";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

const AdminOrdersPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);

  return (
    <>
      <HistoryAdminView orders={users} />
    </>
  );
};

export default AdminOrdersPage;
