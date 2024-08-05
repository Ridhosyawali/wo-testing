import { Product } from "@/types/product.type";
import styles from "./Cart.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import { Fragment, useContext, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import { ToasterContext } from "@/context/ToasterContext";
import { useSession } from "next-auth/react";
import productServices from "@/services/product";
import Link from "next/link";
import router from "next/router";

const CartView = () => {
  const { setToaster } = useContext(ToasterContext);
  const [cart, setCart] = useState([]);
  const session: any = useSession();
  const [products, setProducts] = useState<Product[]>([]);

  const getCart = async () => {
    const { data } = await userServices.getCart();
    setCart(data.data);
  };

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart();
    }
  }, [session]);

  const getProduct = (id: string) => {
    const product = products.find((product) => product.id === id);
    return product;
  };

  const getOptionsSize = (id: string, selected: string) => {
    const product = products.find((product) => product.id === id);
    const options = product?.stock.map(
      (stock: { size: string; qty: number }) => {
        if (stock.qty > 0) {
          return {
            label: stock.size,
            value: stock.size,
            selected: stock.size === selected,
          };
        }
      }
    );

    const data = options?.filter((option) => option !== undefined);
    return data;
  };

  const getTotalPrize = () => {
    const total = cart.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += parseInt(product?.price) * item.qty);
      },
      0
    );
    return total;
  };

  const handleDeleteCart = async (id: string, size: string) => {
    const newCart = cart.filter((item: { id: string; size: string }) => {
      return item.id !== id || item.size !== size;
    });
    try {
      const result = await userServices.addToCart({
        carts: newCart,
      });
      if (result.status === 200) {
        setCart(newCart);
        setToaster({
          variant: "success",
          message: "Berhasil Menghapus Item Dari Keranjang",
        });
      }
    } catch (error) {
      setToaster({
        variant: "danger",
        message: "Gagal Menghapus Item Dari Keranjang",
      });
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      // Tampilkan pesan peringatan
      setToaster({
        variant: "warning",
        message: "Keranjang anda kosong",
      });
      return;
    }

    // Jika ada produk dalam keranjang, masuk ke halaman checkout
    router.push("/checkout");
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart__main}>
        <h1 className={styles.cart__main__title}>Keranjang</h1>
        {cart.length > 0 ? (
          <div className={styles.cart__main__list}>
            {cart.map((item: { id: string; size: string; qty: number }) => (
              <Fragment key={`${item.id}-${item.size}`}>
                <div className={styles.cart__main__list__item}>
                  {getProduct(item.id)?.image && (
                    <Image
                      src={`${getProduct(item.id)?.image}`}
                      alt={`${item.id}-${item.size}`}
                      width={150}
                      height={150}
                      className={styles.cart__main__list__item__image}
                      priority
                    />
                  )}
                  <div className={styles.cart__main__list__item__info}>
                    <div className={styles.cart__main__list__item__info__top}>
                      <h4
                        className={
                          styles.cart__main__list__item__info__top__title
                        }
                      >
                        {getProduct(item.id)?.name}
                      </h4>
                      <h4
                        className={
                          styles.cart__main__list__item__info__top__price
                        }
                      >
                        {convertIDR(getProduct(item.id)?.price)}
                      </h4>
                    </div>
                    <p
                      className={styles.cart__main__list__item__info__category}
                    >
                      {getProduct(item.id)?.category}
                    </p>

                    <div className={styles.cart__main__list__item__info__data}>
                      <label
                        className={
                          styles.cart__main__list__item__info__data__size
                        }
                      >
                        Varian
                        <Select
                          name="size"
                          options={getOptionsSize(item.id, item.size)}
                          disabled
                          className={
                            styles.cart__main__list__item__info__data__size__select
                          }
                        />
                      </label>
                      <label
                        className={
                          styles.cart__main__list__item__info__data__qty
                        }
                      >
                        Quantity
                        <Input
                          name="qty"
                          type="number"
                          defaultValue={item.qty}
                          disabled
                          className={
                            styles.cart__main__list__item__info__data__qty__input
                          }
                        />
                      </label>
                    </div>
                    <button
                      type="button"
                      className={styles.cart__main__list__item__info__delete}
                      onClick={() => handleDeleteCart(item.id, item.size)}
                    >
                      <i className="bx bxs-trash" />
                    </button>
                  </div>
                </div>
                <hr className={styles.cart__main__list__devider} />
              </Fragment>
            ))}
          </div>
        ) : (
          <div className={styles.cart__main__empty}>
            <h1 className={styles.cart__main__empty__title}>
              Keranjang anda kosong
            </h1>
          </div>
        )}
      </div>
      <div className={styles.cart__summary}>
        <h1 className={styles.cart__summary__title}>Ringkasan Biaya</h1>
        <div className={styles.cart__summary__item}>
          <h4>Subtotal</h4>
          <p>{convertIDR(getTotalPrize())}</p>
        </div>
        <div className={styles.cart__summary__item}>
          <h4>Delivery</h4>
          <p>{convertIDR(0)}</p>
        </div>
        <div className={styles.cart__summary__item}>
          <h4>Tax</h4>
          <p>{convertIDR(0)}</p>
        </div>
        <hr />
        <div className={styles.cart__summary__item}>
          <h4>Total</h4>
          <p>{convertIDR(getTotalPrize())}</p>
        </div>
        <hr />

        <Button
          onClick={handleCheckout}
          type="button"
          className={styles.cart__summary__button}
        >
          Checkout
        </Button>
        <div></div>
      </div>
    </div>
  );
};
export default CartView;
