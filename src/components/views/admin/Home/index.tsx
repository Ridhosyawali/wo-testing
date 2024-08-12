import AdminLayout from "@/components/layouts/AdminLayout";
import styles from "./Home.module.scss";
import Button from "@/components/ui/Button";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";

import ModalUpdateArticle from "./ModalUpdateArticle";
import ModalAddArticle from "./ModalAddArticle";
import ModalDeleteArticle from "./ModalDeleteHome";
import { Article } from "@/types/article.type";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import { Product } from "@/types/product.type";
import { eachDayOfInterval } from "date-fns";
import moment from "moment";
type PropTypes = {
  articles: Article[];
  products: Product[];
};
const HomeAdminView = (props: PropTypes) => {
  const { articles, products } = props;
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

  const visibleEvent = products.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setArticlesData(articles);
  }, [articles]);

  const disabledDates = products
    .filter((product) => product.agenda && product.agenda.length > 0)
    .flatMap((product) =>
      product.agenda.map((agenda) => {
        const startDate = new Date(agenda.startDate);
        const endDate = new Date(agenda.endDate);
        const dates = eachDayOfInterval({ start: startDate, end: endDate });
        return dates.map((date) => date.toISOString().slice(0, 10));
      })
    )
    .flat();

  return (
    <>
      <AdminLayout>
        <div className={styles.homes}>
          <h2 className={styles.homes__title}>Event Management</h2>
          <div className={styles.homes__event}>
            <Calendar
              className={styles.homes__event__date}
              date={new Date()}
              onChange={(date) => console.log(date)}
              disabledDates={disabledDates.map((date) => new Date(date))}
            />
            <div className={styles.homes__event__desc}>
              <table className={styles.homes__table}>
                <thead>
                  <tr>
                    <th colSpan={2}>Day</th>
                    <th rowSpan={2}>Nama</th>
                    <th rowSpan={2}>Id</th>
                  </tr>
                  <tr>
                    <th>Mulai</th>
                    <th>Selesai</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleEvent
                    .filter((product) => product.agenda)
                    .map((product: any) =>
                      product.agenda.map((agenda: any) => (
                        <tr key={agenda?.id}>
                          <td>{moment(agenda?.startDate).format("LL")}</td>
                          <td>{moment(agenda?.endDate).format("LL")}</td>
                          <td>{product?.name}</td>
                          <td>{product?.id}</td>
                        </tr>
                      ))
                    )}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2 className={styles.homes__title}>Feedback Management</h2>
            <Button
              type="button"
              className={styles.homes__add}
              variant=""
              onClick={() => setModalAddArticle(true)}
            >
              <i className="bx bx-plus" /> Add Feedback
            </Button>
            <table className={styles.homes__table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Judul</th>
                  <th>Isi</th>
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
export default HomeAdminView;
