import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";
import { Children } from "react";

type Proptypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bxs-dashboard",
  },
];

const AdminLayout = (props: Proptypes) => {
  const { children } = props;

  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} />
      {children}
    </div>
  );
};

export default AdminLayout;
