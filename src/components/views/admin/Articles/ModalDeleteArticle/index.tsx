import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import styles from "./ModalDeleteProduct.module.scss";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { deleteFile } from "@/lib/firebase/service";
import { ToasterContext } from "@/context/ToasterContext";
import articleServices from "@/services/article";
import { Article } from "@/types/article.type";

type Proptypes = {
  setArticlesData: Dispatch<SetStateAction<Article[]>>;
  deletedArticle: Article | any;
  setDeletedArticle: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteArticle = (props: Proptypes) => {
  const { setDeletedArticle, deletedArticle, setArticlesData } = props;

  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await articleServices.deleteArticles(deletedArticle.id);
    if (result.status === 200) {
      setIsLoading(false);
      deleteFile(
        `/images/articles/${deletedArticle.id}/${
          deletedArticle.image.split("%2F")[3].split("?")[0]
        }`,
        async (status: boolean) => {
          if (status) {
            setToaster({
              variant: "success",
              message: "Success Delete Product",
            });
            setDeletedArticle({});
            const { data } = await articleServices.getAllArticles();
            setArticlesData(data.data);
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
    <Modal onClose={() => setDeletedArticle({})}>
      <div className={styles.modal}>
        <h1 className={styles.modal__title}>Delete Article</h1>
        <p>Apakah anda yakin ingin menghapus artikel ini?</p>
      </div>
      <Button
        className={styles.modal__button}
        type="button"
        variant="delete"
        onClick={() => handleDelete()}
      >
        {isLoading ? "Deleting..." : "Yes, delete"}
        <i className="bx bx-check" />
      </Button>
    </Modal>
  );
};

export default ModalDeleteArticle;
