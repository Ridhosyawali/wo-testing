import Modal from "@/components/ui/Modal";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import styles from "./ModalUpdateTransaction.module.scss";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import moment from "moment";
import { Transactions } from "@/types/transactions.type";
import historyServices from "@/services/history";
import { ToasterContext } from "@/context/ToasterContext";
import ordersServices from "@/services/orders";
import Button from "@/components/ui/Button";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";

type Proptypes = {
  setOrdersData: Dispatch<SetStateAction<Transactions[]>>;
  updatedOrder: Transactions | any;
  setUpdatedOrder: Dispatch<SetStateAction<{}>>;
};
const ModalDetailTransaction = (props: Proptypes) => {
  const { updatedOrder, setUpdatedOrder, setOrdersData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const dataTime = {
      startDate: updatedOrder.startDate,
      endDate: updatedOrder.endDate,
    };

    const result = updatedOrder.items.map(async (item: any) => {
      try {
        const response = await historyServices.agendaUpdate(item.id, dataTime);
        if (response.status !== 200) {
          throw new Error(`Failed to update agenda: ${response.status}`);
        }
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    });

    Promise.all(result)
      .then(async (responses) => {
        setIsLoading(false);
        setIsDataUpdated(true);
        setUpdatedOrder({});
        const { data } = await ordersServices.getAllOrders();
        setOrdersData(data.data);
        setToaster({
          variant: "success",
          message: "Sukses Update Agenda",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        setToaster({
          variant: "danger",
          message: "gagal Update Agenda",
        });
      });
  };

  return (
    <Modal onClose={() => setUpdatedOrder({})}>
      <h1 className={styles.modal__title}>Detail Transaksi</h1>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <p>Customer Name: {updatedOrder.fullname}</p>
        <p>Order Id: {updatedOrder.order_id}</p>
        <p>
          Tanggal Order: {moment(updatedOrder.createdAt).format("LLLL HH:mm")}
        </p>
        <hr className={styles.modal__devide} />
        {updatedOrder.items.map((item: any) => (
          <div key={item.id} className={styles.modal__preview}>
            <div className={styles.modal__preview__desc}>
              <p>ID: {item.id}</p>
              <p>Nama Product: {item.name}</p>
              <p>Kategori: {item.category}</p>
              <p>Varian: {item.size}</p>
            </div>
            <div className={styles.modal__preview__image}>
              <Image
                src={item.image}
                alt="product"
                width={200}
                height={200}
                className={styles.modal__preview__image__img}
              />
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
            <h3>Data Penerima</h3>

            <p>Pemesan: {updatedOrder.address.recipient}</p>
            <p>Alamat: {updatedOrder.address.addressLine}</p>
            <p>Phone: {updatedOrder.address.phone}</p>
            <p>Note: {updatedOrder.address.note}</p>
          </div>
        </div>
        <Button type="submit" variant="accept" className={styles.modal__button}>
          {isLoading ? "Loading..." : "Update Event"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalDetailTransaction;
