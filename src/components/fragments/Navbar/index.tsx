import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useEffect, useRef, useState } from "react";

const NavItems = [
  {
    title: "Home",
    url: "/home",
  },
  {
    title: "Products",
    url: "/products",
  },
];
const Navbar = () => {
  const { data }: any = useSession();
  const { pathname, push } = useRouter();
  const [dropdownUser, setDropdownUser] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  let lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop.current) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.navbar} ${isHidden ? styles.hidden : ""}`}>
      <div className={styles.navbar__left}>
        <Image
          src={"/logorira.png"}
          alt="logo"
          width={60}
          height={60}
          className={styles.navbar__left__image}
          onClick={() => push("/home")}
        />
        {/* <h2 className={styles.navbar__left__title}>RIRA</h2>
        <h4 className={styles.navbar__left__subtitle}>Wedding Organizer</h4> */}
      </div>
      <div className={styles.navbar__nav}>
        {NavItems.map((item) => (
          <Link
            key={`nav-${item.title}`}
            className={`${styles.navbar__nav__item} ${
              pathname === item.url && styles["navbar__nav__item--active"]
            }`}
            href={item.url}
          >
            {item.title}
          </Link>
        ))}
      </div>
      {data ? (
        <div className={styles.navbar__user}>
          <div className={styles.navbar__user__cart}>
            <Link href={"/cart"}>
              <i
                className={`bx bx-cart-alt ${styles.navbar__user__cart__icon}`}
              />
            </Link>
          </div>
          <div className={styles.navbar__user__profile}>
            <Image
              className={styles.navbar__user__profile__image}
              src={data?.user.image}
              alt={data?.user.name}
              width={40}
              height={40}
              onClick={() => setDropdownUser(!dropdownUser)}
            />
            <div
              className={`${styles.navbar__user__profile__dropdown} ${
                dropdownUser &&
                styles["navbar__user__profile__dropdown--active"]
              }`}
            >
              <button
                className={styles.navbar__user__profile__dropdown__item}
                onClick={() => push("/member/profile")}
              >
                Profile
              </button>
              <button
                className={styles.navbar__user__profile__dropdown__item}
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          className={styles.navbar__login}
          onClick={() => signIn()}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default Navbar;
