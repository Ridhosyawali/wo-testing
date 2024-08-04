import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import styles from "./ModalApproveTransaction.module.scss";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ToasterContext } from "@/context/ToasterContext";
import { User } from "@/types/user.type";
import Select from "@/components/ui/Select";
import orderServices from "@/services/order";
import userServices from "@/services/user";

type Proptypes = {
  approveTransaction: User | any;
  setApproveTransaction: Dispatch<SetStateAction<{}>>;
  setOrdersData: Dispatch<SetStateAction<User[]>>;
};

const ModalApproveTransaction = (props: Proptypes) => {
  const { setApproveTransaction, approveTransaction, setOrdersData } = props;

  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsCount, setItemsCount] = useState(approveTransaction.items);

  console.log(approveTransaction);

  const handleApprove = async (event: FormEvent<HTMLFormElement>) => {
    const form: any = event.target as HTMLFormElement;
    const items = itemsCount.map(
      (items: {
        name: string;
        size: string;
        id: string;
        category: string;
        qty: number;
      }) => {
        return {
          name: items.name,
          size: items.size,
          id: items.id,
          category: items.category,
          qty: parseInt(`${items.qty}`),
        };
      }
    );
    event.preventDefault();
    const data = {
      history: {
        id: approveTransaction.id,
        fullname: approveTransaction.fullname,
        status: "Approved",
        endDate: approveTransaction.endDate,
        order_id: approveTransaction.order_id,
        startDate: approveTransaction.startDate,
        total: approveTransaction.total,
        redirect_url: approveTransaction.redirect_url,
        token: approveTransaction.token,
        remaining: approveTransaction.remaining,
        totalall: approveTransaction.totalall,
        items: items,
        address: {
          recipient: approveTransaction.address.recipient,
          addressLine: approveTransaction.address.addressLine,
          note: approveTransaction.address.note,
          phone: approveTransaction.address.phone,
        },
      },
    };

    const result = await orderServices.updateOrder(approveTransaction.id, data);
    if (result.status === 200) {
      setIsLoading(false);
      setApproveTransaction({});
      const { data } = await userServices.getAllUsers();
      setOrdersData(data.data);
      setToaster({
        variant: "success",
        message: "Success Approve Transaction",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Approve Transaction",
      });
    }
  };
  return (
    <Modal onClose={() => setApproveTransaction({})}>
      <form onSubmit={handleApprove}>
        <div className={styles.modal}>
          <h1 className={styles.modal__title}>Persetujuan Transaksi</h1>
          <p>Apakah anda yakin menyetujui transaksi ini?</p>
          <br />
          <div className={styles.modal__status}></div>
        </div>
        <div>
          <p>status : {approveTransaction.status}</p>
        </div>
        <Button className={styles.modal__button} type="submit">
          {isLoading ? "Updating..." : "Yes, Approve"}
          <i className="bx bx-check" />
        </Button>
      </form>
    </Modal>
  );
};

export default ModalApproveTransaction;
