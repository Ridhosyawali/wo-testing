import AdminLayout from "@/components/layouts/AdminLayout";
import styles from "./Home.module.scss";
import Button from "@/components/ui/Button";
import { Fragment, useEffect, useState } from "react";

import { User } from "@/types/user.type";
import { convertIDR } from "@/utils/currency";
import moment from "moment";
import { Product } from "@/types/product.type";
import ModalUpdateTransaction from "./ModalUpdateTransaction";

type PropTypes = {
  orders: User[];
};
const TransactionsAdminView = (props: PropTypes) => {
  const { orders } = props;
  const [ordersData, setOrders] = useState<User[]>([]);

  const [deletedArticle, setDeletedArticle] = useState<User | {}>({});
  const [updateOrder, setUpdateOrder] = useState<User | {}>({});
  const [agenda, setAgenda] = useState<Product | {}>({});

  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 15; // Jumlah produk yang ingin ditampilkan per halaman

  const handleNextClick = () => {
    setStartIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const handlePreviousClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };

  const visibleArticles = ordersData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setOrders(orders);
  }, [orders]);

  return (
    <>
      <AdminLayout>
        <div className={styles.homes}>
          <h2 className={styles.homes__title}>Order Management</h2>
          <table className={styles.homes__table}>
            <thead>
              <tr>
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Nama</th>
                <th rowSpan={2}>Pemesan</th>
                <th colSpan={2}>Transaksi</th>
                <th colSpan={2}>Pelaksanaan</th>
                <th rowSpan={2}>Total Harga</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th>Uang Muka</th>
                <th>Sisa Bayar</th>
                <th>Mulai</th>
                <th>Berakhir</th>
              </tr>
            </thead>
            <tbody>
              {visibleArticles
                .filter((orders) => orders.transaction)
                .map((orders: any) =>
                  orders.transaction.map((data: any, index: number) => (
                    <Fragment key={data.id}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{orders.fullname}</td>
                        <td>{data.address?.recipient}</td>
                        <td>{convertIDR(data.total)}</td>
                        <td>{convertIDR(data.remaining)}</td>
                        <td>{moment(data.startDate).format("LL")}</td>
                        <td>{moment(data.endDate).format("LL")}</td>
                        <td>{convertIDR(data.totalall)}</td>

                        <td>
                          <div className={styles.homes__table__action}>
                            <Button
                              type="button"
                              variant="accept"
                              onClick={() => setUpdateOrder(data)}
                            >
                              <i className="bx bxs-detail" />
                            </Button>
                            <Button
                              type="button"
                              variant="delete"
                              onClick={() => setDeletedArticle(data)}
                            >
                              <i className="bx bx-trash" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </Fragment>
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
            {visibleArticles.length < ordersData.length && (
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
      </AdminLayout>
      {/* {Object.keys(deletedArticle).length > 0 && (
        <ModalDeleteArticle
          setDeletedArticle={setDeletedArticle}
          deletedArticle={deletedArticle}
          setOrders={setOrders}
        />
      )} */}
      {Object.keys(updateOrder).length > 0 && (
        <ModalUpdateTransaction
          updatedOrder={updateOrder}
          setUpdatedOrder={setUpdateOrder}
          setAgenda={setAgenda}
          setOrdersData={setOrders}
        />
      )}
    </>
  );
};
export default TransactionsAdminView;
