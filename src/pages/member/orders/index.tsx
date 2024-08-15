import MemberOrdersView from "@/components/views/member/Orders";
import orderServices from "@/services/order";
import ordersServices from "@/services/orders";
import { useEffect, useState } from "react";

const MemberOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [histories, setHistories] = useState([]);

  const getAllOrders = async () => {
    const { data } = await ordersServices.getAllOrders();
    setOrders(data.data);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllHistories = async () => {
    const { data } = await orderServices.getAllHistories();
    setHistories(data.data);
  };

  useEffect(() => {
    getAllHistories();
  }, []);

  return (
    <>
      <MemberOrdersView transaction={orders} history={histories} />
    </>
  );
};

export default MemberOrdersPage;
