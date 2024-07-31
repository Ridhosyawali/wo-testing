import styles from "./Input.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  className?: string;
  onKeyDown?: (e: any) => void;
  value?: string | null;
};

const Input = (props: Proptypes) => {
  const {
    label,
    name,
    type,
    placeholder,
    defaultValue,
    disabled,
    onChange,
    onKeyDown,
    className,
    value,
  } = props;
  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`${styles.container__input} ${className}`}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        // value={value || ""}
      />
    </div>
  );
};

export default Input;
