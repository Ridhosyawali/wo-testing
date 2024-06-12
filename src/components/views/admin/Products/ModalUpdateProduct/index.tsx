import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import styles from "./ModalUpdateProduct.module.scss";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Product } from "@/types/product.type";
import InputFile from "@/components/ui/InputFile";
import productServices from "@/services/product";
import { uploadFile } from "@/lib/firebase/service";
import Image from "next/image";
import Textarea from "@/components/ui/Textarea";
import { ToasterContext } from "@/context/ToasterContext";

type Proptypes = {
  updatedProduct: Product | any;
  setUpdatedProduct: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

const ModalUpdateProduct = (props: Proptypes) => {
  const { updatedProduct, setUpdatedProduct, setProductsData } = props;

  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState(updatedProduct.stock);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleStock = (e: any, i: number, type: string) => {
    const newStockCout: any = [...stockCount];
    newStockCout[i][type] = e.target.value;
    setStockCount(newStockCout);
  };

  const updateProduct = async (
    form: any,
    newImageURL: string = updatedProduct.image
  ) => {
    const stock = stockCount.map((stock: { size: string; qty: number }) => {
      return {
        size: stock.size,
        qty: parseInt(`${stock.qty}`),
      };
    });
    const data = {
      name: form.name.value,
      price: parseInt(form.price.value),
      category: form.category.value,
      status: form.status.value,
      image: newImageURL,
      description: form.description.value,
      stock: stock,
    };
    const result = await productServices.updateProduct(updatedProduct.id, data);
    if (result.status === 200) {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedProduct(false);
      const { data } = await productServices.getAllProducts();
      setProductsData(data.data);
      setToaster({
        variant: "success",
        message: "Success Update Product",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Update Product",
      });
    }
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const file = form.image.files[0];
    if (file) {
      const newName = "main." + file.name.split(".")[1];
      uploadFile(
        updatedProduct.id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            updateProduct(form, newImageURL);
          } else {
            setIsLoading(false);
            setToaster({
              variant: "danger",
              message: "Failed Update Product",
            });
          }
        }
      );
    } else {
      updateProduct(form);
    }
  };
  return (
    <Modal onClose={() => setUpdatedProduct(false)}>
      <h1 className={styles.modal__title}>Update User</h1>
      <form onSubmit={handleSubmit} className={styles.modal_form}>
        <Input
          label="Name"
          placeholder="Insert product name"
          name="name"
          type="Text"
          defaultValue={updatedProduct.name}
          className={styles.modal__form__input}
        />
        <Input
          label="Price"
          placeholder="Insert product price"
          name="price"
          type="number"
          defaultValue={updatedProduct.price}
          className={styles.modal__form__input}
        />

        {/* <Input
          label="Description"
          placeholder="Insert product Description"
          name="description"
          type="textarea"
          defaultValue={updatedProduct.description}
          className={styles.modal__form__input}
        /> */}

        <Textarea
          label="Description"
          placeholder="Insert product Description"
          name="description"
          className={styles.modal__form__input}
          defaultValue={updatedProduct.description}
        />

        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men", value: "Men" },
            { label: "Women", value: "Women" },
            { label: "Other", value: "Other" },
          ]}
          defaultValue={updatedProduct.category}
          className={styles.modal__form__select}
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Released", value: "true" },
            { label: "Not Released", value: "false" },
          ]}
          defaultValue={updatedProduct.status}
          className={styles.modal__form__select}
        />
        <label htmlFor="image">Image</label>
        <div className={styles.modal__image}>
          <Image
            width={200}
            height={200}
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : updatedProduct.image
            }
            alt="image"
            className={styles.modal__image__preview}
          />
          <div className={styles.modal__image__upload}>
            <InputFile
              name="image"
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
            />
          </div>
        </div>
        <label htmlFor="stock" className={styles.modal__stock__subtitle}>
          Stock
        </label>
        <hr className={styles.modal__devider} />

        {stockCount.map((item: { size: string; qty: number }, i: number) => (
          <div className={styles.modal__stock} key={i}>
            <div className={styles.modal__stock__item}>
              <Input
                label="SIZE"
                placeholder="Insert product size"
                name="size"
                type="text"
                className={styles.modal__form__input}
                onChange={(e) => {
                  handleStock(e, i, "size");
                }}
                defaultValue={item.size}
              />
            </div>
            <div className={styles.modal__stock__item}>
              <Input
                label="QTY"
                placeholder="Insert product quantity"
                name="qty"
                type="number"
                className={styles.modal__form__input}
                onChange={(e) => {
                  handleStock(e, i, "qty");
                }}
                defaultValue={item.qty}
              />
            </div>
          </div>
        ))}
        <Button
          variant=""
          type="button"
          className={styles.modal__stock__button}
          onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
        >
          <i className="bx bx-plus" />
          Add New Stock
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          variant="update"
          className={styles.modal__button}
        >
          {isLoading ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </Modal>
  );
};
export default ModalUpdateProduct;
