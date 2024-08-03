import HomeAdminView from "@/components/views/admin/Home";
import articleServices from "@/services/article";
import productServices from "@/services/product";
import { useEffect, useState } from "react";

const AdminHomePage = () => {
  const [articles, setArticle] = useState([]);
  const [products, setProduct] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProduct(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllArticle = async () => {
    const { data } = await articleServices.getAllArticles();
    setArticle(data.data);
  };
  useEffect(() => {
    getAllArticle();
  }, []);

  return (
    <>
      <HomeAdminView articles={articles} products={products} />
    </>
  );
};

export default AdminHomePage;
