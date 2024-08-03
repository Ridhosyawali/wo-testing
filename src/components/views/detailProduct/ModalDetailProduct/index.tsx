import Modal from "@/components/ui/Modal";
import styles from "./ModalDetailProduct.module.scss";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Product } from "@/types/product.type";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import ProductDesc from "../ProductDesc";

type Proptypes = {
  product: Product | any;
  setDetailProduct: Dispatch<SetStateAction<boolean>>;
  products: Product[];
};

const ModalDetailProduct = (props: Proptypes) => {
  const { product, setDetailProduct, products } = props;

  return (
    <Modal onClose={() => setDetailProduct(false)}>
      <div className={styles.modal}>
        <div className={styles.modal__top}>
          <Image
            alt={product?.name}
            src={product?.image}
            width={50}
            height={50}
            className={styles.modal__top__image}
          />
          <div className={styles.modal__top__image__info}>
            <p>{product.name}</p>
            <p>{convertIDR(product?.price)}</p>
          </div>
        </div>
        <div className={styles.modal__description}>
          <ProductDesc productDesc={product?.description} />
        </div>
        <div className={styles.modal__detail}>
          {product.detail.some(
            (item: any) =>
              item.colour ||
              item.material ||
              item.traditional ||
              item.fit_type ||
              item.model ||
              item.additional
          ) ? (
            <>
              <h4>Product Detail</h4>
              {product.detail.map((item: any, index: number) => (
                <div className={styles.modal__detail__item} key={index}>
                  {item?.colour && <li>Warna : {item?.colour}</li>}
                  {item?.material && <li>Bahan : {item?.material}</li>}
                  {item?.traditional && <li>Adat : {item?.traditional}</li>}
                  {item?.fit_type && <li>Jenis Potongan : {item?.fit_type}</li>}
                  {item?.model && <li>Model : {item?.model}</li>}
                  {item?.additional && <li>Tambahan : {item?.additional}</li>}
                </div>
              ))}
            </>
          ) : (
            <p></p>
          )}
          {/* <h4>Size Guide</h4>
          <table className={styles.modal__table}>
            <thead>
              <tr>
                <th></th>
                <th>Lingkar Dada</th>
                <th>Panjang Baju</th>
              </tr>
            </thead>
            <tbody>
              {product?.sizeguide?.map((item: any, index: number) => (
                <Fragment key={index}>
                  <tr>
                    <td>
                      {index === 0
                        ? "S"
                        : index === 1
                        ? "M"
                        : index === 2
                        ? "L"
                        : "XL"}
                    </td>
                    <td>{item.ld}</td>
                    <td>{item.pb}</td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table> */}
          {/* JIKA INGIN MENGGUNAKAN SIZE GUIDE */}
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailProduct;
