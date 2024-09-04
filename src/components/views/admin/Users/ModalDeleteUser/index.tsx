import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import styles from "./ModalDeleteUser.module.scss";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { User } from "@/types/user.type";
import { ToasterContext } from "@/context/ToasterContext";

type Proptypes = {
  setUsersData: Dispatch<SetStateAction<User[]>>;
  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteUser = (props: Proptypes) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await userServices.deleteUser(deletedUser.id);
    if (result.status === 200) {
      setIsLoading(false);
      setToaster({
        variant: "success",
        message: "Success Delete User",
      });
      setDeletedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete User",
      });
    }
  };

  return (
    <Modal onClose={() => setDeletedUser({})}>
      <div className={styles.modal}>
        <h1 className={styles.modal__title}>Delete Pengguna</h1>
        <p>Apakah Anda yakin ingin menghapus akun Anda?</p>
      </div>
      <Button
        className={styles.modal__button}
        type="button"
        variant="delete"
        onClick={() => handleDelete()}
      >
        {isLoading ? "Deleting..." : "Ya, Hapus"}
        <i className="bx bx-check" />
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
