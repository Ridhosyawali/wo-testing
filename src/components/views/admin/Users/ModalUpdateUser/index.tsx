import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import { FormEvent, useState } from "react";
import styles from "./ModalUpdateUser.module.scss";

const ModalUpdateUser = (props: any) => {
  const { UpdatedUser, setUpdatedUser, setUsersData } = props;
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
    } else {
      setIsLoading(false);
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1 className={styles.modal__title}>Update User</h1>
      <form onSubmit={handleUpdateuser}>
        <Input
          placeholder="Email"
          name="email"
          type="email"
          defaultValue={UpdatedUser.email}
          disabled
        />
        <Input
          placeholder="Fullname"
          name="fullname"
          type="text"
          defaultValue={UpdatedUser.fullname}
          disabled
        />
        <Input
          placeholder="Phone"
          name="phone"
          type="number"
          defaultValue={UpdatedUser.phone}
          disabled
        />
        <Select
          name="role"
          defaultValue={UpdatedUser.role}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Button type="submit" variant="update" className={styles.modal__button}>
          Update
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
