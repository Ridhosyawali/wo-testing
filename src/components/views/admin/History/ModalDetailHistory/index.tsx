import Modal from "@/components/ui/Modal";
import { Dispatch, SetStateAction } from "react";
import styles from "./ModalDetailHistory.module.scss";
import { User } from "@/types/user.type";
import { convertIDR } from "@/utils/currency";
import moment from "moment";
import { Histories } from "@/types/histories.type.";
type Proptypes = {
  detailHistory: Histories | any;
  setDetailHistory: Dispatch<SetStateAction<{}>>;
};
const ModalDetailHistory = (props: Proptypes) => {
  const { detailHistory, setDetailHistory } = props;

  return (
    <Modal onClose={() => setDetailHistory({})}>
      <h1 className={styles.modal__title}>Detail Transaksi</h1>

      <p>Customer Name: {detailHistory.fullname}</p>
      <p>Order Id: {detailHistory.order_id}</p>
      <hr className={styles.modal__devide} />
      {detailHistory.items.map((item: any) => (
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
            Pelaksanaan : {moment(detailHistory.startDate).format("LL")} -{" "}
            {moment(detailHistory.endDate).format("LL")}
          </p>
          <p>Uang Muka: {convertIDR(detailHistory.total)}</p>
          <p>Sisa Pembayaran: {convertIDR(detailHistory.remaining)}</p>
          <p>Harga Total: {convertIDR(detailHistory.totalall)}</p>
          <p>Status: {detailHistory.status}</p>
        </div>
        <hr className={styles.modal__devide__vertical} />
        <div className={styles.modal__summary__address}>
          <h3>Data Pengiriman</h3>

          <p>Pemesan: {detailHistory.address.recipient}</p>
          <p>Alamat: {detailHistory.address.addressLine}</p>
          <p>Phone: {detailHistory.address.phone}</p>
          <p>Note: {detailHistory.address.note}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailHistory;
