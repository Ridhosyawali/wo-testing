import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import styles from "./ModalUpdateUser.module.scss";
import { User } from "@/types/user.type";
import { ToasterContext } from "@/context/ToasterContext";

type Proptypes = {
  setUsersData: Dispatch<SetStateAction<User[]>>;
  UpdatedUser: User | any;
  setUpdatedUser: Dispatch<SetStateAction<{}>>;
};
const ModalUpdateUser = (props: Proptypes) => {
  const { UpdatedUser, setUpdatedUser, setUsersData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdateuser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    const result = await userServices.updateUser(UpdatedUser.id, data);
    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
      setToaster({
        variant: "success",
        message: "Success Update User",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Success Change Password",
      });
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1 className={styles.modal__title}>Update Pengguna</h1>
      <form onSubmit={handleUpdateuser}>
        <Input
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          defaultValue={UpdatedUser.email}
          disabled
          className={styles.modal__input}
        />
        <Input
          label="Nama Lengkap"
          placeholder="Fullname"
          name="fullname"
          type="text"
          defaultValue={UpdatedUser.fullname}
          disabled
          className={styles.modal__input}
        />
        <Input
          label="No Telepon"
          placeholder="Phone"
          name="phone"
          type="number"
          defaultValue={UpdatedUser.phone}
          disabled
          className={styles.modal__input}
        />
        <Select
          label="Role"
          name="role"
          defaultValue={UpdatedUser.role}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
          className={styles.modal__input}
        />
        <Button type="submit" variant="update" className={styles.modal__button}>
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
