import TransactionsAdminView from "@/components/views/admin/Transactions";
import ordersServices from "@/services/orders";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getAllOrders = async () => {
      const { data } = await ordersServices.getAllOrders();
      setOrders(data.data);
    };
    getAllOrders();
  }, []);

  return (
    <>
      <TransactionsAdminView orders={orders} />
    </>
  );
};

export default AdminOrdersPage;
