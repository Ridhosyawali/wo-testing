import Modal from "@/components/ui/Modal";
import { Dispatch, Fragment, SetStateAction } from "react";
import styles from "./ModalDetailOrder.module.scss";
import Image from "next/image";
import moment from "moment";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";

type Proptypes = {
  setDetailOrder: Dispatch<SetStateAction<{}>>;
  detailOrder: any;
  products: Product[];
};
const ModalDetailOrder = (props: Proptypes) => {
  const { setDetailOrder, detailOrder, products } = props;

  const getProduct = (id: string) => {
    const product = products.find((product) => product.id === id);
    return product;
  };

  return (
    <Modal onClose={() => setDetailOrder({})}>
      <h1 className={styles.modal__title}>Detail Order</h1>
      <p>Order Id: {detailOrder.order_id}</p>
      <hr className={styles.modal__devide} />
      <div className={styles.modal__summary}>
        <div className={styles.modal__summary__desc}>
          <p>
            Pelaksanaan : {moment(detailOrder.startDate).format("LL")} -{" "}
            {moment(detailOrder.endDate).format("LL")}
          </p>
          <p>Uang Muka: {convertIDR(detailOrder.total)}</p>
          <p>Sisa Pembayaran: {convertIDR(detailOrder.remaining)}</p>
          <p>Harga Total: {convertIDR(detailOrder.totalall)}</p>
        </div>
        <hr className={styles.modal__devide__vertical} />
        <div className={styles.modal__summary__address}>
          <h3>Data Pengiriman</h3>

          <p>Nama: {detailOrder.address.recipient}</p>
          <p>Alamat: {detailOrder.address.addressLine}</p>
          <p>Phone: {detailOrder.address.phone}</p>
          <p>Note: {detailOrder.address.note}</p>
        </div>
      </div>

      {detailOrder?.items?.map(
        (item: { id: string; size: string; qty: number }) => (
          <Fragment key={`${item.id}-${item.size}`}>
            <div className={styles.modal__list}>
              <div className={styles.modal__list__item}>
                {getProduct(item.id)?.image && (
                  <Image
                    src={`${getProduct(item.id)?.image}`}
                    alt={`${item.id}-${item.size}`}
                    width={150}
                    height={150}
                    className={styles.modal__list__item__image}
                    priority
                  />
                )}
                <div className={styles.modal__list__item__info}>
                  <div className={styles.modal__list__item__info__top}>
                    <h4 className={styles.modal__list__item__info__top__title}>
                      {getProduct(item.id)?.name}
                    </h4>
                    <h4 className={styles.modal__list__item__info__top__price}>
                      {convertIDR(getProduct(item.id)?.price)}
                    </h4>
                  </div>

                  <div className={styles.modal__list__item__info__data}>
                    <p>Kategori : {getProduct(item.id)?.category}</p>
                    <p>Size : {item.size}</p>
                    <p>Quantity : {item.qty}</p>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )
      )}
    </Modal>
  );
};

export default ModalDetailOrder;
