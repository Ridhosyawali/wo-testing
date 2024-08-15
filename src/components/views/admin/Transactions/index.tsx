import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import { FormEvent, Fragment, useContext, useEffect, useState } from "react";
import styles from "./Transactions.module.scss";

import { User } from "@/types/user.type";
import { convertIDR } from "@/utils/currency";
import moment from "moment";
import ModalUpdateTransaction from "./ModalUpdateTransaction";
import ModalApproveTransaction from "./ModalApproveTransaction";
import userServices from "@/services/user";
import { ToasterContext } from "@/context/ToasterContext";
import orderServices from "@/services/order";
import { Transactions } from "@/types/transactions.type";

type PropTypes = {
  orders: Transactions[];
};
const TransactionsAdminView = (props: PropTypes) => {
  const { orders } = props;
  const [ordersData, setOrdersData] = useState<Transactions[]>([]);
  const { setToaster } = useContext(ToasterContext);

  const [updateOrder, setUpdateOrder] = useState<Transactions | {}>({});
  const [approveOrder, setApproveOrder] = useState<Transactions | {}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);

  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 10; // Jumlah produk yang ingin ditampilkan per halaman

  const handleNextClick = () => {
    setStartIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const handlePreviousClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };

  const visibleOrders = ordersData.slice(startIndex, startIndex + itemsPerPage);

  const sortedTransactions = visibleOrders.sort((a: any, b: any) => {
    return moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf();
  });

  useEffect(() => {
    setOrdersData(orders);
  }, [orders]);

  return (
    <>
      <AdminLayout>
        <div className={styles.homes}>
          <h2 className={styles.homes__title}>Transaksi Management</h2>
          <table className={styles.homes__table}>
            <thead>
              <tr>
                <th rowSpan={2}>No</th>
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
              {sortedTransactions.map((item: any, index: number) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item?.fullname}</td>
                  <td>{item?.status}</td>
                  <td>{item.address?.recipient}</td>
                  <td>{moment(item?.startDate).format("LL")}</td>
                  <td>{moment(item?.endDate).format("LL")}</td>
                  <td>{convertIDR(item?.total)}</td>
                  <td>
                    <strong>{convertIDR(item?.totalall)}</strong>
                  </td>

                  <td>
                    <div className={styles.homes__table__action}>
                      <Button
                        type="button"
                        variant="accept"
                        onClick={() => setUpdateOrder(item)}
                      >
                        <i className="bx bxs-detail" />
                      </Button>

                      <Button
                        type="button"
                        variant="update"
                        onClick={() => setApproveOrder(item)}
                        disabled={
                          item?.status === "pending" ||
                          item?.status === "expire"
                        }
                      >
                        <i className="bx bx-check" />
                      </Button>
                    </div>
                  </td>
                </tr>
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
            {visibleOrders.length < ordersData.length && (
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
      {Object.keys(approveOrder).length > 0 && (
        <ModalApproveTransaction
          approveTransaction={approveOrder}
          setApproveTransaction={setApproveOrder}
          setOrdersData={setOrdersData}
        />
      )}
      {Object.keys(updateOrder).length > 0 && (
        <ModalUpdateTransaction
          updatedOrder={updateOrder}
          setUpdatedOrder={setUpdateOrder}
          setOrdersData={setOrdersData}
          orders={orders}
        />
      )}
    </>
  );
};
export default TransactionsAdminView;
