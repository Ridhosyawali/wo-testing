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
  // const [sizeguideCount, setSizeGuideCount] = useState(
  //   updatedProduct.sizeguide
  // );
  const [detailCount, setDetailCount] = useState(updatedProduct.detail);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleStock = (e: any, i: number, type: string) => {
    const newStockCout: any = [...stockCount];
    newStockCout[i][type] = e.target.value;
    setStockCount(newStockCout);
  };

  // const handleSizeguide = (e: any, i: number, type: string) => {
  //   const newSizeguideCount: any = [...sizeguideCount];
  //   newSizeguideCount[i][type] = e.target.value;
  //   setSizeGuideCount(newSizeguideCount);
  // };

  const handledetail = (e: any, i: number, type: string) => {
    const newdetailCout: any = [...detailCount];
    newdetailCout[i][type] = e.target.value;
    setDetailCount(newdetailCout);
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
      image: newImageURL,
      description: form.description.value,
      stock: stock,
      // sizeguide: sizeguide,
      detail: detail,
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

  const handleDeleteStock = (index: number) => {
    const newStockCount = [...stockCount];
    newStockCount.splice(index, 1);
    setStockCount(newStockCount);
  };

  const CategoriesType = [
    {
      value: "",
      label: "--- Pilih Kategori ---",
      disabled: true,
      selected: true,
      className: "placeholder",
    },
    {
      label: "Katering",
      value: "Catering",
    },
    { label: "Dekorasi", value: "Decoration" },
    { label: "Make Up", value: "Make Up" },
    { label: "Photographer", value: "Photographer" },
    { label: "Paket Pernikahan", value: "Wedding" },
    { label: "Sound", value: "Sound System" },
  ];

  const Locations = [
    {
      value: "",
      label: "--- Pilih location ---",
      disabled: true,
      selected: true,
      className: "placeholder",
    },
    {
      label: "Jakarta",
      value: "Jakarta",
    },
    { label: "Bogor", value: "Bogor" },
    { label: "Depok", value: "Depok" },
    { label: "Tangerang", value: "Tangerang" },
    { label: "Bekasi", value: "Bekasi" },
  ];

  return (
    <Modal onClose={() => setUpdatedProduct(false)}>
      <h1 className={styles.modal__title}>Update Home</h1>
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

        <div className={styles.modal__form__detail}>
          <Textarea
            label="Description"
            placeholder="Insert product Description"
            name="description"
            className={styles.modal__form__input}
            defaultValue={updatedProduct.description}
          />

          {detailCount.map(
            (
              item: {
                colour: string;
                material: string;
                traditional: string;
                model: string;
                fit_type: string;
                additional: string;
              },
              i: number
            ) => (
              <div className={styles.modal__form__detail__list} key={i}>
                <div className={styles.modal__form__detail__list__item}>
                  <Input
                    label="Colour"
                    placeholder="Insert product colour"
                    name="colour"
                    type="text"
                    className={styles.modal__form__input}
                    onChange={(e) => {
                      handledetail(e, i, "colour");
                    }}
                    defaultValue={item.colour}
                  />
                </div>
                <div className={styles.modal__form__detail__list__item}>
                  <Input
                    label="Material"
                    placeholder="Insert product material"
                    name="material"
                    type="text"
                    className={styles.modal__form__input}
                    onChange={(e) => {
                      handledetail(e, i, "material");
                    }}
                    defaultValue={item.material}
                  />
                </div>
                <div className={styles.modal__form__detail__list__item}>
                  <Input
                    label="Traditional"
                    placeholder="Insert product traditional"
                    name="traditional"
                    type="text"
                    className={styles.modal__form__input}
                    onChange={(e) => {
                      handledetail(e, i, "traditional");
                    }}
                    defaultValue={item.traditional}
                  />
                </div>
                <div className={styles.modal__form__detail__list__item}>
                  <Input
                    label="Model"
                    placeholder="Insert product model"
                    name="model"
                    type="text"
                    className={styles.modal__form__input}
                    onChange={(e) => {
                      handledetail(e, i, "model");
                    }}
                    defaultValue={item.model}
                  />
                </div>
                <div className={styles.modal__form__detail__list__item}>
                  <Input
                    label="Fit Type"
                    placeholder="Insert product fit type"
                    name="fit_type"
                    type="text"
                    className={styles.modal__form__input}
                    onChange={(e) => {
                      handledetail(e, i, "fit_type");
                    }}
                    defaultValue={item.fit_type}
                  />
                </div>
                <div className={styles.modal__form__detail__list__item}>
                  <Input
                    label="Additional"
                    placeholder="Insert product detail"
                    name="additional"
                    type="text"
                    className={styles.modal__form__input}
                    onChange={(e) => {
                      handledetail(e, i, "additional");
                    }}
                    defaultValue={item.additional}
                  />
                </div>
              </div>
            )
          )}
        </div>

        {/* {sizeguideCount.map((item: { ld: string; pb: string }, i: number) => (
          <div className={styles.modal__sizeguide} key={i}>
            <div className={styles.modal__sizeguide__item}>
              <Input
                label={
                  i === 0
                    ? "S Chest(lingkar dada)"
                    : i === 1
                    ? "M Chest(lingkar dada)"
                    : i === 2
                    ? "L Chest(lingkar dada)"
                    : "XL Chest(lingkar dada)"
                }
                placeholder="Insert product chest"
                name="ld"
                type="text"
                className={styles.modal__form__input}
                onChange={(e) => {
                  handleSizeguide(e, i, "ld");
                }}
                defaultValue={item.ld}
              />
            </div>
            <div className={styles.modal__sizeguide__item}>
              <Input
                label="Length (Panjang Baju)"
                placeholder="Insert product shirt length"
                name="pb"
                type="text"
                className={styles.modal__form__input}
                onChange={(e) => {
                  handleSizeguide(e, i, "pb");
                }}
                defaultValue={item.pb}
              />
            </div>
          </div>
        ))} */}
        {/* <Button
          variant=""
          type="button"
          className={styles.modal__stock__button}
          onClick={() =>
            setSizeGuideCount([...sizeguideCount, { ld: "", pb: "" }])
          } */}
        {/* >
          <i className="bx bx-plus" />
          Add Spesific Size
        </Button> */}

        <Select
          label="Category"
          name="category"
          defaultValue={updatedProduct.category}
          className={styles.modal__form__select}
          options={CategoriesType}
        />
        <Select
          label="Location"
          name="location"
          defaultValue={updatedProduct.location}
          className={styles.modal__form__select}
          options={Locations}
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
            <div className={styles.modal__stock__item__min}>
              <Button
                type="button"
                variant=""
                onClick={() => handleDeleteStock(i)}
                className={styles.modal__stock__item__min__button}
              >
                <i className="bx bx-minus" />
              </Button>
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
