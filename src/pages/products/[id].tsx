import DetailProductView from "@/components/views/detailProduct";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const DetailProductPage = (props: PropTypes) => {
  const { setToaster } = props;
  const { id } = useRouter().query;
  const session: any = useSession();
  const [product, setProduct] = useState<Product | {}>({});
  const [cart, setCart] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDetailProduct = async (id: string) => {
    const { data } = await productServices.getDetailProduct(id);
    setProduct(data.data);
  };

  const getCart = async (token: string) => {
    const { data } = await userServices.getCart(token);
    setCart(data.data);
  };

  // useEffect(() => {
  //   getDetailProduct(id as string);
  // }, [id]);
  //yang ini original

  //kodingan dibawah sementara untuk mengatasi detail product yang tidak muncul saat direfresh
  useEffect(() => {
    if (id) {
      getDetailProduct(id as string);
    }
  }, [id, getDetailProduct]);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart(session.data?.accessToken);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Product Detail</title>
      </Head>
      <DetailProductView
        product={product}
        cart={cart}
        productId={id}
        setToaster={setToaster}
      />
    </>
  );
};
export default DetailProductPage;
