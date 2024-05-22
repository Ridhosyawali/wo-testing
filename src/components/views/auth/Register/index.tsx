import { FormEvent, use, useState } from "react";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await authServices.registerAccount(data);

    // const result = await fetch("/api/user/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });                                    DISINI BERHASIL DOUBLE DATA (episode 6)

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email already registered");
    }
  };

  return (
    <AuthLayout
      title="REGISTER"
      error={error}
      link="/auth/login"
      linkText="Have an account? Sign in "
    >
      <form onSubmit={handleSubmit}>
        <Input placeholder="Email" name="email" type="email" />
        <Input placeholder="Fullname" name="fullname" type="text" />
        <Input placeholder="Phone" name="phone" type="number" />
        <Input placeholder="Password" name="password" type="password" />

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
