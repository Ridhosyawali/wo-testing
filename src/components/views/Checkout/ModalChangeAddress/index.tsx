import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import styles from "./ModalChangeAddress.module.scss";
import { Dispatch, SetStateAction } from "react";

type Proptypes = {
  address: any;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  selectedAddress: number;
};

const ModalChangeAddress = (props: Proptypes) => {
  const { address, setChangeAddress, setSelectedAddress, selectedAddress } =
    props;
  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <div className={styles.modal}>
        <h1 className={styles.modal__title}>Change Shipping Address</h1>
        {address.map((item: any, id: number) => (
          <div
            key={item.addressLine}
            className={`${styles.modal__address} ${
              id === selectedAddress && styles["modal__address--active"]
            }`}
            onClick={() => {
              setSelectedAddress(id);
              setChangeAddress(false);
            }}
          >
            <h4 className={styles.modal__address__title}>
              Recipient: {item.recipient}
            </h4>
            <p>Phone: {item.phone}</p>
            <p>Address: {item.addressLine}</p>
            <p>Note: {item.note}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ModalChangeAddress;
