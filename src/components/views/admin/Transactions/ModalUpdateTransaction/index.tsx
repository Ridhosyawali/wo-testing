import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import styles from "./ModalUpdateTransaction.module.scss";
import { User } from "@/types/user.type";
import { ToasterContext } from "@/context/ToasterContext";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import moment from "moment";
import { orderServices } from "@/services/order";

type Proptypes = {
  setOrdersData: Dispatch<SetStateAction<User[]>>;
  updatedOrder: User | any;
  setUpdatedOrder: Dispatch<SetStateAction<{}>>;
  orders: User | any;
};
const ModalUpdateTransaction = (props: Proptypes) => {
  const { updatedOrder, setUpdatedOrder, setOrdersData, orders } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;

    const dataTime = {
      startDate: updatedOrder.startDate,
      endDate: updatedOrder.endDate,
    };

    const promises = updatedOrder.items.map(async (item: any) => {
      const result = await orderServices.updateAgenda(item.id, dataTime);
      if (result.status !== 200) {
        throw new Error("Failed to update agenda");
      }
    });

    try {
      await Promise.all(promises);
      setIsLoading(false);
      setIsDataUpdated(true);
      setUpdatedOrder({});
      const { data } = await userServices.getAllUsers();
      setOrdersData(data.data);
      setToaster({
        variant: "success",
        message: "Success Update",
      });
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Update",
      });
    }
  };

  return (
    <Modal onClose={() => setUpdatedOrder({})}>
      <h1 className={styles.modal__title}>Detail Transaksi</h1>
      <form onSubmit={handleSubmit} className={styles.modal}>
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
            <h3>Data Pengiriman</h3>

            <p>Pemesan: {updatedOrder.address.recipient}</p>
            <p>Alamat: {updatedOrder.address.addressLine}</p>
            <p>Phone: {updatedOrder.address.phone}</p>
            <p>Note: {updatedOrder.address.note}</p>
          </div>
        </div>
        <Button type="submit" variant="accept" className={styles.modal__button}>
          Update Agenda Product
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateTransaction;
