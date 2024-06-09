import { Dispatch, FormEvent, SetStateAction, use, useState } from "react";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

const RegisterView = ({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    // const result = await fetch("/api/user/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });                                    DISINI BERHASIL DOUBLE DATA (episode 6)

    try {
      const result = await authServices.registerAccount(data);
      if (result.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
        setToaster({
          variant: "success",
          message: "Register success, please login",
        });
      } else {
        setIsLoading(false);
        setToaster({
          variant: "danger",
          message: "Register failed, please call suppport",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Register failed, email is already exist",
      });
    }
  };

  return (
    <AuthLayout
      title="REGISTER"
      link="/auth/login"
      linkText="Have an account? Sign in "
    >
      <form onSubmit={handleSubmit}>
        <Input
          className={styles.register__input}
          placeholder="Email"
          name="email"
          type="email"
        />
        <Input
          className={styles.register__input}
          placeholder="Fullname"
          name="fullname"
          type="text"
        />
        <Input
          className={styles.register__input}
          placeholder="Phone"
          name="phone"
          type="number"
        />
        <Input
          className={styles.register__input}
          placeholder="Password"
          name="password"
          type="password"
        />

        <Button
          type="submit"
          className={styles.register__button}
          variant="primary"
        >
          {isLoading ? "loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
