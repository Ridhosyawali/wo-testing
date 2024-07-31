import Button from "@/components/ui/Button";
import styles from "./Success.module.scss";
const SuccessView = () => {
  return (
    <div className={styles.success}>
      <div className={styles.success__container}>
        <div className={styles.success__container__title}>
          <h2>Payment Success</h2>
          <p>
            Silahkan hubungi admin kami dengan click icon whatsapp pada pojok
            kanan bawah, untuk melakukan pelunasan dan fitting baju
          </p>
        </div>
        <Button type="button" variant="accept">
          Check Your Order Here
        </Button>
      </div>
    </div>
  );
};

export default SuccessView;
