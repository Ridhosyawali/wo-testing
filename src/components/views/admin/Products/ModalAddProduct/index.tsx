import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import styles from "./ModalAddProduct.module.scss";
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
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

const ModalAddProduct = (props: Proptypes) => {
  const { setModalAddProduct, setProductsData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  // const [sizeguideCount, setSizeguideCount] = useState([{ ld: "", pb: "" }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [detailCount, setDetailCount] = useState([
    {
      colour: "",
      material: "",
      traditional: "",
      fit_type: "",
      model: "",
      additional: "",
    },
  ]);

  const uploadImage = (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "main." + file.name.split(".")[1];
    if (file) {
      uploadFile(
        id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const result = await productServices.updateProduct(id, data);
            if (result.status === 200) {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setModalAddProduct(false);
              const { data } = await productServices.getAllProducts();
              setProductsData(data.data);
              setToaster({
                variant: "success",
                message: "Success Add Product",
              });
            } else {
              setIsLoading(false);
              setToaster({
                variant: "danger",
                message: "Failed Add Product",
              });
            }
          } else {
            setIsLoading(false);
            setToaster({
              variant: "danger",
              message: "Failed Add Product",
            });
          }
        }
      );
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const stock = stockCount.map((stock) => {
      return {
        size: stock.size,
        qty: parseInt(`${stock.qty}`),
      };
    });
    // const sizeguide = sizeguideCount.map(
    //   (sizeguide: { ld: string; pb: string }) => {
    //     return {
    //       ld: sizeguide.ld,
    //       pb: sizeguide.pb,
    //     };
    //   }
    // );
    const detail = detailCount.map(
      (detail: {
        colour: string;
        material: string;
        traditional: string;
        model: string;
        additional: string;
        fit_type: string;
      }) => {
        return {
          colour: detail.colour,
          material: detail.material,
          traditional: detail.traditional,
          model: detail.model,
          additional: detail.additional,
          fit_type: detail.fit_type,
        };
      }
    );
    const data = {
      name: form.name.value,
      price: parseInt(form.price.value),
      category: form.category.value,
      status: form.status.value,
      location: form.location.value,
      stock: stock,
      detail: detail,
      // sizeguide: sizeguide,
      description: form.description.value,
      image: "",
    };

    if (uploadedImage === null) {
      setToaster({
        variant: "danger",
        message: "Please choose an image",
      });
      setIsLoading(false);
      return;
    }

    if (!data.category) {
      setToaster({
        variant: "danger",
        message: "Please choose a category",
      });
      setIsLoading(false);
      return;
    }

    if (!data.location) {
      setToaster({
        variant: "danger",
        message: "Please insert product name",
      });
      setIsLoading(false);
      return;
    }

    const result = await productServices.addProduct(data);

    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
    }
  };

  const handleStock = (e: any, i: number, type: string) => {
    const newStockCout: any = [...stockCount];
    newStockCout[i][type] = e.target.value;
    setStockCount(newStockCout);
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h1 className={styles.modal__title}>Add Product</h1>
      <form onSubmit={handleSubmit} className={styles.modal_form}>
        <Input
          label="Name"
          placeholder="Insert product name"
          name="name"
          type="text"
          className={styles.modal__form__input}
        />
        <Input
          label="Price"
          placeholder="Insert product price"
          name="price"
          type="number"
          className={styles.modal__form__input}
        />

        <Textarea
          label="Description"
          placeholder="Insert product Description"
          name="description"
          className={styles.modal__form__input}
        />

        <Select
          label="Category"
          name="category"
          options={[
            {
              value: "",
              label: "--- Pilih category ---",
              disabled: true,
              selected: true,
              className: "placeholder",
            },
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
            { label: "Make Up", value: "make_up" },
            { label: "Dekoration", value: "dekoration" },
            { label: "Catering", value: "catering" },
          ]}
          className={styles.modal__form__select}
        />
        <Select
          label="Location"
          name="location"
          className={styles.modal__form__select}
          options={[
            {
              value: "",
              label: "--- Pilih location ---",
              disabled: true,
              selected: true,
              className: "placeholder",
            },
            { label: "Bandung", value: "Bandung" },
            { label: "Tangerang", value: "Tangerang" },
            { label: "Bekasi", value: "Bekasi" },
          ]}
        />
        <Select
          label="Status"
          name="status"
          options={[
            {
              value: "",
              label: "--- Pilih status ---",
              disabled: true,
              selected: true,
              className: "placeholder",
            },
            { label: "Released", value: "true" },
            { label: "Not Released", value: "false" },
          ]}
          className={styles.modal__form__select}
        />

        <label className={styles.modal__image__subtitle} htmlFor="image">
          Image
        </label>
        <div className={styles.modal__image}>
          {uploadedImage ? (
            <Image
              width={200}
              height={200}
              src={URL.createObjectURL(uploadedImage)}
              alt="image"
              className={styles.modal__image__preview}
            />
          ) : (
            <div className={styles.modal__image__placeholder}>No Image</div>
          )}
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
          Add Stock
        </Button>

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
