import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

type Proptypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Home",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bxs-box",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "bxs-group",
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: "bx-wallet",
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
