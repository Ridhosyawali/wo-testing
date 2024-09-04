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
import { Transactions } from "@/types/transactions.type";
import ordersServices from "@/services/orders";
import historyServices from "@/services/history";

type Proptypes = {
  approveTransaction: Transactions | any;
  setApproveTransaction: Dispatch<SetStateAction<{}>>;
  setOrdersData: Dispatch<SetStateAction<Transactions[]>>;
};

const ModalApproveTransaction = (props: Proptypes) => {
  const { setApproveTransaction, approveTransaction, setOrdersData } = props;

  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsCount, setItemsCount] = useState(approveTransaction.items);

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

    setIsLoading(true);

    const data = {
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
      transactionDate: approveTransaction.createdAt,
      userId: approveTransaction.userId,
      address: {
        recipient: approveTransaction.address.recipient,
        addressLine: approveTransaction.address.addressLine,
        note: approveTransaction.address.note,
        phone: approveTransaction.address.phone,
      },
    };

    const result = await historyServices.addHistory(data);
    const result2 = await ordersServices.deleteTransaction(
      approveTransaction.id
    );
    if (result.status === 200 && result2.status === 200) {
      setIsLoading(false);
      setApproveTransaction({});
      const { data } = await ordersServices.getAllOrders();
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

  console.log(approveTransaction);

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
          {isLoading ? "Updating..." : "Ya, Setuju"}
          <i className="bx bx-check" />
        </Button>
      </form>
    </Modal>
  );
};

export default ModalApproveTransaction;
