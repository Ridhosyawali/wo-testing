import AdminLayout from "@/components/layouts/AdminLayout";
import styles from "./Home.module.scss";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import { Product } from "@/types/product.type";
import { eachDayOfInterval, format } from "date-fns";
import moment from "moment";
import { Transactions } from "@/types/transactions.type";
type PropTypes = {
  products: Product[];
  order: Transactions[];
};
const HomeAdminView = (props: PropTypes) => {
  const { products } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);

  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 5; // Jumlah produk yang ingin ditampilkan per halaman

  const handleNextClick = () => {
    setStartIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const handlePreviousClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };

  const agendaData = products.filter(
    (product) => product.agenda && product.agenda.length > 0
  );

  const visibleProducts = agendaData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  const disabledDates = products
    .filter((product) => product.agenda && product.agenda.length > 0)
    .flatMap((product) =>
      product.agenda.map((agenda) => {
        const startDate = new Date(agenda.startDate);
        const endDate = new Date(agenda.endDate);
        const dates = eachDayOfInterval({ start: startDate, end: endDate });
        return dates.map((date) => date.toISOString());
      })
    )
    .flat();

  return (
    <>
      <AdminLayout>
        <div className={styles.homes}>
          {/* <div className={styles.homes__grafik}>
            <h2>hh</h2>
            <div>
              {order?.map((transaction: any) => (
                <div key={transaction.id}>
                  <p>
                    Created at: {moment(transaction.createdAt).format("LLLL")}
                  </p>
                  <p>{transaction.fullname}</p>
                  <p>{transaction.id}</p>
                </div>
              ))}
            </div>
          </div> */}
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
                  {visibleProducts.map((product) =>
                    product.agenda?.map((agenda) => (
                      <tr key={null}>
                        <td>{moment(agenda?.startDate).format("LL")}</td>
                        <td>{moment(agenda?.endDate).format("LL")}</td>
                        <td>{product?.name}</td>
                        <td>{product?.id}</td>
                      </tr>
                    ))
                  )}
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
                {visibleProducts.length < productsData.length && (
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
        </div>
      </AdminLayout>
    </>
  );
};
export default HomeAdminView;
