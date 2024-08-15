import ArticleAdminView from "@/components/views/admin/Articles";
import articleServices from "@/services/article";
import { useEffect, useState } from "react";

const AdminArticlePage = () => {
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
      <ArticleAdminView articles={articles} />
    </>
  );
};

export default AdminArticlePage;
