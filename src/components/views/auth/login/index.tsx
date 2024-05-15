import { FormEvent, use, useState } from "react";
import styles from "./login.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn } from "next-auth/react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
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
      } else {
        setIsLoading(false);
        setError("Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.login__form__item}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className={styles.login__form__item__input}
            />
          </div>
          <div className={styles.login__form__item}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className={styles.login__form__item__input}
            />
          </div>
          <button type="submit" className={styles.login__form__item__button}>
            {isLoading ? "loading..." : "Register"}
          </button>
        </form>
      </div>
      <p className={styles.login__link}>
        Don{"'"}t have an account? Sign Up{" "}
        <Link href="/auth/register">here</Link>
      </p>
    </div>
  );
};

export default LoginView;
