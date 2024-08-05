import { Product } from "@/types/product.type";
import styles from "./Checkout.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import { ToasterContext } from "@/context/ToasterContext";
import { useSession } from "next-auth/react";
import productServices from "@/services/product";
import ModalChangeAddress from "./ModalChangeAddress";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // ini css untuk react-date-range
import "react-date-range/dist/theme/default.css"; // ini tema react-date-range
import Script from "next/script";
import transactionServices from "@/services/transaction";
import { eachDayOfInterval } from "date-fns";

const CheckoutView = () => {
  const { setToaster } = useContext(ToasterContext);
  const [profile, setProfile] = useState<any>([]);
  const session: any = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [changeAddress, setChangeAddress] = useState(false);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [pricePerDay, setPricePerDay] = useState(20000); // Ganti dengan harga per hari yang sesuai

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

  const handleSelectDate = (ranges: any) => {
    setSelectionRange(ranges.selection);
  };

  const getTotalPrize = () => {
    const diffTime = Math.abs(
      selectionRange.endDate.getTime() - selectionRange.startDate.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalday = diffDays * pricePerDay;
    const tax = 0;
    const delivery = 0;
    const totalprice = profile?.carts?.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += parseInt(product?.price) * item.qty);
      },
      0
    );
    const totalall = totalprice + totalday + tax + delivery;
    const getDownPayment = totalall * 0.2;
    const remainingPayment = totalall - getDownPayment;
    return {
      totalprice,
      totalday,
      totalall,
      tax,
      delivery,
      getDownPayment,
      remainingPayment,
    };
  };

  const handleCheckout = async () => {
    const payload = {
      user: {
        fullname: profile.fullname,
        email: profile.email,
        phone: profile.phone,
        address: profile.address[selectedAddress],
      },
      transaction: {
        startDate: selectionRange.startDate,
        endDate: selectionRange.endDate,
        items: profile.carts.map(
          (item: { id: string; size: string; qty: number }) => {
            const product: any = getProduct(item.id);
            return {
              id: item.id,
              size: item.size,
              qty: item.qty,
              name: product.name,
              category: product.category,
              image: product.image, // tambahkan properti image dengan URL gambar produk
            };
          }
        ),
        remaining: getTotalPrize().remainingPayment,
        totalall: getTotalPrize().totalall,
        total: getTotalPrize().getDownPayment,
        status: "pending",
      },
    };
    const { data } = await transactionServices.generateTransaction(payload);
    window.snap.pay(data.data.token);
  };

  const getDisabledDates = () => {
    const disabledDates: Date[] = [];

    profile?.carts?.forEach((item: any) => {
      const product = getProduct(item.id);
      if (product) {
        // Add this check
        if (product.agenda?.length > 0) {
          product.agenda.forEach((agenda) => {
            const startDate = agenda.startDate;
            const endDate = agenda.endDate;

            const days = eachDayOfInterval({
              start: startDate,
              end: endDate,
            });

            days.forEach((day) => {
              disabledDates.push(day);
            });
          });
        }
      }
    });

    return disabledDates;
  };

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <div className={styles.checkout}>
        <div className={styles.checkout__main}>
          <h1 className={styles.checkout__main__title}>Checkout</h1>
          <div className={styles.checkout__main__address}>
            <h3 className={styles.checkout__main__address__title}>
              Alamat Penerima
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
                  Ubah Alamat
                </Button>
              </div>
            ) : (
              <Button type="button" onClick={() => setChangeAddress(true)}>
                Tambah Address
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
                keranjang Anda kosong
              </h1>
            </div>
          )}
          <div className={styles.checkout__main__date}>
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelectDate}
              disabledDates={getDisabledDates()}
            />
            <p>
              Rentang tanggal dari{" "}
              <strong>{selectionRange.startDate.toDateString()}</strong> -{" "}
              <strong>{selectionRange.endDate.toDateString()}</strong>
            </p>
            <p className={styles.checkout__main__date__price}>
              Harga jika lebih dari satu hari: {convertIDR(pricePerDay)}
            </p>
          </div>
        </div>
        <div className={styles.checkout__summary}>
          <h1 className={styles.checkout__summary__title}>Ringkasan Biaya</h1>
          <div className={styles.checkout__summary__item}>
            <h4>Subtotal</h4>
            <p>{convertIDR(getTotalPrize().totalprice)}</p>
          </div>
          <div className={styles.checkout__summary__item}>
            <h4>Tax</h4>
            <p>{convertIDR(getTotalPrize().tax)}</p>
          </div>
          <div className={styles.checkout__summary__item}>
            <h4>Per day</h4>
            <p>{convertIDR(getTotalPrize().totalday)}</p>
          </div>
          <hr />
          <div className={styles.checkout__summary__item}>
            <h4>Total</h4>
            <p>{convertIDR(getTotalPrize().totalall)}</p>
          </div>

          <div className={styles.checkout__summary__item}>
            <h4>Sisa Bayar</h4>
            <p>{convertIDR(getTotalPrize().remainingPayment)}</p>
          </div>

          {/* sebaiknya sisa bayar ini diletakkan pada redirect URL nanti */}

          <div className={styles.checkout__summary__item}>
            <h4>Uang Muka</h4>
            <p>{convertIDR(getTotalPrize().getDownPayment)}</p>
          </div>
          <hr />
          <Button
            type="button"
            variant="update"
            className={styles.checkout__summary__button}
            onClick={() => handleCheckout()}
          >
            Proses Payment
          </Button>
          <div className={styles.checkout__summary__desc}>
            <p>Tolong periksa kembali pesanan anda!</p>
          </div>
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
