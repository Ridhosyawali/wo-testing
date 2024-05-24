import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import styles from "./ModalDeleteUser.module.scss";

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const handleDelete = async () => {
    userServices.deleteUser(deletedUser.id);
    setDeletedUser({});
    const { data } = await userServices.getAllUsers();
    setUsersData(data.data);
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
        Delete
        <i className="bx bx-check" />
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
