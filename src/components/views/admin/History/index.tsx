import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import { Fragment, useContext, useEffect, useState } from "react";
import styles from "./History.module.scss";

import { User } from "@/types/user.type";
import { convertIDR } from "@/utils/currency";
import moment from "moment";
import { ToasterContext } from "@/context/ToasterContext";
import ModalDetailHistory from "./ModalDetailHistory";
import { Histories } from "@/types/histories.type.";

type PropTypes = {
  history: Histories[];
};
const HistoryAdminView = (props: PropTypes) => {
  const { history } = props;
  const [historiesData, setHistoriesData] = useState<Histories[]>([]);

  const [detailHistory, setDetailHistory] = useState<Histories | {}>({});

  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 15; // Jumlah produk yang ingin ditampilkan per halaman

  const handleNextClick = () => {
    setStartIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const handlePreviousClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };

  const visibleHistories = historiesData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const sortedTransactions = visibleHistories.sort((a: any, b: any) => {
    return moment(b.created_at).valueOf() - moment(a.created_at).valueOf();
  });

  useEffect(() => {
    setHistoriesData(history);
  }, [history]);

  return (
    <>
      <AdminLayout>
        <div className={styles.homes}>
          <h2 className={styles.homes__title}>Riwayat Pesanan</h2>
          <table className={styles.homes__table}>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Users</th>
                <th>Status</th>
                <th>Nama Pemesan</th>
                <th>Tanggal</th>
                <th>Uang Muka</th>
                <th>Total Harga</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((data: any, index: number) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data?.fullname}</td>
                  <td>{data?.status}</td>
                  <td>{data.address?.recipient}</td>
                  <td>{moment(data?.created_at).format("LLLL")}</td>
                  <td>{convertIDR(data?.remaining)}</td>
                  <td>
                    <strong>{convertIDR(data?.totalall)}</strong>
                  </td>

                  <td>
                    <div className={styles.homes__table__action}>
                      <Button
                        type="button"
                        variant="accept"
                        onClick={() => setDetailHistory(data)}
                      >
                        <i className="bx bxs-detail" />
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
            {visibleHistories.length < historiesData.length && (
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
      {Object.keys(detailHistory).length > 0 && (
        <ModalDetailHistory
          detailHistory={detailHistory}
          setDetailHistory={setDetailHistory}
        />
      )}
    </>
  );
};
export default HistoryAdminView;
