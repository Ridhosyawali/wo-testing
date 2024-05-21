import { FormEvent, use, useState } from "react";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authService from "@/services/auth";
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

    const result = await authService.registerAccount(data);

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
        <Input name="email" type="email" placeholder="Email" />
        <Input name="fullname" type="text" placeholder="Fullname" />
        <Input name="phone" type="number" placeholder="Phone" />
        <Input name="password" type="password" placeholder="Password" />

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
