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

type PropTypes = {
  orders: User[];
};
const TransactionsAdminView = (props: PropTypes) => {
  const { orders } = props;
  const [ordersData, setOrdersData] = useState<User[]>([]);
  const { setToaster } = useContext(ToasterContext);

  const [updateOrder, setUpdateOrder] = useState<User | {}>({});
  const [approveOrder, setApproveOrder] = useState<User | {}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);

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

  const handleDelete = async (userID: string, order_id: string) => {
    const newTransaction = transaction.filter((item: { order_id: string }) => {
      return item.order_id !== order_id;
    });
    try {
      const result = await orderServices.deleteOrder(userID, {
        transaction: newTransaction,
      });
      if (result.status === 200) {
        setTransaction(newTransaction);
        setIsLoading(false);
        const { data } = await userServices.getAllUsers();
        setOrdersData(data.data);
        setToaster({
          variant: "success",
          message: "Success Delete Transaction",
        });
        // Jika berhasil, Anda dapat melakukan operasi lainnya, seperti memperbarui state atau melakukan refresh data
      } else {
        setIsLoading(false);
        setToaster({
          variant: "danger",
          message: "Failed Delete Transaction",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete Transaction",
      });
    }
  };

  return (
    <>
      <AdminLayout>
        <div className={styles.homes}>
          <h2 className={styles.homes__title}>Transaksi Management</h2>
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
                .filter((orders) => orders.transaction)
                .map((orders: any) =>
                  orders?.transaction?.map((item: any) => (
                    <tr key={item.order_id}>
                      <td>{orders?.fullname}</td>
                      <td>{item?.status}</td>
                      <td>{item.address?.recipient}</td>
                      <td>{moment(item?.startDate).format("LL")}</td>
                      <td>{moment(item?.endDate).format("LL")}</td>
                      <td>{convertIDR(item?.remaining)}</td>
                      <td>
                        <strong>{convertIDR(item?.totalall)}</strong>
                      </td>

                      <td>
                        <div className={styles.homes__table__action}>
                          <Button
                            type="button"
                            variant="accept"
                            onClick={() =>
                              setUpdateOrder({
                                ...item,
                                fullname: orders.fullname,
                              })
                            }
                          >
                            <i className="bx bxs-detail" />
                          </Button>
                          {item.status !== "approve" && (
                            <Button
                              type="button"
                              variant="accept"
                              onClick={() =>
                                setApproveOrder({
                                  ...item,
                                  id: orders.id,
                                  fullname: orders.fullname,
                                })
                              }
                              // disabled={data?.status === "pending"}
                            >
                              <i className="bx bx-check" />
                            </Button>
                          )}
                          <Button
                            type="button"
                            variant="delete"
                            onClick={() =>
                              handleDelete(orders.id, item.order_id)
                            }
                          >
                            <i className="bx bx-trash" />
                          </Button>
                        </div>
                      </td>
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
