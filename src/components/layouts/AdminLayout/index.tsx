import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

type Proptypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Beranda",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Produk",
    url: "/admin/products",
    icon: "bxs-box",
  },
  {
    title: "Pengguna",
    url: "/admin/users",
    icon: "bxs-group",
  },
  {
    title: "Transaksi",
    url: "/admin/transactions",
    icon: "bxs-wallet",
  },
  {
    title: "Riwayat",
    url: "/admin/history",
    icon: "bxs-bank",
  },
  {
    title: "Article",
    url: "/admin/articles",
    icon: "bxs-news",
  },
];

const AdminLayout = (props: Proptypes) => {
  const { children } = props;

  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} />
      <div className={styles.admin__main}>{children}</div>
    </div>
  );
};

export default AdminLayout;
