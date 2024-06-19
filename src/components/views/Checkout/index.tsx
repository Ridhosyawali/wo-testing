import { Product } from "@/types/product.type";
import styles from "./Checkout.module.scss";
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
import ModalChangeAddress from "./ModalChangeAddress";

const CheckoutView = () => {
  const { setToaster } = useContext(ToasterContext);
  const [profile, setProfile] = useState<any>([]);
  const session: any = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [changeAddress, setChangeAddress] = useState(false);

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
    if (data?.data?.address?.length > 0) {
      data.data.address.filter((address: { isMain: boolean }, id: number) => {
        if (address.isMain) {
          setSelectedAddress(id);
        }
      });
    }
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
      getProfile();
    }
  }, [session]);

  const getProduct = (id: string) => {
    const product = products.find((product) => product.id === id);
    return product;
  };

  const getTotalPrize = () => {
    const total = profile?.carts?.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += parseInt(product?.price) * item.qty);
      },
      0
    );
    return total;
  };

  return (
    <>
      <div className={styles.checkout}>
        <div className={styles.checkout__main}>
          <h1 className={styles.checkout__main__title}>Checkout</h1>
          <div className={styles.checkout__main__address}>
            <h3 className={styles.checkout__main__address__title}>
              Shipping Address
            </h3>
            {profile?.address?.length > 0 ? (
              <div className={styles.checkout__main__address__selected}>
                <h4 className={styles.checkout__main__address__selected__title}>
                  {profile?.address[selectedAddress]?.recipient} -{" "}
                  {profile?.address[selectedAddress]?.phone}
                </h4>
                <p
                  className={styles.checkout__main__address__selected__address}
                >
                  {profile?.address[selectedAddress]?.addressLine}
                </p>
                <p className={styles.checkout__main__address__selected__note}>
                  Note : {profile?.address[selectedAddress]?.note}
                </p>
                <Button type="button" onClick={() => setChangeAddress(true)}>
                  Change Address
                </Button>
              </div>
            ) : (
              <Button type="button" onClick={() => setChangeAddress(true)}>
                Add Address
              </Button>
            )}
          </div>
          {profile?.carts?.length > 0 ? (
            <div className={styles.checkout__main__list}>
              {profile?.carts?.map(
                (item: { id: string; size: string; qty: number }) => (
                  <Fragment key={`${item.id}-${item.size}`}>
                    <div className={styles.checkout__main__list__item}>
                      {getProduct(item.id)?.image && (
                        <Image
                          src={`${getProduct(item.id)?.image}`}
                          alt={`${item.id}-${item.size}`}
                          width={150}
                          height={150}
                          className={styles.checkout__main__list__item__image}
                          priority
                        />
                      )}
                      <div className={styles.checkout__main__list__item__info}>
                        <h4
                          className={
                            styles.checkout__main__list__item__info__title
                          }
                        >
                          {getProduct(item.id)?.name}
                        </h4>

                        <div
                          className={
                            styles.checkout__main__list__item__info__data
                          }
                        >
                          <label
                            className={
                              styles.checkout__main__list__item__info__data__size
                            }
                          >
                            Size = {item.size}
                          </label>
                          <label
                            className={
                              styles.checkout__main__list__item__info__data__qty
                            }
                          >
                            Quantity = {item.qty}
                          </label>
                        </div>
                      </div>
                      <h4 className={styles.checkout__main__list__item__price}>
                        {convertIDR(getProduct(item.id)?.price)}
                      </h4>
                    </div>
                    <hr className={styles.checkout__main__list__devider} />
                  </Fragment>
                )
              )}
            </div>
          ) : (
            <div className={styles.checkout__main__empty}>
              <h1 className={styles.checkout__main__empty__title}>
                Your cart is empty
              </h1>
            </div>
          )}
        </div>
        <div className={styles.checkout__summary}>
          <h1 className={styles.checkout__summary__title}>Summary</h1>
          <div className={styles.checkout__summary__item}>
            <h4>Subtotal</h4>
            <p>{convertIDR(getTotalPrize())}</p>
          </div>
          <div className={styles.checkout__summary__item}>
            <h4>Delivery</h4>
            <p>{convertIDR(0)}</p>
          </div>
          <div className={styles.checkout__summary__item}>
            <h4>Tax</h4>
            <p>{convertIDR(0)}</p>
          </div>
          <hr />
          <div className={styles.checkout__summary__item}>
            <h4>Total</h4>
            <p>{convertIDR(getTotalPrize())}</p>
          </div>
          <hr />
          <Button
            type="button"
            variant="update"
            className={styles.checkout__summary__button}
          >
            Proses Payment
          </Button>
          <div></div>
        </div>
      </div>
      {changeAddress && (
        <ModalChangeAddress
          profile={profile}
          setProfile={setProfile}
          setChangeAddress={setChangeAddress}
          setSelectedAddress={setSelectedAddress}
          selectedAddress={selectedAddress}
        />
      )}
    </>
  );
};
export default CheckoutView;
