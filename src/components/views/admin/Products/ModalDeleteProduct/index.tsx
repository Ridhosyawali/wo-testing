import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import styles from "./ModalDeleteProduct.module.scss";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { deleteFile } from "@/lib/firebase/service";
import { ToasterContext } from "@/context/ToasterContext";

type Proptypes = {
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  deletedProduct: Product | any;
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteProduct = (props: Proptypes) => {
  const { deletedProduct, setDeletedProduct, setProductsData } = props;

  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await productServices.deleteProduct(deletedProduct.id);
    if (result.status === 200) {
      setIsLoading(false);
      deleteFile(
        `/images/products/${deletedProduct.id}/${
          deletedProduct.image.split("%2F")[3].split("?")[0]
        }`,
        async (status: boolean) => {
          if (status) {
            setToaster({
              variant: "success",
              message: "Success Delete Product",
            });
            setDeletedProduct({});
            const { data } = await productServices.getAllProducts();
            setProductsData(data.data);
          }
        }
      );
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete Product",
      });
    }
  };

  return (
    <Modal onClose={() => setDeletedProduct({})}>
      <div className={styles.modal}>
        <h1 className={styles.modal__title}>Hapus Produk</h1>
        <p>Apakah Anda yakin ingin menghapus Produk ini?</p>
      </div>
      <Button
        className={styles.modal__button}
        type="button"
        variant="delete"
        onClick={() => handleDelete()}
      >
        {isLoading ? "Deleting..." : "Ya, Hapus"}
        <i className="bx bx-check" />
      </Button>
    </Modal>
  );
};

export default ModalDeleteProduct;
