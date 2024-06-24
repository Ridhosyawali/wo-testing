import "react-slideshow-image/dist/styles.css";
import AdminLayout from "@/components/layouts/AdminLayout";
import HomeView from "../../Home";
import Styles from "./Home.module.scss";

const HomeAdminView = () => {
  return (
    <AdminLayout>
      <div className={Styles.Home}>
        <HomeView />
      </div>
    </AdminLayout>
  );
};
export default HomeAdminView;
