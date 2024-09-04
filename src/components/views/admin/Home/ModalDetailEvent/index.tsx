import Modal from "@/components/ui/Modal";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import styles from "./ModalDetailEvent.module.scss";
import moment from "moment";
import { Histories } from "@/types/histories.type.";
import Button from "@/components/ui/Button";
import { ToasterContext } from "@/context/ToasterContext";
import historyServices from "@/services/history";
import Select from "@/components/ui/Select";
type Proptypes = {
  detailEvent: Histories | any;
  setDetailEvent: Dispatch<SetStateAction<{}>>;
  setEventData: Dispatch<SetStateAction<Histories[]>>;
};
const ModalDetailEvent = (props: Proptypes) => {
  const { detailEvent, setDetailEvent, setEventData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [itemsCount, setItemsCount] = useState(detailEvent.items);
  const { setToaster } = useContext(ToasterContext);

  console.log(detailEvent);

  const handleDeleteEvent = async (event: FormEvent<HTMLFormElement>) => {
    const form = event.target as HTMLFormElement;
    event.preventDefault();

    setIsLoading(true);
    const items = itemsCount?.map(
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

    const data = {
      fullname: detailEvent.fullname,
      status: form.status.value,
      endDate: detailEvent.endDate,
      order_id: detailEvent.order_id,
      startDate: detailEvent.startDate,
      total: detailEvent.total,
      redirect_url: detailEvent.redirect_url,
      token: detailEvent.token,
      remaining: detailEvent.remaining,
      totalall: detailEvent.totalall,
      created_at: detailEvent.created_at,
      items: items,
      transactionDate: detailEvent.createdAt,
      userId: detailEvent.userId,
      address: {
        recipient: detailEvent.address.recipient,
        addressLine: detailEvent.address.addressLine,
        note: detailEvent.address.note,
        phone: detailEvent.address.phone,
      },
    };

    const result = await historyServices.updateHistory(detailEvent.id, data);

    if (result.status === 200) {
      setIsLoading(false);
      setToaster({
        variant: "success",
        message: "Success Delete Event",
      });
      const { data } = await historyServices.getAllHistories();
      setEventData(data.data);
      setDetailEvent({});
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete Event",
      });
    }
  };

  return (
    <Modal onClose={() => setDetailEvent({})}>
      <form onSubmit={handleDeleteEvent}>
        <h1 className={styles.modal__title}>Detail Event</h1>
        {detailEvent?.items?.map((item: any) => (
          <div key={item.id} className={styles.modal__preview}>
            <div className={styles.modal__preview__desc}>
              <p>ID: {item?.id}</p>
              <p>Nama Product: {item?.name}</p>
              <p>Kategori: {item?.category}</p>
              <p>Size: {item?.size}</p>
            </div>
          </div>
        ))}
        <hr className={styles.modal__devide} />
        <div className={styles.modal__summary}>
          <div className={styles.modal__summary__desc}>
            <p>
              Pelaksanaan : {moment(detailEvent?.startDate).format("LL")} -{" "}
              {moment(detailEvent?.endDate).format("LL")}
            </p>
          </div>
          <hr className={styles.modal__devide} />

          <h4>Data Pemesan</h4>

          <p>Pemesan: {detailEvent?.address?.recipient}</p>
          <p>Alamat: {detailEvent?.address?.addressLine}</p>
          <p>Phone: {detailEvent?.address?.phone}</p>
          <p>Note: {detailEvent?.address?.note}</p>
          <Select
            name="status"
            label="Status"
            defaultValue={detailEvent?.status}
            value={detailEvent?.status}
            className={styles.modal__select}
            options={[
              { label: "Approved", value: "Approved" },
              { label: "Finished", value: "Finished" },
            ]}
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="update"
            className={styles.modal__button}
          >
            {isLoading ? "Loading..." : "Hapus Event"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalDetailEvent;
