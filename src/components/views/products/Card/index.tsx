import styles from "./Card.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";

type Proptypes = {
  product: Product;
};

const Card = (props: Proptypes) => {
  const { product } = props;
  return (
    <div className={styles.card}>
      <Image
        src={product.image}
        alt="product"
        width={500}
        height={500}
        className={styles.card__image}
      />
      <div className={styles.card__content}>
        <div className={styles.card__content__left}>
          <h4 className={styles.card__content__left__title}>{product.name}</h4>
          <p className={styles.card__content__left__category}>
            {product.category}
          </p>
          <p className={styles.card__content__left__price}>
            {convertIDR(product.price)}
          </p>
        </div>
        <div className={styles.card__content__right}>
          <p className={styles.card__content__right__location}>
            {product?.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
