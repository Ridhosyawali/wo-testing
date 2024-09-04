import AdminLayout from "@/components/layouts/AdminLayout";
import styles from "./Home.module.scss";
import Button from "@/components/ui/Button";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";

import ModalUpdateArticle from "./ModalUpdateArticle";
import ModalAddArticle from "./ModalAddArticle";
import ModalDeleteArticle from "./ModalDeleteArticle";
import { Article } from "@/types/article.type";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type PropTypes = {
  articles: Article[];
};
const ArticleAdminView = (props: PropTypes) => {
  const { articles } = props;
  const [modalAddArticle, setModalAddArticle] = useState(false);
  const [articlesData, setArticlesData] = useState<Article[]>([]);
  const [updatedArticle, setUpdatedArticle] = useState<Article | {}>({});
  const [deletedArticle, setDeletedArticle] = useState<Article | {}>({});

  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 6; // Jumlah produk yang ingin ditampilkan per halaman

  const handleNextClick = () => {
    setStartIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const handlePreviousClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };

  const visibleArticles = articlesData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setArticlesData(articles);
  }, [articles]);

  return (
    <>
      <AdminLayout>
        <div className={styles.homes}>
          <div>
            <h2 className={styles.homes__title}>Feedback Management</h2>
            <Button
              type="button"
              className={styles.homes__add}
              variant=""
              onClick={() => setModalAddArticle(true)}
            >
              <i className="bx bx-plus" /> Tambah Feedback
            </Button>
            <table className={styles.homes__table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Judul</th>
                  <th>Lokasi</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleArticles.map((home: Article, index: number) => (
                  <Fragment key={home.id}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{home.judul}</td>
                      <td>{home.location}</td>
                      <td>
                        <Image
                          className={styles.homes__table__image}
                          src={home.image}
                          alt={home.judul}
                          width={100}
                          height={100}
                        />
                      </td>
                      <td>
                        <div className={styles.homes__table__action}>
                          <Button
                            type="button"
                            variant="update"
                            onClick={() => setUpdatedArticle(home)}
                          >
                            <i className="bx bx-edit" />
                          </Button>
                          <Button
                            type="button"
                            variant="delete"
                            onClick={() => setDeletedArticle(home)}
                          >
                            <i className="bx bx-trash" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
            <div className={styles.homes__bottom}>
              {startIndex > 0 && (
                <Button
                  type="button"
                  className={styles.homes__bottom__pagination}
                  onClick={handlePreviousClick}
                >
                  Previous
                </Button>
              )}
              {visibleArticles.length < articlesData.length && (
                <Button
                  type="button"
                  className={styles.homes__bottom__pagination}
                  onClick={handleNextClick}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
      {modalAddArticle && (
        <ModalAddArticle
          setModalAddArticle={setModalAddArticle}
          setArticlesData={setArticlesData}
        />
      )}
      {Object.keys(updatedArticle).length > 0 && (
        <ModalUpdateArticle
          setUpdatedArticle={setUpdatedArticle}
          updatedArticle={updatedArticle}
          setArticlesData={setArticlesData}
        />
      )}
      {Object.keys(deletedArticle).length > 0 && (
        <ModalDeleteArticle
          setDeletedArticle={setDeletedArticle}
          deletedArticle={deletedArticle}
          setArticlesData={setArticlesData}
        />
      )}
    </>
  );
};
export default ArticleAdminView;
