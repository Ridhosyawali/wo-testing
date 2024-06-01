import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import styles from "./ModalAddProduct.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { Product } from "@/types/product.type";
import InputFile from "@/components/ui/InputFile";

type Proptypes = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

const ModalAddProduct = (props: Proptypes) => {
  const { setModalAddProduct, setToaster, setProductsData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h1 className={styles.modal__title}>Update User</h1>
      <form onSubmit={() => {}} className={styles.modal_form}>
        <Input
          label="Name"
          placeholder="Insert product name"
          name="Name"
          type="Text"
        />
        <Input
          label="Price"
          placeholder="Insert product price"
          name="price"
          type="number"
        />
        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Released", value: "true" },
            { label: "Not Released", value: "false" },
          ]}
        />
        <label htmlFor="image">Image</label>
        <InputFile
          name="image"
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
        />
        <Button
          type="submit"
          disabled={isLoading}
          variant="update"
          className={styles.modal__button}
        >
          {isLoading ? "Loading..." : "Add Product"}
        </Button>
      </form>
    </Modal>
  );
};
export default ModalAddProduct;
