import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Toaster.module.scss";
import { ToasterContext } from "@/context/ToasterContext";
import { ToasterType } from "@/types/toaster.type";

const toasterVariant: any = {
  success: {
    title: "Success",
    icon: "bx-check-circle",
    color: "#a3d9a5",
    barColor: "#3f9242",
  },
  danger: {
    title: "Error",
    icon: "bx bx-x-circle",
    color: "#f39b9a",
    barColor: "#bb2525",
  },
  warning: {
    title: "Warning",
    icon: "bx bxs-bell-ring",
    color: "#f8e3a2",
    barColor: "#e9b949",
  },
};
const Toaster = () => {
  const { toaster, setToaster }: ToasterType = useContext(ToasterContext);
  const [lengthBar, setLengthBar] = useState(100);
  const timerRef = useRef<any>(null);

  const timerStart = () => {
    timerRef.current = setInterval(() => {
      setLengthBar((prevlength) => prevlength - 0.14);
    }, 1);
  };

  useEffect(() => {
    timerStart();
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (lengthBar < 0) {
      setToaster({});
    }
  }, [lengthBar, setToaster]);

  return (
    <div
      className={`${styles.toaster} ${styles[`toaster--${toaster.variant}`]}`}
    >
      <div className={styles.toaster__main}>
        <div className={styles.toaster__main__icon}>
          <i
            className={`bx ${toasterVariant[`${toaster.variant}`].icon}`}
            style={{ color: toasterVariant[`${toaster.variant}`].barColor }}
          />
        </div>
        <div className={styles.toaster__main__text}>
          <p className={styles.toaster__main__text__title}>
            {toasterVariant[`${toaster.variant}`].title}
          </p>
          <p className={styles.toaster__main__description}>{toaster.message}</p>
        </div>
        <i
          className={`bx bx-x ${styles.toaster__main__close}`}
          onClick={() => setToaster({})}
        />
      </div>
      <div
        className={`${styles.toaster__timer}`}
        style={{ backgroundColor: toasterVariant[`${toaster.variant}`].color }}
      >
        <div
          style={{
            width: `${lengthBar}%`,
            height: "100%",
            backgroundColor: toasterVariant[`${toaster.variant}`].barColor,
          }}
        />
      </div>
    </div>
  );
};

export default Toaster;
