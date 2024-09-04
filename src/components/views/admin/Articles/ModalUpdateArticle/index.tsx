import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import styles from "./ModalUpdateArticle.module.scss";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import InputFile from "@/components/ui/InputFile";
import { uploadFile } from "@/lib/firebase/service";
import Image from "next/image";
import Textarea from "@/components/ui/Textarea";
import { ToasterContext } from "@/context/ToasterContext";
import articleServices from "@/services/article";
import { Article } from "@/types/article.type";

type Proptypes = {
  updatedArticle: Article | any;
  setUpdatedArticle: Dispatch<SetStateAction<boolean>>;
  setArticlesData: Dispatch<SetStateAction<Article[]>>;
};

const ModalUpdateArticle = (props: Proptypes) => {
  const { updatedArticle, setUpdatedArticle, setArticlesData } = props;

  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const updateArticle = async (
    form: any,
    newImageURL: string = updatedArticle.image
  ) => {
    const data = {
      location: form.location.value,
      judul: form.judul.value,
      isi: form.isi.value,
      image: newImageURL,
      linkproduct: form.linkproduct.value,
    };
    const result = await articleServices.updateArticles(
      updatedArticle.id,
      data
    );
    if (result.status === 200) {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedArticle(false);
      const { data } = await articleServices.getAllArticles();
      setArticlesData(data.data);
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
        updatedArticle.id,
        file,
        newName,
        "articles",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            updateArticle(form, newImageURL);
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
      updateArticle(form);
    }
  };

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
    <Modal onClose={() => setUpdatedArticle(false)}>
      <h1 className={styles.modal__title}>Update Article</h1>
      <form onSubmit={handleSubmit} className={styles.modal_form}>
        <Input
          label="Judul"
          placeholder="Insert judul"
          name="judul"
          type="Text"
          defaultValue={updatedArticle.judul}
          className={styles.modal__form__input}
        />
        <Input
          label="Link Product"
          placeholder="Insert Link Product"
          name="linkproduct"
          type="Text"
          defaultValue={updatedArticle.linkproduct}
          disabled
          className={styles.modal__form__input}
        />
        <Textarea
          label="Isi"
          placeholder="Insert isi"
          name="isi"
          className={styles.modal__form__input}
          defaultValue={updatedArticle.isi}
        />
        <Select
          label="Lokasi"
          name="location"
          defaultValue={updatedArticle.location}
          className={styles.modal__form__select}
          options={Locations}
        />
        <label htmlFor="image">Gambar</label>
        <div className={styles.modal__image}>
          <Image
            width={200}
            height={200}
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : updatedArticle.image
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
        <Button
          type="submit"
          disabled={isLoading}
          variant="update"
          className={styles.modal__button}
        >
          {isLoading ? "Updating..." : "Update Article"}
        </Button>
      </form>
    </Modal>
  );
};
export default ModalUpdateArticle;
