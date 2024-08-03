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
import userServices from "@/services/user";
import Select from "@/components/ui/Select";

type Proptypes = {
  approveTransaction: User | any;
  setApproveTransaction: Dispatch<SetStateAction<{}>>;
  setOrdersData: Dispatch<SetStateAction<User[]>>;
};

const ModalApproveTransaction = (props: Proptypes) => {
  const { setApproveTransaction, approveTransaction, setOrdersData } = props;

  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  console.log(approveTransaction.id);

  const handleApprove = async (event: FormEvent<HTMLFormElement>) => {
    const form: any = event.target as HTMLFormElement;
    event.preventDefault();
  };
  return (
    <Modal onClose={() => setApproveTransaction({})}>
      <form onSubmit={handleApprove}>
        <div className={styles.modal}>
          <h1 className={styles.modal__title}>Approve Transaction</h1>
          <p>Are you sure you want to approve this transaction?</p>
          <br />
          <div className={styles.modal__status}>
            <Select
              className={styles.modal__status__select}
              name="status"
              label="Status"
              defaultValue={approveTransaction?.status}
              options={[
                { label: "Settlement", value: "settlement" },
                { label: "Approve", value: "approve" },
                { label: "Reject", value: "reject" },
                { label: "Pending", value: "pending" },
              ]}
            />
          </div>
        </div>
        <Button className={styles.modal__button} type="submit">
          {isLoading ? "Deleting..." : "Yes, Approve"}
          <i className="bx bx-check" />
        </Button>
      </form>
    </Modal>
  );
};

export default ModalApproveTransaction;
