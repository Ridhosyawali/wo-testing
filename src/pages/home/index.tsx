import HomeView from "@/components/views/Home";
import articleServices from "@/services/article";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [articles, setArticles] = useState([]);

  const getAllArticles = async () => {
    const { data } = await articleServices.getAllArticles();
    setArticles(data.data);
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  return (
    <>
      <HomeView articles={articles} />
    </>
  );
};

export default HomePage;
