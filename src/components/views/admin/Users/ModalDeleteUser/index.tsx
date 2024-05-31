import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import styles from "./ModalDeleteUser.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "@/types/user.type";

type Proptypes = {
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
  session: any;
};

const ModalDeleteUser = (props: Proptypes) => {
  const { deletedUser, setDeletedUser, setUsersData, setToaster, session } =
    props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await userServices.deleteUser(
      deletedUser.id,
      session.data?.accessToken
    );
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
        <h1 className={styles.modal__title}>Delete Account</h1>
        <p>Are you sure you want to delete your account?</p>
      </div>
      <Button
        className={styles.modal__button}
        type="button"
        variant="delete"
        onClick={() => handleDelete()}
      >
        {isLoading ? "Deleting..." : "Yes, delete"}
        <i className="bx bx-check" />
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
