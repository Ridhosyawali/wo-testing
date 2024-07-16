import HomeAdminView from "@/components/views/admin/Home";
import OrdersAdminView from "@/components/views/admin/Orders";
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
      <OrdersAdminView orders={users} />
    </>
  );
};

export default AdminOrdersPage;
