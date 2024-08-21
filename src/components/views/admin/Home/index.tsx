import AdminLayout from "@/components/layouts/AdminLayout";
import styles from "./Home.module.scss";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import { Product } from "@/types/product.type";
import { eachDayOfInterval } from "date-fns";
import moment from "moment";
import { Transactions } from "@/types/transactions.type";
import { Histories } from "@/types/histories.type.";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ModalDetailEvent from "./ModalDetailEvent";
import { convertIDR } from "@/utils/currency";
import Select from "@/components/ui/Select";

type PropTypes = {
  order: Transactions[];
  history: Histories[];
};
const HomeAdminView = (props: PropTypes) => {
  const { order, history } = props;
  const [detailEvent, setDetailEvent] = useState<Histories | {}>({});
  const [historiesData, setHistoriesData] = useState<Histories[]>([]);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPesanan, setTotalPesanan] = useState(0);
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));

  const [chartData, setChartData] = useState<
    { name: string; Invoice: number }[]
  >([]);
  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 5; // Jumlah produk yang ingin ditampilkan per halaman

  const handleNextClick = () => {
    setStartIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const handlePreviousClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };

  const visibleEvent = historiesData
    ?.filter((history) => history.status === "Approved")
    .slice(startIndex, startIndex + itemsPerPage);

  const handleYearChange = (year: any) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    const bulan = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const data = bulan.map((month) => ({
      name: month,
      Invoice: history.reduce((acc, item) => {
        const tanggal = moment(item.created_at);
        if (
          bulan[tanggal.month()] === month &&
          moment(item.created_at).format("YYYY") === selectedYear
        ) {
          return acc + 1;
        }
        return acc;
      }, 0),
    }));

    const filteredData = history.filter(
      (item) => moment(item.startDate).format("YYYY") === selectedYear
    );

    setChartData(data);
    setTotalPemasukan(
      filteredData.reduce((acc, item) => acc + item.totalall, 0)
    );
    setTotalPesanan(filteredData.length);
  }, [selectedYear, history]);

  const sortedEvent = visibleEvent.sort((a, b) => {
    const tanggalA = moment(a.startDate);
    const tanggalB = moment(b.startDate);
    const hariIni = moment();

    return tanggalA.diff(hariIni) - tanggalB.diff(hariIni);
  });

  // useEffect(() => {
  //   const bulan = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];

  // const data = bulan.map((month) => ({
  //   name: month,
  //   Invoice: history.reduce((acc, item) => {
  //     const tanggal = moment(item.created_at);
  //     if (bulan[tanggal.month()] === month) {
  //       return acc + 1;
  //     }
  //     return acc;
  //   }, 0),
  // }));

  // setHistoriesData(history);
  //  setChartData(data);
  // }, [history]);

  useEffect(() => {
    setHistoriesData(history);
  }, [history]);

  const totalAll = history.reduce((acc, item) => acc + item.totalall, 0);

  const disabledDates = history
    .filter((history) => history.startDate && history.endDate)
    .flatMap((history) => {
      const startDate = new Date(history.startDate);
      const endDate = new Date(history.endDate);
      const dates = eachDayOfInterval({ start: startDate, end: endDate });
      return dates.map((date) => date.toISOString());
    })
    .flat();

  return (
    <>
      <AdminLayout>
        <div className={styles.homes}>
          <h2>Grafik Penjualan</h2>
          <div className={styles.homes__chart}>
            <div className={styles.homes__chart__filter}>
              <Select
                name="year"
                className={styles.homes__chart__filter__select}
                onChange={(e) => handleYearChange(e.target.value)}
                options={[
                  { value: "2024", label: "2024" },
                  { value: "2023", label: "2023" },
                  { value: "2022", label: "2022" },
                ]}
              />
            </div>
            <AreaChart
              width={900}
              height={250}
              data={chartData}
              margin={{ top: 10, right: 40, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Invoice"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
            <div className={styles.homes__chart__invoice}>
              <div className={styles.homes__chart__invoice__pemasukan}>
                <div className={styles.homes__chart__invoice__pemasukan__title}>
                  <h5>Jumlah Pemasukan</h5>
                  <p>{convertIDR(totalPemasukan)}</p>
                </div>
                <i className="bx bx-money" />
              </div>
              <div className={styles.homes__chart__invoice__pemasukan}>
                <div className={styles.homes__chart__invoice__pemasukan__title}>
                  <h5>Total Pesanan</h5>
                  <p>{totalPesanan}</p>
                </div>
                <i className="bx bx-transfer-alt" />
              </div>
            </div>
          </div>
          <h2 className={styles.homes__title}>Event Management</h2>
          <div className={styles.homes__event}>
            <Calendar
              className={styles.homes__event__date}
              date={new Date()}
              onChange={(date) => console.log(date)}
              disabledDates={disabledDates.map((date) => new Date(date))}
            />
            <div className={styles.homes__event__desc}>
              {sortedEvent.length > 0 ? (
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
                    {sortedEvent.map((item) => (
                      <tr key={item.id}>
                        <td>{moment(item?.startDate).format("LL")}</td>
                        <td>{moment(item?.endDate).format("LL")}</td>
                        <td>{item?.address?.recipient}</td>
                        <td>
                          <div>
                            <Button
                              type="button"
                              variant="accept"
                              onClick={() => setDetailEvent(item)}
                            >
                              <i className="bx bxs-detail" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
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
                </table>
              )}
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
                {sortedEvent.length < historiesData.length && (
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
      {Object.keys(detailEvent).length > 0 && (
        <ModalDetailEvent
          detailEvent={detailEvent}
          setDetailEvent={setDetailEvent}
          setEventData={setHistoriesData}
        />
      )}
    </>
  );
};
export default HomeAdminView;
