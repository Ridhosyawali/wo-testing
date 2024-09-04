import { FormEvent, useContext, useState } from "react";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";
import { ToasterContext } from "@/context/ToasterContext";

const RegisterView = () => {
  const { setToaster } = useContext(ToasterContext);
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
          message: "Register sukses, silahkan login",
        });
      } else {
        setIsLoading(false);
        setToaster({
          variant: "danger",
          message: "Register gagal, email sudah terdaftar",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Register gagal, silahkan hubungi admin",
      });
    }
  };

  return (
    <AuthLayout
      title="REGISTER"
      link="/auth/login"
      linkText="Sudah memiliki akun? silahkan login "
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
          placeholder="Nama Lengkap"
          name="fullname"
          type="text"
        />
        <Input
          className={styles.register__input}
          placeholder="Nomor Telepon"
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
