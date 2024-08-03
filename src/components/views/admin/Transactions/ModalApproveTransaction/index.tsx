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

type Proptypes = {
  approveTransaction: User | any;
  setApproveTransaction: Dispatch<SetStateAction<{}>>;
  setOrdersData: Dispatch<SetStateAction<User[]>>;
};

const ModalApproveTransaction = (props: Proptypes) => {
  const { setApproveTransaction, approveTransaction, setOrdersData } = props;

  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  console.log(approveTransaction);

  const handleApprove = async (event: FormEvent<HTMLFormElement>) => {
    const form: any = event.target as HTMLFormElement;
    event.preventDefault();
    const data = {
      history: [
        {
          status: "Approved",
          // endDate: approveTransaction.endDate,
          // startDate: approveTransaction.startDate,
          // total: approveTransaction.total,
          // redirect_url: approveTransaction.redirect_url,
          // token: approveTransaction.token,
          // remaining: approveTransaction.remaining,
          // totalall: approveTransaction.totalall,
          // items: [
          //   {
          //     category: approveTransaction.items.category,
          //     id: approveTransaction.items.id,
          //     name: approveTransaction.items.name,
          //     image: approveTransaction.items.image,
          //     qty: approveTransaction.items.qty,
          //     size: approveTransaction.items.size,
          //   },
          // ],
          // address: {
          //   recipient: approveTransaction.address.recipient,
          //   addressLine: approveTransaction.address.addressLine,
          //   note: approveTransaction.address.note,
          //   phone: approveTransaction.address.phone,
          // },
        },
      ],
    };
  };
  return (
    <Modal onClose={() => setApproveTransaction({})}>
      <form onSubmit={handleApprove}>
        <div className={styles.modal}>
          <h1 className={styles.modal__title}>Approve Transaction</h1>
          <p>Are you sure you want to approve this transaction?</p>
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
