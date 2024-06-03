import DetailProductView from "@/components/views/detailProduct";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailProductPage = () => {
  const { id } = useRouter().query;
  const [product, setProduct] = useState<Product | {}>({});
  const getDetailProduct = async (id: string) => {
    const { data } = await productServices.getDetailProduct(id);
    setProduct(data.data);
  };
  useEffect(() => {
    getDetailProduct(id as string);
  }, [id]);
  console.log(product);

  return (
    <>
      <Head>
        <title>Product Detail</title>
      </Head>
      <DetailProductView product={product} />
    </>
  );
};
export default DetailProductPage;
