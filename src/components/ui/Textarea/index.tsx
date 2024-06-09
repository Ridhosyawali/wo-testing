import styles from "./Textarea.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string | number;
  onChange?: (e: any) => void;
  className?: string;
  onKeyDown?: (e: any) => void;
};

const Textarea = (props: Proptypes) => {
  const { label, name, placeholder, defaultValue, className } = props;
  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        className={`${styles.container__input} ${className}`}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Textarea;
