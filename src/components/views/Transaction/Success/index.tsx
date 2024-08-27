import Button from "@/components/ui/Button";
import styles from "./Success.module.scss";
import { useRouter } from "next/router";
const SuccessView = () => {
  const { push } = useRouter();
  return (
    <div className={styles.success}>
      <div className={styles.success__container}>
        <div className={styles.success__container__title}>
          <h2>Pembayaran Berhasil</h2>
          <p>
            Silahkan hubungi admin kami dengan click icon whatsapp pada pojok
            kanan bawah, untuk melakukan pelunasan dan fitting baju
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

export default SuccessView;
