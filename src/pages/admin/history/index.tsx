import TransactionsAdminView from "@/components/views/admin/Transactions";
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
      <TransactionsAdminView orders={users} />
    </>
  );
};

export default AdminOrdersPage;
