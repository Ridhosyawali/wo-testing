import Modal from "@/components/ui/Modal";
import styles from "./ModalChangeAddress.module.scss";
import { Dispatch, SetStateAction } from "react";
import { Product } from "@/types/product.type";

type Proptypes = {
  product: Product | any;
  setDetailProduct: Dispatch<SetStateAction<boolean>>;
  productId: string | string[] | undefined;
};

const ModalDetailProduct = (props: Proptypes) => {
  const { product, setDetailProduct, productId } = props;
  return (
    <Modal onClose={() => setDetailProduct(false)}>
      <div className={styles.modal}>
        <h1 className={styles.modal__title}>Change Shipping Address</h1>
        <div>
          <p>{product?.description}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailProduct;
