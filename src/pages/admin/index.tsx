import HomeAdminView from "@/components/views/admin/Home";
import { useEffect, useState } from "react";
import ordersServices from "@/services/orders";
import productServices from "@/services/product";
import historyServices from "@/services/history";

const HomeAdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [history, setHistory] = useState([]);

  const getAllOrders = async () => {
    const { data } = await ordersServices.getAllOrders();
    setOrders(data.data);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllHistories = async () => {
    const { data } = await historyServices.getAllHistories();
    setHistory(data.data);
  };

  useEffect(() => {
    getAllHistories();
  }, []);

  return (
    <>
      <HomeAdminView order={orders} history={history} />
    </>
  );
};

export default HomeAdminPage;
