import HomeAdminView from "@/components/views/admin/Home";
import articleServices from "@/services/article";
import productServices from "@/services/product";
import { useEffect, useState } from "react";

const AdminHomePage = () => {
  const [articles, setArticle] = useState([]);
  const getAllArticle = async () => {
    const { data } = await articleServices.getAllArticles();
    setArticle(data.data);
  };
  useEffect(() => {
    getAllArticle();
  }, []);

  return (
    <>
      <HomeAdminView articles={articles} />
    </>
  );
};

export default AdminHomePage;
