import Modal from "@/components/ui/Modal";
import styles from "./ModalAddHome.module.scss";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import InputFile from "@/components/ui/InputFile";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";

import { ToasterContext } from "@/context/ToasterContext";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import articleServices from "@/services/article";
import { Article } from "@/types/article.type";

type Proptypes = {
  setModalAddArticle: Dispatch<SetStateAction<boolean>>;
  setArticlesData: Dispatch<SetStateAction<Article[]>>;
};

const ModalAddArticle = (props: Proptypes) => {
  const { setModalAddArticle, setArticlesData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { setToaster } = useContext(ToasterContext);

  const uploadImage = (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "main." + file.name.split(".")[1];
    if (file) {
      uploadFile(
        id,
        file,
        newName,
        "articles",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const result = await articleServices.updateArticles(id, data);
            if (result.status === 200) {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setModalAddArticle(false);
              const { data } = await articleServices.getAllArticles();
              setArticlesData(data.data);
              setToaster({
                variant: "success",
                message: "Success Add Home",
              });
            } else {
              setIsLoading(false);
              setToaster({
                variant: "danger",
                message: "Failed Add Home",
              });
            }
          } else {
            setIsLoading(false);
            setToaster({
              variant: "danger",
              message: "Failed Add Home",
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
    const data = {
      judul: form.judul.value,
      isi: form.isi.value,
      location: form.location.value,
      image: "",
      linkproduct: form.linkproduct.value,
    };
    if (uploadedImage === null) {
      setToaster({
        variant: "danger",
        message: "Please choose an image",
      });
      setIsLoading(false);
      return;
    }
    const result = await articleServices.addArticles(data);

    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
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
    <Modal onClose={() => setModalAddArticle(false)}>
      <h1 className={styles.modal__title}>Add Home</h1>
      <form onSubmit={handleSubmit} className={styles.modal_form}>
        <Input
          label="Judul"
          placeholder="Insert judul"
          name="judul"
          type="text"
          className={styles.modal__form__input}
        />
        <Input
          label="link product"
          placeholder="Insert link product"
          name="linkproduct"
          type="text"
          className={styles.modal__form__input}
        />
        <Textarea
          label="Isi"
          placeholder="Insert isi"
          name="isi"
          className={styles.modal__form__input}
        />
        <Select
          label="Location"
          name="location"
          className={styles.modal__form__select}
          options={Locations}
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
        <div>
          <Button
            type="submit"
            disabled={isLoading}
            variant="update"
            className={styles.modal__button}
          >
            {isLoading ? "Loading..." : "Add Article"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default ModalAddArticle;
