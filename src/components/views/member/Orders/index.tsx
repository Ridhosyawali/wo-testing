import styles from "./Orders.module.scss";
import { useEffect, useState } from "react";
import { User } from "@/types/user.type";
import userServices from "@/services/user";
import { convertIDR } from "@/utils/currency";
import Button from "@/components/ui/Button";
import Script from "next/script";
import ModalDetailOrder from "./ModalDetailOrder";
import productServices from "@/services/product";

const MemberOrdersView = () => {
  const [profile, setProfile] = useState<User | any>({});
  const [changeImage, setChangeImage] = useState<File | any>({});
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

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <div className={styles.orders}>
        <h2 className={styles.orders__title}>Order History</h2>
        {profile?.transaction?.length > 0 ? (
          <div>
            <table className={styles.orders__table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order Id</th>
                  <th>Uang Muka</th>
                  <th>Total Pembayaran</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {profile?.transaction?.map(
                  (transaction: any, index: number) => (
                    <tr key={transaction.order_id}>
                      <td>{index + 1}</td>
                      <td>{transaction.order_id}</td>
                      <td>{convertIDR(transaction.total)}</td>
                      <td>{convertIDR(transaction.totalall)}</td>
                      <td>{transaction.status}</td>
                      <td>
                        <div className={styles.orders__table__action}>
                          <Button
                            type="button"
                            onClick={() => setDetailOrder(transaction)}
                            className={styles.orders__table__action__edit}
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </Button>

                          <Button
                            variant="accept"
                            type="button"
                            onClick={() => {
                              window.snap.pay(transaction.token);
                            }}
                            className={styles.orders__table__action__pay}
                            disabled={transaction.status !== "pending"}
                          >
                            <i className="bx bx-money" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
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
