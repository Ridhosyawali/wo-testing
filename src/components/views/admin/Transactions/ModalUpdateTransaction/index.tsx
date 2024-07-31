import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import styles from "./ModalUpdateOrder.module.scss";
import { User } from "@/types/user.type";
import { ToasterContext } from "@/context/ToasterContext";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import moment from "moment";
import { orderServices } from "@/services/order";

type Proptypes = {
  setOrdersData: Dispatch<SetStateAction<User[]>>;
  updatedOrder: User | any;
  setAgenda: Dispatch<SetStateAction<{}>>;
  setUpdatedOrder: Dispatch<SetStateAction<{}>>;
};
const ModalUpdateTransaction = (props: Proptypes) => {
  const { updatedOrder, setUpdatedOrder, setOrdersData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  const idProduct = updatedOrder.items[0].id;
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;

    const dataTime = {
      startDate: updatedOrder.startDate,
      endDate: updatedOrder.endDate,
    };
    const data = {
      transaction: [
        {
          status: form.status.value,
          endDate: updatedOrder.endDate,
          startDate: updatedOrder.startDate,
          total: updatedOrder.total,
          redirect_url: updatedOrder.redirect_url,
          token: updatedOrder.token,
          remaining: updatedOrder.remaining,
          totalall: updatedOrder.totalall,
          items: [
            {
              category: updatedOrder.items[0].category,
              id: updatedOrder.items[0].id,
              name: updatedOrder.items[0].name,
              image: updatedOrder.items[0].image,
              qty: updatedOrder.items[0].qty,
              size: updatedOrder.items[0].size,
            },
          ],
          address: {
            recipient: updatedOrder.address.recipient,
            addressLine: updatedOrder.address.addressLine,
            note: updatedOrder.address.note,
            phone: updatedOrder.address.phone,
          },
        },
      ],
    };

    const result2 = await orderServices.updateAgenda(idProduct, dataTime);
    if (result2.status === 200) {
      setIsLoading(false);
      setUpdatedOrder({});
      const { data } = await userServices.getAllUsers();
      setOrdersData(data.data);
      setToaster({
        variant: "success",
        message: "Success Update",
      });
    } else {
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
            <p>Harga Total: {convertIDR(updatedOrder.totalall)}</p>
            <p>Uang Muka: {convertIDR(updatedOrder.total)}</p>
            <p>Sisa Pembayaran: {convertIDR(updatedOrder.remaining)}</p>
            <p>
              Pelaksanaan : {moment(updatedOrder.startDate).format("LL")} -{" "}
              {moment(updatedOrder.endDate).format("LL")}
            </p>
            <Select
              label="Status"
              name="status"
              className={styles.modal__summary__select}
              defaultValue={updatedOrder.status}
              options={[
                { value: "pending", label: "Pending" },
                { value: "settlement", label: "Settlement" },
                { value: "success", label: "Success" },
              ]}
            />
          </div>
          <hr className={styles.modal__devide__vertical} />
          <div className={styles.modal__summary__address}>
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
