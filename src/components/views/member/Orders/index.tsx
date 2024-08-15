import styles from "./Orders.module.scss";
import { useEffect, useState } from "react";
import { User } from "@/types/user.type";
import userServices from "@/services/user";
import { convertIDR } from "@/utils/currency";
import Button from "@/components/ui/Button";
import Script from "next/script";
import ModalDetailOrder from "./ModalDetailOrder";
import productServices from "@/services/product";
import { Transactions } from "@/types/transactions.type";
import moment from "moment";
import { Histories } from "@/types/histories.type.";

type Propstype = {
  transaction: Transactions[];
  history: Histories[];
};
const MemberOrdersView = (props: Propstype) => {
  const { transaction, history } = props;
  const [profile, setProfile] = useState<User | any>({});
  const [detailOrder, setDetailOrder] = useState<any>({});
  const [products, setProducts] = useState<any>([]);

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
  };
  useEffect(() => {
    getProfile();
  }, []);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const filteredTransactions = transaction.filter(
    (trx: any) => trx.userId === profile.id
  );

  const sortedTransactions = filteredTransactions.sort((a: any, b: any) => {
    return moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf();
  });

  const filteredHistory = history.filter(
    (htr: any) => htr.userId === profile.id
  );

  const sortedHistory = filteredHistory.sort((a: any, b: any) => {
    return moment(b.created_at).valueOf() - moment(a.created_at).valueOf();
  });

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <div className={styles.orders}>
        <h2 className={styles.orders__title}>Riwayat Pesanan</h2>
        {sortedTransactions?.length > 0 ? (
          <table className={styles.orders__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Order Id</th>
                <th>Tanggal Pesanan</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions?.map((trx: any, index) => (
                <tr key={trx.id}>
                  <td>{index + 1}</td>
                  <td>{trx.order_id}</td>
                  <td>
                    {moment(trx.createdAt).format("DD - MMMM - YYYY HH:mm")}
                  </td>
                  <td>{trx.total}</td>
                  <td>{trx.status}</td>
                  <td>
                    <div className={styles.orders__table__action}>
                      <Button
                        type="button"
                        onClick={() => setDetailOrder(trx)}
                        className={styles.orders__table__action__edit}
                      >
                        <i className="bx bx-dots-vertical-rounded" />
                      </Button>
                      <Button
                        variant="accept"
                        type="button"
                        onClick={() => {
                          window.snap.pay(trx.token);
                        }}
                        className={styles.orders__table__action__pay}
                        disabled={
                          trx.status !== "pending" && trx.status !== "expired"
                        }
                      >
                        <i className="bx bx-money" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.orders__empty}>
            <h1 className={styles.orders__empty__title}>
              Your orders is empty
            </h1>
          </div>
        )}
      </div>
      <div className={styles.orders}>
        <h2 className={styles.orders__title}>Pesanan Selesai</h2>
        {sortedHistory?.length > 0 ? (
          <div>
            <table className={styles.orders__table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order Id</th>
                  <th>Uang Muka</th>
                  <th>Total Pembayaran</th>
                  <th>Status</th>
                  <th>Tanggal Persetujuan</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedHistory.map((item: any, index: number) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.order_id}</td>
                    <td>{convertIDR(item.total)}</td>
                    <td>{convertIDR(item.totalall)}</td>
                    <td>{item.status}</td>
                    <td>
                      {moment(item.created_at).format("DD - MMMM - YYYY HH:mm")}
                    </td>
                    <td>
                      <div className={styles.orders__table__action}>
                        <Button
                          type="button"
                          onClick={() => setDetailOrder(item)}
                          className={styles.orders__table__action__edit}
                        >
                          <i className="bx bx-dots-vertical-rounded" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.orders__empty}>
            <h1 className={styles.orders__empty__title}>
              Your orders is empty
            </h1>
          </div>
        )}
      </div>
      {Object.keys(detailOrder).length > 0 && (
        <ModalDetailOrder
          setDetailOrder={setDetailOrder}
          detailOrder={detailOrder}
          products={products}
        />
      )}
    </>
  );
};
export default MemberOrdersView;
