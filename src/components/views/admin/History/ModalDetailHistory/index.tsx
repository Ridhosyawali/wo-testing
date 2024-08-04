import Modal from "@/components/ui/Modal";
import { Dispatch, SetStateAction } from "react";
import styles from "./ModalDetailHistory.module.scss";
import { User } from "@/types/user.type";
import { convertIDR } from "@/utils/currency";
import moment from "moment";
type Proptypes = {
  setOrdersData: Dispatch<SetStateAction<User[]>>;
  updatedOrder: User | any;
  setUpdatedOrder: Dispatch<SetStateAction<{}>>;
  orders: User | any;
};
const ModalDetailHistory = (props: Proptypes) => {
  const { updatedOrder, setUpdatedOrder, setOrdersData, orders } = props;

  console.log(updatedOrder);

  return (
    <Modal onClose={() => setUpdatedOrder({})}>
      <h1 className={styles.modal__title}>Detail Transaksi</h1>

      <p>Customer Name: {updatedOrder.fullname}</p>
      <p>Order Id: {updatedOrder.order_id}</p>
      <hr className={styles.modal__devide} />
      {updatedOrder.items.map((item: any) => (
        <div key={item.id} className={styles.modal__preview}>
          <div className={styles.modal__preview__desc}>
            <p>ID: {item.id}</p>
            <p>Nama Product: {item.name}</p>
            <p>Kategori: {item.category}</p>
            <p>Size: {item.size}</p>
          </div>
        </div>
      ))}
      <hr className={styles.modal__devide} />
      <div className={styles.modal__summary}>
        <div className={styles.modal__summary__desc}>
          <p>
            Pelaksanaan : {moment(updatedOrder.startDate).format("LL")} -{" "}
            {moment(updatedOrder.endDate).format("LL")}
          </p>
          <p>Uang Muka: {convertIDR(updatedOrder.total)}</p>
          <p>Sisa Pembayaran: {convertIDR(updatedOrder.remaining)}</p>
          <p>Harga Total: {convertIDR(updatedOrder.totalall)}</p>
          <p>Status: {updatedOrder.status}</p>
        </div>
        <hr className={styles.modal__devide__vertical} />
        <div className={styles.modal__summary__address}>
          <h3>Data Pengiriman</h3>

          <p>Pemesan: {updatedOrder.address.recipient}</p>
          <p>Alamat: {updatedOrder.address.addressLine}</p>
          <p>Phone: {updatedOrder.address.phone}</p>
          <p>Note: {updatedOrder.address.note}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailHistory;
