import Button from "@/components/ui/Button";
import styles from "./Failed.module.scss";
import { useRouter } from "next/router";
const FailedView = () => {
  const { push } = useRouter();
  return (
    <div className={styles.failed}>
      <div className={styles.failed__container}>
        <div className={styles.failed__container__title}>
          <h2>Pembayaran Gagal</h2>
          <p>
            Silahkan periksa kembali informasi pembayaran anda dan klik tombol
            dibawah ini
          </p>
        </div>
        <Button
          type="button"
          variant="accept"
          onClick={() => push("/member/orders")}
        >
          Cek Pesanan Anda
        </Button>
      </div>
    </div>
  );
};

export default FailedView;
