import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import { Fragment, useContext, useEffect, useState } from "react";
import styles from "./History.module.scss";

import { User } from "@/types/user.type";
import { convertIDR } from "@/utils/currency";
import moment from "moment";
import { ToasterContext } from "@/context/ToasterContext";
import ModalDetailHistory from "./ModalDetailHistory";

type PropTypes = {
  orders: User[];
};
const HistoryAdminView = (props: PropTypes) => {
  const { orders } = props;
  const [ordersData, setOrdersData] = useState<User[]>([]);

  const [updateOrder, setUpdateOrder] = useState<User | {}>({});

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
    setOrdersData(orders);
  }, [orders]);

  return (
    <>
      <AdminLayout>
        <div className={styles.homes}>
          <h2 className={styles.homes__title}>Riwayat Pesanan</h2>
          <table className={styles.homes__table}>
            <thead>
              <tr>
                <th rowSpan={2}>Nama Users</th>
                <th rowSpan={2}>Status</th>
                <th rowSpan={2}>Nama Pemesan</th>
                <th colSpan={2}>Pelaksanaan</th>
                <th rowSpan={2}>Uang Muka</th>
                <th rowSpan={2}>Total Harga</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th>Mulai</th>
                <th>Berakhir</th>
              </tr>
            </thead>
            <tbody>
              {visibleArticles
                .filter((orders) => orders.history)
                .map((orders: any) =>
                  orders.history.map((data: any) => (
                    <Fragment key={data.id}>
                      <tr>
                        <td>{orders?.fullname}</td>
                        <td>{data?.status}</td>
                        <td>{data.address?.recipient}</td>
                        <td>{moment(data?.startDate).format("LL")}</td>
                        <td>{moment(data?.endDate).format("LL")}</td>
                        <td>{convertIDR(data?.remaining)}</td>
                        <td>
                          <strong>{convertIDR(data?.totalall)}</strong>
                        </td>

                        <td>
                          <div className={styles.homes__table__action}>
                            <Button
                              type="button"
                              variant="accept"
                              onClick={() => setUpdateOrder(data)}
                            >
                              <i className="bx bxs-detail" />
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
      {Object.keys(updateOrder).length > 0 && (
        <ModalDetailHistory
          updatedOrder={updateOrder}
          setUpdatedOrder={setUpdateOrder}
          setOrdersData={setOrdersData}
          orders={orders}
        />
      )}
    </>
  );
};
export default HistoryAdminView;
