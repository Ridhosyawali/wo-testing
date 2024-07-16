import { Product } from "@/types/product.type";
import styles from "./DetailProduct.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import userServices from "@/services/user";
import { ToasterContext } from "@/context/ToasterContext";
import ModalDetailProduct from "./ModalDetailProduct";
import ProductDesc from "./ProductDesc";

type PropTypes = {
  product: Product | any;
  cart: any;
  productId: string | string[] | undefined;
};

const DetailProductView = (props: PropTypes) => {
  const { product, cart, productId } = props;
  const { setToaster } = useContext(ToasterContext);
  const { status }: any = useSession();
  const [detailProduct, setDetailProduct] = useState(false);

  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");
  const [truncatedContent, setTruncatedContent] = useState(product.description);

  const handleAddToCart = async () => {
    if (selectedSize !== "") {
      let newCart = [];
      if (
        cart.filter(
          (item: any) => item.id === productId && item.size === selectedSize
        ).length > 0
      ) {
        newCart = cart.map((item: any) => {
          if (item.id === productId && item.size === selectedSize) {
            item.qty += 1;
          }
          return item;
        });
      } else {
        newCart = [
          ...cart,
          {
            id: productId,
            size: selectedSize,
            qty: 1,
          },
        ];
      }
      try {
        const result = await userServices.addToCart({
          carts: newCart,
        });
        if (result.status === 200) {
          setSelectedSize("");
          setToaster({
            variant: "success",
            message: "Success Add To Cart",
          });
        }
      } catch (error) {
        setToaster({
          variant: "danger",
          message: "Failed Add To Cart",
        });
      }
    }
  };

  useEffect(() => {
    const limit = 200; // Batasi teks hingga 100 karakter
    if (product?.description?.length > limit) {
      setTruncatedContent(product.description.substring(0, limit) + "...");
    } else {
      setTruncatedContent(product.description);
    }
  }, [product.description]);
  return (
    <>
      <div className={styles.detail}>
        <div className={styles.detail__main}>
          <div className={styles.detail__main__left}>
            <Image
              alt={product?.name}
              src={product?.image}
              width={500}
              height={500}
              className={styles.detail__main__left__image}
              priority={true}
            />
          </div>
          <div className={styles.detail__main__right}>
            <h1 className={styles.detail__main__right__title}>
              {product?.name}
            </h1>
            <h3 className={styles.detail__main__right__category}>
              {product?.category}
            </h3>
            <h3 className={styles.detail__main__right__price}>
              {convertIDR(product?.price)}
            </h3>
            <p className={styles.detail__main__right__subtitle}>Select Size</p>
            <div className={styles.detail__main__right__size}>
              {product?.stock?.map((item: { size: string; qty: number }) => (
                <div
                  className={styles.detail__main__right__size__item}
                  key={item.size}
                >
                  <input
                    className={styles.detail__main__right__size__item__input}
                    name="size"
                    id={`size-${item.size}`}
                    type="radio"
                    disabled={item.qty === 0}
                    onClick={() => setSelectedSize(item.size)}
                    checked={selectedSize === item.size}
                  />
                  <label
                    className={styles.detail__main__right__size__item__label}
                    htmlFor={`size-${item.size}`}
                  >
                    {item.size}
                  </label>
                </div>
              ))}
            </div>
            <Button
              className={styles.detail__main__right__add}
              type={status === "authenticated" ? "submit" : "button"}
              onClick={() => {
                if (selectedSize === "") {
                  setToaster({ variant: "warning", message: "Select Size" });
                } else {
                  status === "unauthenticated"
                    ? router.push(`/auth/login?callbackUrl=${router.asPath}`)
                    : handleAddToCart();
                }
              }}
            >
              Add to Cart
            </Button>
            <div className={styles.detail__main__right__description}>
              <ProductDesc productDesc={truncatedContent} />
            </div>
            <button
              className={styles.detail__main__detailproduct}
              type="button"
              onClick={() => setDetailProduct(true)}
            >
              Product Details
            </button>
            <hr className={styles.detail__main__right__devider} />
          </div>
        </div>
      </div>
      {detailProduct && (
        <ModalDetailProduct
          product={product}
          setDetailProduct={setDetailProduct}
          products={product}
        />
      )}
    </>
  );
};

export default DetailProductView;
