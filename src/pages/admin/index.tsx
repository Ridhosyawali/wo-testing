import HomeAdminView from "@/components/views/admin/Home";
import { useEffect, useState } from "react";
import ordersServices from "@/services/orders";
import productServices from "@/services/product";
import historyServices from "@/services/history";

const HomeAdminPage = () => {
  const [products, setProduct] = useState([]);
  const [orders, setOrders] = useState([]);
  const [history, setHistory] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProduct(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
      <HomeAdminView products={products} order={orders} history={history} />
    </>
  );
};

export default HomeAdminPage;
