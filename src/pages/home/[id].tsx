import DetailArticleView from "@/components/views/detailArticle";
import articleServices from "@/services/article";
import { Article } from "@/types/article.type";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const DetailHomePage = () => {
  const { id } = useRouter().query;
  const [article, setArticle] = useState<Article | {}>({});
  const getDetailArticles = async (id: string) => {
    const { data } = await articleServices.getDetailArticles(id);
    setArticle(data.data);
  };

  useEffect(() => {
    if (id) {
      getDetailArticles(id as string);
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Product Detail</title>
      </Head>
      <DetailArticleView article={article} />
    </>
  );
};
export default DetailHomePage;
