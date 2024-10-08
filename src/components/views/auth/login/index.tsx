import { FormEvent, useContext, useState } from "react";
import styles from "./login.module.scss";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";
import { ToasterContext } from "@/context/ToasterContext";

const LoginView = () => {
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
        setToaster({
          variant: "success",
          message: "Login sukses",
        });
      } else {
        setIsLoading(false);
        setToaster({
          variant: "danger",
          message: "Email atau password salah",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Login gagal, silahkan hubungi admin",
      });
    }
  };

  return (
    <AuthLayout
      title="LOGIN"
      link="/auth/register"
      linkText="Belum memiliki akun? silahkan registrasi "
    >
      <form onSubmit={handleSubmit}>
        <Input
          className={styles.login__input}
          placeholder="Email"
          name="email"
          type="email"
        />
        <Input
          className={styles.login__input}
          placeholder="Password"
          name="password"
          type="password"
        />
        <Button type="submit" variant="" className={styles.login__button}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <hr className={styles.login__devider} />
      <div className={styles.login__other}>
        <Button
          variant=""
          type="button"
          className={styles.login__other__button}
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
        >
          <i className="bx bxl-google" /> Login with Google
        </Button>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
