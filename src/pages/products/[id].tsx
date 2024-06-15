import DetailProductView from "@/components/views/DetailProduct";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const DetailProductPage = () => {
  const { id } = useRouter().query;
  const session: any = useSession();
  const [product, setProduct] = useState<Product | {}>({});
  const [cart, setCart] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDetailProduct = async (id: string) => {
    const { data } = await productServices.getDetailProduct(id);
    setProduct(data.data);
  };

  const getCart = async () => {
    const { data } = await userServices.getCart();
    setCart(data.data);
  };

  useEffect(() => {
    if (id) {
      getDetailProduct(id as string);
    }
  }, [id]);
  //yang ini original

  //kodingan dibawah sementara untuk mengatasi detail product yang tidak muncul saat direfresh
  // useEffect(() => {
  //
  //     getDetailProduct(id as string);
  // }, [id]);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart();
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Product Detail</title>
      </Head>
      <DetailProductView product={product} cart={cart} productId={id} />
    </>
  );
};
export default DetailProductPage;
