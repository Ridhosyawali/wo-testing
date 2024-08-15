import HomeAdminView from "@/components/views/admin/Home";
import { useEffect, useState } from "react";
import ordersServices from "@/services/orders";
import productServices from "@/services/product";

const HomeAdminPage = () => {
  const [products, setProduct] = useState([]);
  const [orders, setOrders] = useState([]);

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

  return (
    <>
      <HomeAdminView products={products} order={orders} />
    </>
  );
};

export default HomeAdminPage;
