import { Product } from "@/types/product.type";
import styles from "./DetailProduct.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import Button from "@/components/ui/Button";

type PropTypes = {
  product: Product | any;
};

const DetailProductView = (props: PropTypes) => {
  const { product } = props;
  console.log(product);
  return (
    <div className={styles.detail}>
      <div className={styles.detail__main}>
        <div className={styles.detail__main__left}>
          <Image
            alt={product?.name}
            src={product?.image}
            width={500}
            height={500}
            className={styles.detail__main__left__image}
          />
        </div>
        <div className={styles.detail__main__right}>
          <h1 className={styles.detail__main__right__title}>{product?.name}</h1>
          <h3 className={styles.detail__main__right__category}>
            {product?.category}
          </h3>
          <h3 className={styles.detail__main__right__price}>
            {convertIDR(product?.price)}
          </h3>
          <div>
            <Button
              type="submit"
              variant=""
              className={styles.detail__main__right__add}
            >
              Add to Cart
            </Button>
          </div>
          <div className={styles.detail__main__right__description}>
            <p>{product?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductView;
